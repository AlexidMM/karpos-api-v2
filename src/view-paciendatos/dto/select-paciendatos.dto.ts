// src/view-paciendatos/dto/select-paciendatos.dto.ts
import { IsNumber, IsString, IsEnum, IsOptional, Min, Max } from 'class-validator';

export class SelectPaciendatosDto {
    @IsNumber()
    @IsOptional()
    id_pc?: number;

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    apellido_p?: string;

    @IsString()
    @IsOptional()
    apellido_m?: string;

    @IsNumber()
    @Min(0)
    @Max(150)
    @IsOptional()
    age?: number;

    @IsNumber()
    @Min(0)
    @Max(500)
    @IsOptional()
    weight?: number;

    @IsNumber()
    @Min(0)
    @Max(300)
    @IsOptional()
    height?: number;

    @IsEnum(['male', 'female', 'other'])
    @IsOptional()
    gender?: 'male' | 'female' | 'other';

    @IsString()
    @IsOptional()
    blood_type?: string;

    @IsString()
    @IsOptional()
    diagnosis?: string;

    @IsString()
    @IsOptional()
    treatment?: string;

    @IsString()
    @IsOptional()
    notes?: string;
}

export class FilterPaciendatosDto {
    @IsEnum(['male', 'female', 'other'])
    @IsOptional()
    gender?: 'male' | 'female' | 'other';

    @IsNumber()
    @Min(0)
    @Max(150)
    @IsOptional()
    min_age?: number;

    @IsNumber()
    @Min(0)
    @Max(150)
    @IsOptional()
    max_age?: number;

    @IsString()
    @IsOptional()
    blood_type?: string;

    @IsString()
    @IsOptional()
    diagnosis?: string;
}