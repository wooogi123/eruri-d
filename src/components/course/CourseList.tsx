import React from 'react';
import { List, Line, Highlight } from 'arwes';
import { useCourseState } from '../../contexts/CourseContext';

interface ListProps {
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

function CourseList({ onClick }: ListProps) {
  const courses = useCourseState();

  return (
    <div>
      <section>
        <List
          node='ul'
          style={{
            marginLeft: 0,
          }}
        >
          {courses.map(el => (
            <Highlight layer='primary'>
              <li
                key={el.title}
                data-url={el.url}
                onClick={onClick}
                style={{
                  lineHeight: 1.5,
                  fontWeight: 600,
                  margin: "1rem 0 1rem 1rem",
                }}
              >
                {el.title} | {el.prof}
              </li>
              <Line animate layer='primary' />
            </Highlight>
          ))}
        </List>
      </section>
    </div>
  );
}

export default CourseList;