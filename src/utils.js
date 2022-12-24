const fs = require('fs/promises');
const { DataSource } = require('typeorm');
const { getVideoDurationInSeconds } = require('get-video-duration');
const { initializeApp } = require('firebase/app');
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} = require('firebase/storage');

async function prepareCoursesOnLocalStorage() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'courses',
  });

  await dataSource.initialize();

  // get categories
  const categories = await fs.readdir('../courses');

  for (const category of categories) {
    // get courses
    const courses = await fs.readdir(`../courses/${category}`);

    for (const course of courses) {
      // add course to db
      const [{ id: courseId }] = await dataSource.query(
        `INSERT INTO course (
            "title", 
            "description", 
            "category", 
            "source", 
            "language"
      ) VALUES (
            '${course}', 
            '${course}', 
            '${category}', 
            'Udemy', 
            'Russia'
      ) RETURNING id`,
      );
      // make directory in static for course
      await fs.mkdir(`../static/course/${courseId}`);
      // get sections
      const sections = await fs.readdir(`../courses/${category}/${course}`);

      for (const section of sections) {
        // get lessons
        const lessons = await fs.readdir(
          `../courses/${category}/${course}/${section}`,
        );

        for (const lesson of lessons) {
          // get only video lessons
          if (lesson.endsWith('.mp4')) {
            // get lesson order
            const [order] = /^\d+/.exec(lesson);
            // get lesson video duration
            const duration = await getVideoDurationInSeconds(
              `../courses/${category}/${course}/${section}/${lesson}`,
            );
            // add lesson to db
            const [{ id: lessonId }] = await dataSource.query(
              `INSERT INTO lesson (
                "title", 
                "description", 
                "order", 
                "courseId", 
                "duration"
            ) VALUES (
                '${lesson}', 
                '${lesson}', 
                '${order}', 
                '${courseId}', 
                '${Math.round(duration)}'
            ) RETURNING id`,
            );
            // copy lesson to static directory
            await fs.copyFile(
              `../courses/${category}/${course}/${section}/${lesson}`,
              `../static/course/${courseId}/${lessonId}.mp4`,
            );
          }
        }
      }
    }
  }
  await dataSource.close();
}

async function prepareCoursesOnCloudStorage() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCYonF1O9y_ANV3gRbOpE63ATwsliTeQSc',
    authDomain: 'courses-c7e16.firebaseapp.com',
    projectId: 'courses-c7e16',
    storageBucket: 'courses-c7e16.appspot.com',
    messagingSenderId: '202807903275',
    appId: '1:202807903275:web:28bf4f1658281df2b8d66e',
    measurementId: 'G-7Y4R5E4KYB',
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'courses',
  });

  await dataSource.initialize();

  // get categories
  const categories = await fs.readdir('../courses');

  for (const category of categories) {
    // get courses
    const courses = await fs.readdir(`../courses/${category}`);

    for (const course of courses) {
      // add course to db
      const [{ id: courseId }] = await dataSource.query(
        `INSERT INTO course (
            "title", 
            "description", 
            "category", 
            "source", 
            "language"
        ) VALUES (
            '${course}', 
            '${course}', 
            '${category}', 
            'Udemy', 
            'Russia'
        ) RETURNING id`,
      );

      // get sections
      const sections = await fs.readdir(`../courses/${category}/${course}`);

      for (const section of sections) {
        // get lessons
        const lessons = await fs.readdir(
          `../courses/${category}/${course}/${section}`,
        );

        for (const lesson of lessons) {
          // get only video lessons
          if (lesson.endsWith('.mp4')) {
            // get lesson order
            const [order] = /^\d+/.exec(lesson);
            // get lesson video duration
            const duration = await getVideoDurationInSeconds(
              `../courses/${category}/${course}/${section}/${lesson}`,
            );
            // upload to cloud storage
            const file = await fs.readFile(
              `../courses/${category}/${course}/${section}/${lesson}`,
            );
            const lessonFileRef = ref(storage, `courses/${course}/${lesson}`);
            const uploadTask = uploadBytesResumable(lessonFileRef, file, {
              contentType: 'video/mp4',
            });
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              },
              (error) => {
                console.error(error);
              },
              async () => {
                const src = await getDownloadURL(uploadTask.snapshot.ref);
                await dataSource.query(
                  `INSERT INTO lesson (
                                        "title", 
                                        "description", 
                                        "order", 
                                        "courseId", 
                                        "duration",
                                        "src"
                                    ) VALUES (
                                        '${lesson}', 
                                        '${lesson}', 
                                        '${order}', 
                                        '${courseId}', 
                                        '${Math.round(duration)}',
                                        '${src}'
                                    ) RETURNING id`,
                );
              },
            );
          }
        }
      }
    }
    // await dataSource.close();
  }
}

// prepareCoursesOnLocalStorage();
prepareCoursesOnCloudStorage();
