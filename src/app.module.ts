import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.INSTANCE_UNIX_SOCKET || '127.0.0.1',
      port: 5432,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'admin',
      database: process.env.DB_NAME || 'courses',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CourseModule,
    LessonModule,
    FirebaseModule,
  ],
})
export class AppModule {}
