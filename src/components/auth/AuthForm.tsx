import React from 'react';
import styled from '@emotion/styled';

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
}

function AuthForm({ onSubmit, user, setUser }: AuthFormProps) {
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
    </div>
  );
}

export default AuthForm;