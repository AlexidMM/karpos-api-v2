//src/view-paciendatos/view-paciendatos.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { SelectPaciendatosDto } from './dto/select-paciendatos.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { eq, and, SQL } from 'drizzle-orm';


@Injectable()
export class PaciendatosService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: LibSQLDatabase<typeof schema>
    ) {}

    async getPaciendatos() {
        return this.database.select().from(schema.paciendatos);
    }

    async getPaciendatosById(id_pc: number) {
        const records = await this.database.select()
            .from(schema.paciendatos)
            .where(eq(schema.paciendatos.id_pc, id_pc));
        
        return records;
    }

    async filterPaciendatos(filters: SelectPaciendatosDto) {
        const whereConditions: SQL<unknown>[] = [];

        // Construir condiciones de filtro dinámicamente
        if (filters.id_pc) whereConditions.push(eq(schema.paciendatos.id_pc, filters.id_pc));
        if (filters.nombre) whereConditions.push(eq(schema.paciendatos.nombre, filters.nombre));
        if (filters.apellido_p) whereConditions.push(eq(schema.paciendatos.apellido_p, filters.apellido_p));
        if (filters.gender) whereConditions.push(eq(schema.paciendatos.gender, filters.gender));
        if (filters.blood_type) whereConditions.push(eq(schema.paciendatos.blood_type, filters.blood_type));
        if (filters.age) whereConditions.push(eq(schema.paciendatos.age, filters.age));
        if (filters.diagnosis) whereConditions.push(eq(schema.paciendatos.diagnosis, filters.diagnosis));

        const query = this.database.select()
            .from(schema.paciendatos)
            .where(and(...whereConditions));

        return query;
    }
}   