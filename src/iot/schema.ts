//src/iot/schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class IotData extends Document {
  @Prop({ type: [Number], required: true })
  pulso: number[];

  @Prop({ type: [Number], required: true })
  presion: number[];

  @Prop({ type: String, required: true })
  fecha: string;

  @Prop({ type: String, required: true })
  horaIni: string;

  @Prop({ type: String, required: true })
  horaFin: string;

}

export const IotSchema = SchemaFactory.createForClass(IotData);