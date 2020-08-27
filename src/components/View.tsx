import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import CourseList from './course/CourseList';
import ListCard from './course/ListCard';
import { Vodlist, videoListParser } from '../libs/parser';

function View() {
  const initlist: Array<Vodlist> = [{
    title: '',
    vods: [],
  }];
  const [vodlist, setVodlist] = useState(initlist);

  async function onClick(e: React.MouseEvent<HTMLLIElement>) {
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
      <section
        style={{
          display: 'flex',
          height: '100%',
        }}
      >
        <div style={{ flex: 1 }}>
          <CourseList onClick={onClick} />
        </div>
        <div style={{ flex: 1 }}>
          <ListCard vodList={vodlist} />
        </div>
      </section>
    </Router>
  );
}

export default View;