import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControlReleController } from './control-rele.controller';
import { ControlReleService } from './control-rele.service';
import { ControlRele, ControlReleSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ControlRele.name, schema: ControlReleSchema }]),
  ],
  controllers: [ControlReleController],
  providers: [ControlReleService],
})
export class ControlReleModule {}
