import { Injectable, Logger } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CsvService {
  private readonly logger = new Logger(CsvService.name);

  /**
   * Writes records (objects) to the CSV file at outputPath.
   * If folder doesn't exist it will create it.
   */
  async writeCsv(
    outputPath: string,
    records: Array<Record<string, any>>,
  ): Promise<void> {
    // ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      this.logger.log(`Created directory ${dir}`);
    }

    if (!records || records.length === 0) {
      this.logger.log(
        'No records to write. Creating empty file with headers if possible.',
      );
      // We can't infer headers from empty records, so write an empty file.
      fs.writeFileSync(outputPath, '');
      return;
    }

    // Build header array from keys of the first object
    const headers = Object.keys(records[0]).map((k) => ({ id: k, title: k }));

    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: headers,
    });

    await csvWriter.writeRecords(records);
    this.logger.log(`CSV written to ${outputPath} (${records.length} rows)`);
  }

  // Example: return some sample data to write
  getSampleData() {
    return [
      {
        customer_id: 11011,
        first_name: 'Jack',
        surname: 'Smith',
        address: '18 Water Rd',
        contact_number: '0877277521',
        email: 'jsmith@isat.com',
      },
      {
        customer_id: 11012,
        first_name: 'Pat',
        surname: 'Hendricks',
        address: '22 Water Rd',
        contact_number: '0863257857',
        email: 'ph@mcom.co.za',
      },
      {
        customer_id: 11013,
        first_name: 'Andre',
        surname: 'Clark',
        address: '101 Summer Lane',
        contact_number: '083xxxxxxx',
        email: 'andre@example.com',
      },
    ];
  }
}
