import { Controller, Get, Post, Body } from '@nestjs/common';
import { ControlReleService } from './control-rele.service';
import { ControlReleDto } from './dto';
import { Public } from '../auth/decorators/public.decorator';  // 🔹 Importar el decorador


@Controller('api/control-rele')
export class ControlReleController {
  constructor(private readonly controlReleService: ControlReleService) {}
  @Public()
  @Get()
  async obtenerEstado(): Promise<string> {
    return this.controlReleService.obtenerEstado();
  }

  @Public()
  @Post()
  async cambiarEstado(@Body() controlReleDto: ControlReleDto): Promise<string> {
    return this.controlReleService.cambiarEstado(controlReleDto.estado);
  }
}
