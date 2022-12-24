import { useState } from 'react';
import clsx from 'clsx';
import { ClockIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { formatDuration } from '../utils';
import { useLocation, useNavigate } from 'react-router';

type Video = {
  src: string;
  title: string;
  duration: number;
};

interface Props {
  playlist: Video[];
}

function Player({ playlist }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const lesson = searchParams.get('lesson');

  const [lessonIndex, setLessonIndex] = useState<number>(
    lesson !== null ? Number(lesson) - 1 : 0,
  );

  const selectLesson = (index: number) => {
    setLessonIndex(index);
    const searchParams = new URLSearchParams();
    searchParams.set('lesson', (index + 1).toString());
    navigate({ search: searchParams.toString() });
  };

  return (
    <div className="grid grid-cols-12 h-full aspect-[3/1] gap-6">
      <video
        src={playlist[lessonIndex].src}
        controls
        className="col-span-8 w-full aspect-video"
        title={playlist[lessonIndex].title}
      >
        Your browser doesn't support video. Update to the newest version
      </video>
      <aside className="col-span-4 h-full overflow-hidden rounded-xl text-white flex flex-col">
        <header className="px-2 py-3 bg-neutral-700 flex flex-col justify-center">
          <h6 className="ml-4">Список уроков</h6>
        </header>
        <ul className="overflow-auto flex-grow bg-neutral-800">
          {playlist.map((video, index) => {
            const active = lessonIndex === index;
            return (
              <li
                key={video.src}
                className={clsx('hover:bg-gray-700 transition', {
                  'bg-red-800': active,
                })}
              >
                <button
                  onClick={() => selectLesson(index)}
                  className="flex flex-row items-center text-left p-2 w-full"
                >
                  <div className="h-full w-4">
                    <ChevronRightIcon
                      width={16}
                      height={16}
                      className={clsx('mx-auto opacity-0 transition', {
                        ['opacity-100']: active,
                      })}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">{video.title}</p>
                    <div className="flex flex-row gap-1">
                      <ClockIcon width={16} height={16} />
                      <p className="text-xs">
                        {formatDuration(video.duration)}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

export default Player;
