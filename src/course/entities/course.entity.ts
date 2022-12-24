import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Lesson } from '../../lesson/entities/lesson.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  source: string;

  @Column()
  language: string;

  @CreateDateColumn()
  date: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.course, { eager: true })
  lessons: Lesson[];

  @Expose()
  get duration() {
    return this.lessons.reduce((acc, cur) => acc + cur.duration, 0);
  }
}
