import { Controller, Get, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';
import * as path from 'path';

@Controller('csv')
export class CsvController {
  @Get()
  async readCsvData(@Res() response) {
    try {
      const results = [];
      const filePath = path.join(__dirname, '../../../my-app', 'inputDataTechExercise.csv');
      createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          response.json(results);
        });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'An error occurred while reading the CSV file.' });
    }
  }
}
