// src/users/users.service.ts
import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { CreateUser } from './dto/create-user.dto';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: LibSQLDatabase<typeof schema>
    ) {}

    async getUsers() {
        return this.database.select().from(schema.users);
    }

    async findByEmail(email: string) {
        const users = await this.database.select()
            .from(schema.users)
            .where(eq(schema.users.email, email));
        return users.length > 0 ? users[0] : null;
    }

    async createUser(user: CreateUser) {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await this.findByEmail(user.email);
            if (existingUser) {
                throw new ConflictException(`El usuario con email ${user.email} ya existe`);
            }
            
            // Encriptar la contraseña
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(user.password, salt);
            
            // Crear el usuario con la contraseña encriptada
            const result = await this.database.insert(schema.users).values({
                email: user.email,
                password: hashedPassword,
                role: user.role
            });
            
            // Obtener el ID del usuario creado
            const insertedUser = await this.findByEmail(user.email);
            if (!insertedUser) {
                throw new Error('Error al crear usuario: no se pudo encontrar el usuario insertado');
            }
            return insertedUser.id;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    async deleteUser(id: typeof schema.users.$inferSelect.id) {
        await this.database.delete(schema.users).where(eq(schema.users.id, id));
    }

    async updateUser(id: typeof schema.users.$inferSelect.id, updates: Partial<typeof schema.users.$inferInsert>) {
        // Si se está actualizando la contraseña, encriptarla
        if (updates.password) {
            const salt = await bcrypt.genSalt();
            updates.password = await bcrypt.hash(updates.password, salt);
        }
        
        await this.database.update(schema.users)
            .set(updates)
            .where(eq(schema.users.id, id));
    }
}