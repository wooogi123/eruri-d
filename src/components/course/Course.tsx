import React from 'react';
import styled from '@emotion/styled';
import Spinner from '../common/Spinner';
import Check from '../common/Check';
import { useDownloadState } from '../../contexts/CourseContext';

const Wrapper = styled.div`
  display: flex;
`;

const LI = styled.li`
  color: #ffffff;
  cursor: pointer;
  padding: 0.75rem;
  border-top: 1px solid #ffffff;

  & + & {
    border-bottom: 1px solid #ffffff;
  }

  &:hover {
    background: #7f00ff;
    filter: grayscale(90%);
  }
`;

const RightSlot = styled.div`
  margin-left: auto;
`;

interface CourseProps {
  url: string;
  name: string;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

function Course({ url, name, onClick }: CourseProps) {
  const state = useDownloadState();

  return (
    <LI
      data-url={url}
      data-name={name}
      onClick={onClick}
    >
      <Wrapper>
        {name}
        {state[name] &&
        <RightSlot>
          {state[name].status === 'run' &&
            <Spinner />
          }
          {state[name].status === 'end' &&
            <Check />
          }
        </RightSlot>
        }
      </Wrapper>
    </LI>
  );
}

export default Course;