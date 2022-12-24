import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './entities/course.entity';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private firebaseService: FirebaseService,
  ) {}

  getAll(): Promise<Course[]> {
    return this.courseRepository.find({
      order: {
        lessons: {
          order: 'ASC',
        },
      },
    });
  }

  async getById(courseId: string): Promise<Course> {
    return this.courseRepository.findOne({
      where: {
        id: courseId,
      },
      order: {
        lessons: {
          order: 'ASC',
        },
      },
    });
  }
}
