import { Module } from '@nestjs/common';
import { PaciendatosController } from './view-paciendatos.controller';
import { PaciendatosService } from './view-paciendatos.service';
import { DatabaseModule } from 'src/database/database.module'; // Importa el DatabaseModule

@Module({
  imports: [DatabaseModule], // Añade esta línea para importar DatabaseModule
  controllers: [PaciendatosController],
  providers: [PaciendatosService],
  exports: [PaciendatosService]
})
export class ViewPaciendatosModule {}