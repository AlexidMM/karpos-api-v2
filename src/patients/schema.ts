//src/patients/schema.ts
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { users } from "../users/schema";

export const patients = sqliteTable('patients', {
    id_pc: integer('id_pc').primaryKey(),
    nombre: text('nombre').notNull(),
    apellido_p: text('apellido_p').notNull(),
    apellido_m: text('apellido_m').notNull(),
    age: integer('age').notNull(),
    weight: real('weight').notNull(),
    height: real('height').notNull(),
    gender: text('gender', { enum: ['male', 'female', 'other'] }).notNull(),
    blood_type: text('blood_type').notNull(),
    id_us: integer('id_us').references(() => users.id).notNull(),
}); 