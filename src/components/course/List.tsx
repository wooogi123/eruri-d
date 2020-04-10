import React from 'react';
import { useCourseState } from '../../contexts/CourseContext';
import { Vodlist } from '../../libs/parser';

interface ListProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  vodlist: Array<Vodlist>;
}

function List({ onClick, vodlist }: ListProps) {
  const courses = useCourseState();
  return (
    <section>
      <ul>
        {courses.map((el, idx) => (
          <li key={idx}>
            <button data-url={el.url} onClick={onClick}>
              {el.title} | {el.prof}
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {vodlist.map((el, idx) => (
          <li key={idx}>
            <label>{el.title}</label>
            <ul>
              {el.vods.map((el, idx) => (
                <li><button key={idx}>{el}</button></li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default List;