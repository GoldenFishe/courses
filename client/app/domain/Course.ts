import type { Lesson } from './Lesson';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  lessons: Lesson[];
  language: string;
}
