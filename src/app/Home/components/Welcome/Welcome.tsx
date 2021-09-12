import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

import { Card } from 'antd';
import { MainWrapper } from './styles';
import { load } from '../../../../hooks/Establishment';

export function Welcome(): JSX.Element {

  const dispatch = useAppDispatch();

  const { load: establishments } = useAppSelector((state) => state.establishment)

  useEffect(() => {
    dispatch(load())
  }, [dispatch])

  return (
    <MainWrapper>
      Seja bem vindo!
      {establishments.data.map(establishment => (
        <Card>
          <p>{establishment.name}</p>
          <p>{establishment.description}</p>
        </Card>
      ))}
    </MainWrapper>
  )
}