import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ControlRele, ControlReleDocument } from './schema';

@Injectable()
export class ControlReleService {
  constructor(@InjectModel(ControlRele.name) private controlReleModel: Model<ControlReleDocument>) {}

  async obtenerEstado(): Promise<string> {
    const estadoActual = await this.controlReleModel.findOne().sort({ createdAt: -1 });
    return estadoActual ? estadoActual.estado : 'OFF';
  }

  async cambiarEstado(estado: string): Promise<string> {
    await this.controlReleModel.create({ estado });
    return `Estado cambiado a ${estado}`;
  }
}
