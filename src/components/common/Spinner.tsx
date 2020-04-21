import React from 'react';
import styled from '@emotion/styled';

const Spin = styled.div`
  width: 1rem;
  height: 1rem;
  position: relative;

  .cube1, .cube2 {
    background: #fff;
    width: 0.25rem;
    height: 0.25rem;
    position: absolute;
    -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
    animation: sk-cubemove 1.8s infinite ease-in-out;
  }

  .cube2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  @-webkit-keyframes sk-cubemove {
    25% { -webkit-transform: translateX(0.5rem) rotate(-90deg) scale(0.5) }
    50% { -webkit-transform: translateX(0.5rem) translateY(0.5rem) rotate(-180deg) }
    75% { -webkit-transform: translateX(0px) translateY(0.5rem) rotate(-270deg) scale(0.5) }
    100% { -webkit-transform: rotate(-360deg) }
  }

  @keyframes sk-cubemove {
    25% { 
      transform: translateX(0.5rem) rotate(-90deg) scale(0.5);
      -webkit-transform: translateX(0.5rem) rotate(-90deg) scale(0.5);
    } 50% { 
      transform: translateX(0.5rem) translateY(0.5rem) rotate(-179deg);
      -webkit-transform: translateX(0.5rem) translateY(0.5rem) rotate(-179deg);
    } 50.1% { 
      transform: translateX(0.5rem) translateY(0.5rem) rotate(-180deg);
      -webkit-transform: translateX(0.5rem) translateY(0.5rem) rotate(-180deg);
    } 75% { 
      transform: translateX(0px) translateY(0.5rem) rotate(-270deg) scale(0.5);
      -webkit-transform: translateX(0px) translateY(0.5rem) rotate(-270deg) scale(0.5);
    } 100% { 
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }
`;

function Spinner() {
  return (
    <Spin>
      <div className={'cube1'}></div>
      <div className={'cube2'}></div>
    </Spin>
  );
}

export default Spinner;