import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorData, SensorDataDocument } from './schema';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(SensorData.name) private sensorDataModel: Model<SensorDataDocument>,
  ) {}

  async create(createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
    const newSensorData = new this.sensorDataModel(createSensorDataDto);
    return newSensorData.save();
  }

  async findAll(): Promise<SensorData[]> {
    return this.sensorDataModel.find().sort({ createdAt: -1 }).exec();
  }

  async findRecent(limit: number = 10): Promise<SensorData[]> {
    return this.sensorDataModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }
}