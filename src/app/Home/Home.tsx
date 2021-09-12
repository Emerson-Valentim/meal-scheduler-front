import React from 'react';

import { Login } from "./components/Login/Login";
import { Welcome } from './components/Welcome/Welcome';
import { MainWrapper } from "./styles";

export function Home(): JSX.Element {


  return (
    <MainWrapper>
      <Welcome/>
      <Login/>
    </MainWrapper>
  )
}