import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSensorDataDto {
  @IsNotEmpty()
  @IsNumber()
  temperatura: number;

  @IsNotEmpty()
  @IsNumber()
  humedad: number;
}
