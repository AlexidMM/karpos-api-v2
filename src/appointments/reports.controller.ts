// src/appointments/reports.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Patch, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointment } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async getAppointments() {
    return this.appointmentsService.getAppointments();
  }

  @Get(':id')
  async getAppointment(@Param('id') id: string) {
    return this.appointmentsService.getAppointmentById(Number(id));
  }

  @Post()
  async createAppointment(@Body() appointment: CreateAppointment) {
    return this.appointmentsService.createAppointment(appointment);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.appointmentsService.deleteAppointment(Number(id));
  }

  @Put(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() updates: Partial<CreateAppointment>,
  ) {
    return this.appointmentsService.updateAppointment(Number(id), updates);
  }

}

@Controller('reports/appointments')
export class AppointmentsReportsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    


    @Get()
    async getAppointmentsReport(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('doctorId') doctorId?: string,
        @Query('patientId') patientId?: string,
        @Query('status') status?: string,
    ) {
        return this.appointmentsService.getFilteredAppointments({
            startDate,
            endDate,
            doctorId: doctorId ? Number(doctorId) : undefined,
            patientId: patientId ? Number(patientId) : undefined,
            status,
        });
    }
}