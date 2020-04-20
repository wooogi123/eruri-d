import React, { useState } from 'react';
import { useCourseState } from '../../contexts/CourseContext';
import { Vodlist, getPlaylist } from '../../libs/parser';
import styled from '@emotion/styled';
import { IpcRendererEvent } from 'electron';

const ipcRenderer = window.require('electron').ipcRenderer;

const Alert = styled.h1`
  color: red;
`
interface ListProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  vodlist: Array<Vodlist>;
}

interface DownloadProgress {
  frames: string;
  currentFps: string;
  currentKbps: string;
  targetSize: string;
  timemark: string;
}

function List({ onClick, vodlist }: ListProps) {
  const courses = useCourseState();
  const [timemark, setTimemark] = useState('');

  async function onButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    let url = e.currentTarget.dataset['url'] as string;
    const title = e.currentTarget.dataset['name'];
    url = await getPlaylist(url);
    ipcRenderer.on('download-start', (e: IpcRendererEvent, arg: string) => {
      console.log(arg);
    });
    ipcRenderer.on('download-progress', (e: IpcRendererEvent, arg: DownloadProgress) => {
      console.log(arg);
      setTimemark(arg.timemark);
    });
    ipcRenderer.on('download-error', (e: IpcRendererEvent, arg: string) => {
      console.log(arg);
    })
    ipcRenderer.on('download-end', (e: IpcRendererEvent, arg: string) => {
      console.log(arg);
    })
    ipcRenderer.send('download-message', [title, url[1]]);
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
        <ul>
          {vodlist.map((el, idx) => (
            <li key={idx}>
              <label>{el.title}</label>
              <ul>
                {el.vods.map((elm, idx) => (
                  <li>
                    {timemark && <Alert>{timemark}</Alert>}
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