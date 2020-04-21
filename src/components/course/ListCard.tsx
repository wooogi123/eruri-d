import React from 'react';
import styled from '@emotion/styled';
import Course from './Course';
import { Vodlist, getPlaylist } from '../../libs/parser';
import { useDownloadState, useDownloadDispatch } from '../../contexts/CourseContext';

import { IpcRendererEvent } from 'electron';
const ipcRenderer = window.require('electron').ipcRenderer;

const Alert = styled.h1`
  color: red;
`;

interface ListCardProps {
  vodList: Array<Vodlist>;
}

interface IpcArgs {
  target: string;
  msg: string;
}

function ListCard({ vodList }: ListCardProps) {
  const dispatch = useDownloadDispatch();
  const state = useDownloadState();
  async function onClick(e: React.MouseEvent<HTMLLIElement>) {
    let url = e.currentTarget.dataset['url'] as string;
    const title = e.currentTarget.dataset['name'];
    url = await getPlaylist(url);
    ipcRenderer.on('download-start', (e: IpcRendererEvent, arg: IpcArgs) => {
      dispatch({
        type: 'START',
        title: arg.target,
        status: 'run',
      });
    });
    ipcRenderer.on('download-error', (e: IpcRendererEvent, arg: IpcArgs) => {
      dispatch({
        type: 'ERROR',
        title: arg.target,
        status: 'error',
        message: arg.msg,
      });
    });
    ipcRenderer.on('download-end', (e: IpcRendererEvent, arg: IpcArgs) => {
      dispatch({
        type: 'END',
        title: arg.target,
        status: 'end',
      });
    });
    ipcRenderer.send('download-message', [title, url[1]]);
  }

  if (vodList.length) {
    return (
      <ul>
        {vodList.map(el => (
          el.vods.map((url, idx) => (
            <Course
              key={el.title + (' - ') + (idx + 1)}
              url={url}
              name={el.title + (' - ') + (idx + 1)}
              onClick={onClick}
            />
          ))
        ))}
      </ul>
    );
  }
  return (<Alert>Empty</Alert>);
}

export default ListCard;