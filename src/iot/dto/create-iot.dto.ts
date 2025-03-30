//src/iot/dto/create-iot.dto.ts
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateIotDto {
  @IsArray()
  @ArrayNotEmpty()
  pulso: number[];

  @IsArray()
  @ArrayNotEmpty()
  presion: number[];

  @IsString()
  fecha: string;

  @IsString()
  horaIni: string;

  @IsString()
  horaFin: string;
}
