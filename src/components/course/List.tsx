import React, { useState } from 'react';
import { useCourseState } from '../../contexts/CourseContext';
import { Vodlist, getPlaylist } from '../../libs/parser';
import styled from '@emotion/styled';

const Alert = styled.h1`
  color: red;
`

const ipcRenderer = window.require('electron').ipcRenderer;

interface ListProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  vodlist: Array<Vodlist>;
}

function List({ onClick, vodlist }: ListProps) {
  const courses = useCourseState();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(undefined);

  async function onButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    let url = e.currentTarget.dataset['url'] as string;
    const title = e.currentTarget.dataset['name'];
    setLoad(true);
    url = await getPlaylist(url);
    ipcRenderer.on('asynchronous-reply', (e, arg) => {
      if (arg == 'done') {
        setLoad(false);
      } else {
        setLoad(false)
        setError(arg);
      }
      console.log(arg);
      setLoad(false);
    });
    ipcRenderer.send('asynchronous-message', [title, url[1]]);
  }

  return (
    <div>
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
        {load && <Alert>Download...</Alert>}
        {error && <Alert>{error}</Alert>}
        <ul>
          {vodlist.map((el, idx) => (
            <li key={idx}>
              <label>{el.title}</label>
              <ul>
                {el.vods.map((elm, idx) => (
                  <li>
                    <button
                      key={el.title + (' - ') + (idx+1)}
                      data-url={elm}
                      data-name={el.title + (' - ') + (idx+1)}
                      onClick={onButtonClick}
                    >
                      {el.title + (' - ') + (idx+1)}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default List;