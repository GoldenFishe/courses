const fs = require('fs/promises');
const { DataSource } = require('typeorm');

async function prepareCourses() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'courses',
  });

  await dataSource.initialize();

  const courses = await fs.readdir('../courses');
  for (const course of courses) {
    const [{ id: courseId }] = await dataSource.query(
      `INSERT INTO course ("title", "description") VALUES ('${course}', '${course}') RETURNING id`,
    );
    const sections = await fs.readdir(`../courses/${course}`);
    for (const section of sections) {
      const lessons = await fs.readdir(`../courses/${course}/${section}`);
      for (const lesson of lessons) {
        if (lesson.endsWith('.mp4')) {
          const [order] = /^\d+/.exec(lesson);
          const [{ id: lessonId }] = await dataSource.query(
            `INSERT INTO lesson ("title", "description","order", "category", "courseId") VALUES ('${lesson}', '${lesson}', '${order}',"Tensor Flow", '${courseId}') RETURNING id`,
          );
          await fs.copyFile(
            `../courses/${course}/${section}/${lesson}`,
            `../courses/${courseId}/${lessonId}`,
          );
        }
      }
      await fs.rm(`../courses/${course}/${section}`, { recursive: true });
    }
  }
}

prepareCourses();
