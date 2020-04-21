import React from 'react';
import styled from '@emotion/styled';

const Checkmark = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  transform: rotate(45deg);
`;

const CheckStem = styled.div`
  position: absolute;
  width: 0.25rem;
  height: 0.75rem;
  background-color: #fff;
  left: 0.5rem;
  top: 0.25rem;
`;

const CheckKick = styled.div`
  position: absolute;
  width: 0.5rem;
  height: 0.25rem;
  background-color: #fff;
  left: 0.25rem;
  top: 0.75rem;
`;

function Check() {
  return (
    <Checkmark>
      <CheckStem />
      <CheckKick />
    </Checkmark>
  );
}

export default Check;