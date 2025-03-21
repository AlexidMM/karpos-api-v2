//src/sensors/schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SensorDataDocument = SensorData & Document;

@Schema({ timestamps: true })
export class SensorData {
  @Prop({ required: true })
  temperatura: number;

  @Prop({ required: true })
  humedad: number;

  @Prop()
  createdAt: Date;
  /*
  @Prop()
  Pulso: number;

  */
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);