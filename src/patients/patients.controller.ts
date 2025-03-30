//src/patients/patients.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatient } from './dto/create-patient.dto';
import { CreatePatientWithUserDto } from './dto/create-patient-with-user.dto';


@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}
    @Get()
    async getPatients() {
        return this.patientsService.getPatients();
    }

    @Get(':id')
    async getPatient(@Param('id') id: string) {
        return this.patientsService.getPatientById(Number(id));
    }

    @Get('by-user/:id_us')
    async getPatientByUserId(@Param('id_us') idUs: number) {
        const patient = await this.patientsService.findPatientByUserId(idUs);
    
        if (!patient) {
            throw new NotFoundException('Paciente no encontrado');
        }
    
    return patient;
}

    @Post()
    async createPatient(@Body() patient: CreatePatient) {
        return this.patientsService.createPatient(patient);
    }

    @Delete(':id')
    async deletePatient(@Param('id') id: string) {
        return this.patientsService.deletePatientAndUser(Number(id));
    }


    @Put(':id')
    async updatePatient(@Param('id') id: string, @Body() updates: Partial<CreatePatient>) {
        return this.patientsService.updatePatient(Number(id), updates);
    }

    @Post('with-user')
    async createPatientWithUser(@Body() data: CreatePatientWithUserDto) {
        return this.patientsService.createPatientWithUser(data);
    }
} 