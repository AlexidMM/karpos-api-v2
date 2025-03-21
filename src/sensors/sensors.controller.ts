//src/sensors/sensors.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
import { SensorData } from './schema';
import { Public } from '../auth/decorators/public.decorator';

@Controller('api/sensores')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}
  @Public()
  @Post()
  async create(@Body() createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
    console.log('Datos recibidos:', createSensorDataDto);
    return this.sensorsService.create(createSensorDataDto);
  }
  @Public()
  @Get()
  async findAll(): Promise<SensorData[]> {
    return this.sensorsService.findAll();
  }
  @Public()
  @Get('recent')
  async findRecent(@Query('limit') limit: number): Promise<SensorData[]> {
    return this.sensorsService.findRecent(limit);
  }
}