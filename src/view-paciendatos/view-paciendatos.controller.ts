import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { PaciendatosService } from './view-paciendatos.service';
import { SelectPaciendatosDto } from './dto/select-paciendatos.dto';

@Controller('view-paciendatos')
export class PaciendatosController {
    constructor(
        private readonly paciendatosService: PaciendatosService
    ) {}

    @Get()
    async getPaciendatos() {
        return this.paciendatosService.getPaciendatos();
    }

    @Get('filter')
    async filterPaciendatos(@Query() filters: SelectPaciendatosDto) {
        return this.paciendatosService.filterPaciendatos(filters);
    }

    @Get(':id')
    async getPaciendatosById(@Param('id', ParseIntPipe) id: number) {
        return this.paciendatosService.getPaciendatosById(id);
    }
}