import { useLoaderData } from '@remix-run/react';

import type { Course as CourseType } from '../../domain/Course';
import Player from '../../components/Player';

export async function loader({ params }: { params: { course: string } }) {
  const res = await fetch(
    `https://courses-gfeg27umxq-uc.a.run.app/api/v1/course/${params.course}`,
  );
  return await res.json();
}

export default function Course() {
  const course = useLoaderData<CourseType>();
  console.log(course);

  return (
    <section>
      <h6 className="text-2xl font-medium mb-5">{course.title}</h6>
      <Player playlist={course.lessons} />
    </section>
  );
}
