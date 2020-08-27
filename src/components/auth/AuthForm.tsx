import React from 'react';
import { Frame, Button } from 'arwes';

interface User {
  id: string;
  pw: string;
}

interface AuthFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  user: User;
  setUser: React.ComponentState;
  error: boolean;
}

function AuthForm({ onSubmit, user, setUser, error }: AuthFormProps) {
  return (
    <Frame
      animate={true}
      level={3}
      corners={4}
      layer={'primary'}
      style={{
        width: '260px',
        margin: '10% auto',
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <input
          name='id'
          placeholder='Username'
          value={user.id}
          type='text'
          onChange={(e) => {setUser({ ...user, id: e.target.value })}}
          style={{
            outline: 0,
            width: '100%',
            margin: '0 0 15px',
            padding: '15px',
            fontSize: '14px',
          }}
        />
        <input
          name='pw'
          placeholder='Password'
          value={user.pw}
          type='password'
          onChange={(e) => {setUser({ ...user, pw: e.target.value })}}
          style={{
            outline: 0,
            width: '100%',
            margin: '0 0 15px',
            padding: '15px',
            fontSize: '14px',
          }}
        />
        <Button
          animate
          layer={error ? 'alert' : 'success'}
          style={{ width: '100%' }}
        >
          Login
        </Button>
      </form>
    </Frame>
  );
}

export default AuthForm;