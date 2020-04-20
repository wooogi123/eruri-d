import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import List from './course/List';
import { Vodlist, videoListParser } from '../libs/parser';

function View() {
  const initlist: Array<Vodlist> = [{
    title: '',
    vods: [''],
  }];
  const [vodlist, setVodlist] = useState(initlist);

  async function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    const url = e.currentTarget.dataset['url'];
    try {
      let res = await axios({
        url: url,
        method: 'get',
        withCredentials: true
      });
      setVodlist([...videoListParser(res.data)])
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Router>
      <List onClick={onClick} vodlist={vodlist} />
    </Router>
  );
}

export default View;