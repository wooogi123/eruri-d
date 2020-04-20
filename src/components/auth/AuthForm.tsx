import React from 'react';
import styled from '@emotion/styled';

const LoginWrapper = styled.div`
  width: 260px;
  padding: 8% 0 0;
  margin: auto;
`;

const Form = styled.form`
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const Input = styled.input`
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 1px solid #a0aec0;
  border-radius: 0.25rem;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

const Button = styled.button`
  text-transform: uppercase;
  outline: 0;
  background: #805ad5;
  width: 100%;
  border: 0;
  border-radius: 0.25rem;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3 ease;
  cursor: pointer;

  &:hover, &:active, &:focus {
    background: #6b46c1;
  }
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
    <LoginWrapper>
      <Form onSubmit={onSubmit}>
        <Input
          name='id'
          placeholder='Username'
          value={user.id}
          type='text'
          onChange={(e) => {setUser({ ...user, id: e.target.value })}}
        />
        <Input
          name='pw'
          placeholder='Password'
          value={user.pw}
          type='password'
          onChange={(e) => {setUser({ ...user, pw: e.target.value })}}
        />
        <Button>Login</Button>
      </Form>
    </LoginWrapper>
  );
}

export default AuthForm;