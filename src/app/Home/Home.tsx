import React from 'react';

import { Introduction } from './components/Introduction/Introduction';
import { MainWrapper } from "./styles";

export function Home(): JSX.Element {


  return (
    <MainWrapper>
      <Introduction/>
    </MainWrapper>
  )
}