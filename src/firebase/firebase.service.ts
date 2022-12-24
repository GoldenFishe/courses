import { Injectable } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getStorage,
  FirebaseStorage,
  getDownloadURL,
  ref,
} from 'firebase/storage';
import { Course } from '../course/entities/course.entity';
import { Lesson } from '../lesson/entities/lesson.entity';

@Injectable()
export class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly storage: FirebaseStorage;
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCYonF1O9y_ANV3gRbOpE63ATwsliTeQSc',
      authDomain: 'courses-c7e16.firebaseapp.com',
      projectId: 'courses-c7e16',
      storageBucket: 'courses-c7e16.appspot.com',
      messagingSenderId: '202807903275',
      appId: '1:202807903275:web:28bf4f1658281df2b8d66e',
      measurementId: 'G-7Y4R5E4KYB',
    };

    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
  }

  getLessonDownloadURL(course: Course, lesson: Lesson) {
    return getDownloadURL(
      ref(this.storage, `courses/${course.id}/${lesson.id}.mp4`),
    );
  }
}
