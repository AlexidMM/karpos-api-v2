import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateIotAppointmentDto {
  @IsString()
  @IsNotEmpty()
  iot_data_id: string; // ID del documento en MongoDB
}
