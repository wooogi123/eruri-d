import React, { useState } from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { courseListParser } from '../libs/parser';
import AuthForm from './auth/AuthForm';
import { useCourseDispatch } from '../contexts/CourseContext';

function Home({ history }: RouteComponentProps) {
  const local = localStorage.getItem('user');
  const [user, setUser] = useState((local) ? JSON.parse(local) : { id: '', pw: '' });
  const [error, setError] = useState(false);
  const dispatch = useCourseDispatch();

  const URL = 'https://eruri.kangwon.ac.kr/login/index.php';
  const _URL = 'https://eruri.kangwon.ac.kr/login.php';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      let res = await axios({
        url: URL,
        data: `username=${user.id}&password=${user.pw}`,
        method: 'post',
        withCredentials: true
      });
      const resURL = res.request.responseURL.split('?')[0];
      if (resURL === URL || resURL === _URL) {
        throw new Error('Login Failure');
      }
      localStorage.setItem('user', JSON.stringify(user));
      res = await axios({
        url: resURL,
        method: 'get',
        withCredentials: true
      });
      courseListParser(res.data).forEach(el => {
        dispatch({
          type: 'LOGIN',
          title: el.title,
          prof: el.prof,
          url: el.url,
        });
      });
      history.push('/view');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  return (
    <Router>
      <AuthForm
        onSubmit={onSubmit}
        user={user}
        setUser={setUser}
        error={error}
      />
    </Router>
  );
};

export default Home;