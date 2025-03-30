//src/iot/iot.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IotController } from './iot.controller';
import { IotService } from './iot.service';
import { IotData, IotSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: IotData.name, schema: IotSchema }])],
  controllers: [IotController],
  providers: [IotService],
})
export class IotModule {}