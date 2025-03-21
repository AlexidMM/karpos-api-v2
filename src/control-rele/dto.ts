import { IsString } from 'class-validator';

export class ControlReleDto {
  @IsString()
  estado: string; // "ON" o "OFF"
}
