// src/iot/iot.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { IotService } from './iot.service';
import { CreateIotDto } from './dto/create-iot.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('iot')
export class IotController {
  constructor(private readonly iotService: IotService) {}
  
  @Public()
  @Post()
  async create(@Body() createIotDto: CreateIotDto) {
    return this.iotService.create(createIotDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.iotService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.iotService.findOne(id);
  }
}
