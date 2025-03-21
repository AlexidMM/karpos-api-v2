import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsReportsController } from './reports.controller';
import { AppointmentsService } from './appointments.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentsController, AppointmentsReportsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule {} 