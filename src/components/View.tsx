import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Course } from '../libs/parser'
import axios from 'axios';
import cheerio from 'cheerio';

function View(props: RouteComponentProps) {
  const { title, prof, url } = props.location.state as Course;

  useEffect(() => {
    axios({
      url: url,
      method: 'get',
      withCredentials: true
    }).then(res => {
      const $ = cheerio.load(res.data);
      for (let i = 1; i < 16; i++) {
        const week = $(`ul.weeks > li#section-${i}`);
        console.log(week);
      }
    }).catch(err => {
      console.error(err);
    })
  }, [url]);

  return (
    <>
    </>
  );
}

export default withRouter(View);