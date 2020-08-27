import React from 'react';
import { Loading, Line, Highlight } from 'arwes';
import { useDownloadState } from '../../contexts/CourseContext';

interface CourseProps {
  url: string;
  name: string;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

function Course({ url, name, onClick }: CourseProps) {
  const state = useDownloadState();

  return (
    <>
      <Line layer='primary' style={{ margin: '0' }} />
      <Highlight>
        <li
          data-url={url}
          data-name={name}
          onClick={onClick}
          style={{
            padding: '0.75rem',
          }}
        >
          <div style={{ display: 'flex' }}>
            {name}
            {state[name] &&
              <div style={{ marginLeft: 'auto' }}>
                {state[name].status === 'run' &&
                  <Loading animate small />
                }
              </div>
            }
          </div>
        </li>
      </Highlight>
    </>
  );
}

export default Course;