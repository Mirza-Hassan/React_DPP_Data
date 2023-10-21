import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { CreateDppDto } from './dto/dpp.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  private data = [];

  @Get('api/dpp')
  getAllData(@Res() res: Response) {
    try {
      if (this.data.length === 0) {
        return res.status(404).json({ message: 'DPP not found' });
      }
      return res.status(200).json(this.data);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Post('api/dpp/create')
  addData(@Body() newData: CreateDppDto, @Res() res: Response) {
    try {
      this.data.push(newData);
      return res.status(201).json(newData);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create DPP' });
    }
  }
}
