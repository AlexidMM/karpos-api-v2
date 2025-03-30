import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

// Definición del tipo para la vista
export interface PaciendatosView {
    id_pc: number;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    age: number;
    weight: number;
    height: number;
    gender: 'male' | 'female' | 'other';
    blood_type: string;
    diagnosis?: string;
    treatment?: string;
    notes?: string;
}

// Como es una vista, no necesitas definir la tabla aquí
export const paciendatos = sqliteTable('paciendatos', {
    id_pc: integer('id_pc'),
    nombre: text('nombre'),
    apellido_p: text('apellido_p'),
    apellido_m: text('apellido_m'),
    age: integer('age'),
    weight: real('weight'),
    height: real('height'),
    gender: text('gender', { enum: ['male', 'female', 'other'] }),
    blood_type: text('blood_type'),
    diagnosis: text('diagnosis'),
    treatment: text('treatment'),
    notes: text('notes')
});