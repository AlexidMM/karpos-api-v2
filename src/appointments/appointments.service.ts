//src/appointments/appointments.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { eq, and } from 'drizzle-orm';
import { SQLiteColumn } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

@Injectable()
export class AppointmentsService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: LibSQLDatabase<typeof schema>
    ) {}

    async getAppointments() {
        return this.database.select().from(schema.appointments);
    }

    async createAppointment(appointment: typeof schema.appointments.$inferInsert) {
        await this.database.insert(schema.appointments).values(appointment);
    }

    async deleteAppointment(id: number) {
        await this.database.delete(schema.appointments).where(eq(schema.appointments.id_ap, id));
    }

    async updateAppointment(id: number, updates: Partial<typeof schema.appointments.$inferInsert>) {
        await this.database.update(schema.appointments)
            .set(updates)
            .where(eq(schema.appointments.id_ap, id));
    }

    async getAppointmentById(id: number) {
        return this.database.select()
            .from(schema.appointments)
            .where(eq(schema.appointments.id_ap, id));
    }

    async getFilteredAppointments(filters: {
        startDate?: string;
        endDate?: string;
        doctorId?: number;
        patientId?: number;
        status?: string;
    }) {
        // Construir condiciones de filtrado
        const conditions: Array<ReturnType<typeof sql>> = [];

        if (filters.startDate) {
            conditions.push(gte(schema.appointments.date, filters.startDate));
        }

        if (filters.endDate) {
function lte(column: SQLiteColumn, value: string) {
    return sql`${column} <= ${value}`;
}
            conditions.push(lte(schema.appointments.date, filters.endDate));
        }

        if (filters.doctorId) {
            conditions.push(eq(schema.appointments.id_dc, filters.doctorId));
        }

        if (filters.patientId) {
            conditions.push(eq(schema.appointments.id_pc, filters.patientId));
        }

        if (filters.status) {
            conditions.push(eq(schema.appointments.status, filters.status as "pending" | "completed" | "cancelled"));
        }

        // Si hay condiciones, aplicar filtros
        if (conditions.length > 0) {
            return this.database.select()
                .from(schema.appointments)
                .where(and(...conditions));
        }

        // Si no hay filtros, devolver todas las citas
        return this.getAppointments();
    }
} 

function gte(column: SQLiteColumn, value: string) {
    return sql`${column} >= ${value}`;
}
