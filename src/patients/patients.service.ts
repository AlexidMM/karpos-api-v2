//src/patients/patients.service.ts
import { Inject, Injectable, BadRequestException, ConflictException } from '@nestjs/common';
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

    async createPatient(patient: typeof schema.patients.$inferInsert) {
        await this.database.insert(schema.patients).values(patient);
    }

    async deletePatient(id: number) {
        await this.database.delete(schema.patients).where(eq(schema.patients.id_pc, id));
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
            // Crear el usuario y obtener su ID
            const userId = await this.usersService.createUser(data.user);
            
            if (!userId) {
                throw new Error('No se pudo obtener el ID del usuario creado');
            }
            
            // Crear el paciente con el ID del usuario
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