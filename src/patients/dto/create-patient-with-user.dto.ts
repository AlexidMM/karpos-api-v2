// src/patients/dto/create-patient-with-user.dto.ts
import { CreateUser } from '../../users/dto/create-user.dto';

export class CreatePatientWithUserDto {
  // Datos de usuario
  user: CreateUser;
  
  // Datos del paciente
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  edad: number;
  weight: GLfloat;
  height: number;
  gender: string;
  blood_type: string;
}