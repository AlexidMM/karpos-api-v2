import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ControlReleDocument = ControlRele & Document;

@Schema({ timestamps: true })
export class ControlRele {
  @Prop({ required: true })
  estado: string; // "ON" o "OFF"
}

export const ControlReleSchema = SchemaFactory.createForClass(ControlRele);
