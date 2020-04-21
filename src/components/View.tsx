import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import List from './course/List';
import ListCard from './course/ListCard';
import { Vodlist, videoListParser } from '../libs/parser';

const Wrapper = styled.section`
  display: flex;
  height: 100%;
`;

const DivFlex = styled.div`
  flex: 1;

  & + & {
    border-left: 1px solid #ffffff;
  }
`;

function View() {
  const initlist: Array<Vodlist> = [{
    title: '',
    vods: [],
  }];
  const [vodlist, setVodlist] = useState(initlist);

  async function onClick(e: React.MouseEvent<HTMLLIElement>) {
    const url = e.currentTarget.dataset['url'];
    try {
      let res = await axios({
        url: url,
        method: 'get',
        withCredentials: true
      });
      setVodlist([...videoListParser(res.data)])
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Router>
      <Wrapper>
        <DivFlex>
          <List onClick={onClick} />
        </DivFlex>
        <DivFlex>
          <ListCard vodList={vodlist} />
        </DivFlex>
      </Wrapper>
    </Router>
  );
}

export default View;