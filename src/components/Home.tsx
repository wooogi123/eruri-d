import React, { useState } from 'react';
import axios from 'axios';
import { courseListParser, Course } from '../libs/parser';
import AuthForm from './auth/AuthForm';

function Home() {
  const local = localStorage.getItem('user');
  const [user, setUser] = useState((local) ? JSON.parse(local) : { id: '', pw: '' });
  const initList: Array<Course> = [];
  const [list, setList] = useState(initList);

  const URL = 'https://eruri.kangwon.ac.kr/login/index.php';
  const _URL = 'https://eruri.kangwon.ac.kr/login.php';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios({
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
      const reRes = await axios({
        url: resURL,
        method: 'get',
        withCredentials: true
      });
      setList(courseListParser(reRes.data));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthForm
      onSubmit={onSubmit}
      user={user}
      setUser={setUser}
      list={list}
    />
  );
};

export default Home;