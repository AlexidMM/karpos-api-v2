//src/iot/iot.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IotData } from './schema';
import { CreateIotDto } from './dto/create-iot.dto';

@Injectable()
export class IotService {
  constructor(@InjectModel(IotData.name) private iotModel: Model<IotData>) {}

  async create(createIotDto: CreateIotDto): Promise<IotData> {
    const newData = new this.iotModel(createIotDto);
    return newData.save();
  }
  async findAll(): Promise<IotData[]> {
    return this.iotModel.find().exec();
  }

  async findOne(id: string): Promise<IotData> {
    const result = await this.iotModel.findById(id).exec();
    if (!result) {
      throw new Error(`IotData with id ${id} not found`);
    }
    return result;
  }
}