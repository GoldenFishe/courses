import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Lesson } from '../lesson/lesson.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
}
