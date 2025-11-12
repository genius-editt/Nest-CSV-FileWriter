import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvService } from './csv.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CsvService],
  exports: [CsvService],
})
export class AppModule {}
