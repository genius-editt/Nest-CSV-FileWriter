import 'reflect-metadata'; // required for decorators
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CsvService } from './csv.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // create a minimal Nest application context (no HTTP server)
  const appContext = await NestFactory.createApplicationContext(AppModule);

  try {
    const csvService = appContext.get(CsvService);

    // define output path
    const outputPath = './output/customers.csv';

    // get sample data (replace this with your own)
    const records = csvService.getSampleData();

    // write CSV
    await csvService.writeCsv(outputPath, records);

    logger.log('All done — exiting.');
  } catch (err) {
    logger.error('Error writing CSV', err);
  } finally {
    // gracefully close Nest context then exit
    await appContext.close();
    process.exit(0);
  }
}

bootstrap();
