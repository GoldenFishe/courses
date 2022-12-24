import { Link, useLoaderData } from '@remix-run/react';
import {
  RectangleStackIcon,
  ClockIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';

import type { Course } from '../../domain/Course';
import { formatDuration } from '../../utils';

export async function loader() {
  const res = await fetch(
    'https://courses-gfeg27umxq-uc.a.run.app/api/v1/course',
  );
  const res1 = await fetch(
    'https://courses-gfeg27umxq-uc.a.run.app:6000/api/v1/course',
  );
  const courses: Course[] = await res.json();
  return courses.reduce((acc: Record<Course['category'], Course[]>, cur) => {
    if (!acc[cur.category]) acc[cur.category] = [];
    acc[cur.category] = [...acc[cur.category], cur];
    return acc;
  }, {});
}

export default function Index() {
  const courses = useLoaderData<Record<Course['category'], Course[]>>();

  console.log(courses);

  return Object.entries(courses).map(([category, courses]) => {
    return (
      <section key={category} className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
          {category}
        </h2>
        <ul className="grid grid-cols-3 gap-8">
          {courses.map((course) => {
            return (
              <li key={course.id}>
                <Link
                  to={`/${course.id}`}
                  className="h-full flex flex-col group"
                >
                  <img
                    src={`https://images.theconversation.com/files/339942/original/file-20200604-67393-1dej576.jpg?ixlib=rb-1.1.0&rect=0%2C22%2C994%2C633&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip`}
                    alt={course.title}
                    className="mb-4 w-full rounded-md group-hover:opacity-75 transition-opacity"
                  />
                  <h6 className="text-lg font-medium text-gray-900 flex-grow mb-4">
                    {course.title}
                  </h6>
                  <div className="flex flex-row gap-4 text-gray-500">
                    <div className="flex flex-row gap-2">
                      <RectangleStackIcon width={20} height={20} />
                      <p className="text-sm">{course.lessons.length}</p>
                    </div>
                    <div className="flex flex-row gap-2 text-gray-500">
                      <ClockIcon width={20} height={20} />
                      <p className="text-sm">
                        {formatDuration(course.duration)}
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 text-gray-500">
                      <LanguageIcon
                        width={20}
                        height={20}
                        className="stroke-current"
                      />
                      <p className="text-sm">{course.language}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  });
}
