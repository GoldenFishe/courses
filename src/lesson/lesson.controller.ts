import { Controller, Get, Param } from '@nestjs/common';

import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Get('/:id')
  getLessons(@Param() params: string) {
    return 'eqw';
  }
}
