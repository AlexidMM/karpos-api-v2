// src/iot/iot.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { IotService } from './iot.service';
import { CreateIotDto } from './dto/create-iot.dto';

@Controller('iot')
export class IotController {
  constructor(private readonly iotService: IotService) {}

  @Post()
  async create(@Body() createIotDto: CreateIotDto) {
    return this.iotService.create(createIotDto);
  }

  @Get()
  async findAll() {
    return this.iotService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.iotService.findOne(id);
  }
}
