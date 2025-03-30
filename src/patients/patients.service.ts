import { Inject, Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { CreatePatientWithUserDto } from './dto/create-patient-with-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { eq } from 'drizzle-orm';

@Injectable()
export class PatientsService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: LibSQLDatabase<typeof schema>,
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    async getPatients() {
        return this.database.select().from(schema.patients);
    }

    async findPatientByUserId(idUs: number) {
        const patients = await this.database.select()
            .from(schema.patients)
            .where(eq(schema.patients.id_us, idUs));
        
        if (patients.length === 0) {
            return null;
        }
        
        return patients[0];
    }

    async createPatient(patient: typeof schema.patients.$inferInsert) {
        await this.database.insert(schema.patients).values(patient);
    }

    async deletePatient(id: number) {
        await this.database.delete(schema.patients).where(eq(schema.patients.id_pc, id));
    }

    async deletePatientAndUser(patientId: number) {
        // Find the patient first
        const patients = await this.database.select()
            .from(schema.patients)
            .where(eq(schema.patients.id_pc, patientId));

        if (patients.length === 0) {
            throw new NotFoundException('Paciente no encontrado');
        }

        const patient = patients[0];

        // Delete the patient
        await this.deletePatient(patientId);

        // Delete the associated user
        if (patient.id_us) {
            await this.usersService.deleteUser(patient.id_us);
        }

        return { message: 'Paciente y usuario eliminados exitosamente' };
    }

    async updatePatient(id: number, updates: Partial<typeof schema.patients.$inferInsert>) {
        await this.database.update(schema.patients)
            .set(updates)
            .where(eq(schema.patients.id_pc, id));
    }

    async getPatientById(id: number) {
        return this.database.select()
            .from(schema.patients)
            .where(eq(schema.patients.id_pc, id));
    }

    async createPatientWithUser(data: CreatePatientWithUserDto) {
        try {
            // Create the user and get its ID
            const userId = await this.usersService.createUser(data.user);
            
            if (!userId) {
                throw new Error('No se pudo obtener el ID del usuario creado');
            }
            
            // Create the patient with the user ID
            const patientData = {
                nombre: data.nombre,
                apellido_p: data.apellido_p,
                apellido_m: data.apellido_m,
                age: data.edad,
                weight: data.weight,
                height: data.height,
                gender: data.gender as "male" | "female" | "other",
                blood_type: data.blood_type,
                id_us: userId
            };
            
            await this.createPatient(patientData);

            const tokens = await this.authService.signIn(data.user.email, data.user.password);
            
            return {
                success: true,
                message: 'Paciente creado correctamente',
                patientData: {
                    ...patientData,
                    user_id: userId
                }
            };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new BadRequestException('El usuario ya existe');
            }
            throw new BadRequestException('No se pudo crear el usuario: ' + error.message);
        }
    }
}