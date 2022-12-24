import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private catalogService: CourseService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  getCourses() {
    return this.catalogService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:courseId')
  getCourse(@Param('courseId') courseId: string) {
    return this.catalogService.getById(courseId);
  }
}
