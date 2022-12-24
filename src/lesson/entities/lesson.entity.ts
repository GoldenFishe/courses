import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from '../../course/entities/course.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  src: string;

  @Column()
  order: number;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;
}
