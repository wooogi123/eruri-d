import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Course } from '../../libs/parser';

const Header = styled.header`
  margin: 10% 0;
  display: flex;
  items-align: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 30%;
  display: flex;
  flex-direction: column
`;

interface User {
  id: string;
  pw: string;
}

interface AuthFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  user: User;
  setUser: React.ComponentState;
  list: Array<Course>;
}

function AuthForm({ onSubmit, user, setUser, list }: AuthFormProps) {
  return (
    <div>
      <Header>
        <Form onSubmit={onSubmit}>
          <input
            name='id'
            placeholder='ID'
            value={user.id}
            type='text'
            onChange={(e) => {setUser({ ...user, id: e.target.value })}}
          />
          <input
            name='pw'
            placeholder='PW'
            value={user.pw}
            type='password'
            onChange={(e) => {setUser({ ...user, pw: e.target.value })}}
          />
          <button>Submit</button>
        </Form>
      </Header>
      <section>
        <ul>
          {list.map((el, idx) => (
            <li key={idx}>
              <Link
                to={{
                  pathname: '/view',
                  state: {
                    title: el.title,
                    prof: el.prof,
                    url: el.url
                  }}}>
                {el.title} {el.prof}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AuthForm;