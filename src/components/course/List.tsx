import React from 'react';
import { useCourseState } from '../../contexts/CourseContext';
import styled from '@emotion/styled';

const LI = styled.li`
  color: #cbd5e0;
  padding: 1rem 0;
  padding-left: 1rem;
  cursor: pointer;
  line-height: 1.5;
  font-weight: 600;
  border-top: 1px solid #ffffff;
  
  & + & {
    border-bottom: 1px solid #ffffff;
  }

  &:hover {
    background: #7f00ff;
    filter: grayscale(90%);
  }
`;


interface ListProps {
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

function List({ onClick }: ListProps) {
  const courses = useCourseState();

  return (
    <div>
      <section>
        <ul>
          {courses.map(el => (
            <LI
              key={el.title}
              data-url={el.url}
              onClick={onClick}
            >
              {el.title} | {el.prof}
            </LI>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default List;