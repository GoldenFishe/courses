import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  // @Get('/')
  // getCourses() {
  //   return this.catalogService.getAll();
  // }

  // @Get('/:id')
  // getCourse(@Param('id') id: string) {
  //   return this.catalogService.getById(id);
  // }

  @Get('/test')
  getTest(): StreamableFile {
    const file = createReadStream(join('assets', 'test.mp4'));
    return new StreamableFile(file);
  }
}
