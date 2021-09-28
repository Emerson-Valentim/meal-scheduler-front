/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react'

import { Card } from 'antd';

import { WestPlazaCard } from '../../components/ShoppingHolder/ShoppingHolder'
import { EstablishmentCard, EstablishmentList, MainWrapper, ModalWrapper } from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loadEstablishment, loadEstablishments } from '../../hooks/Establishment';
import { TableList } from './components/TableList/TableList';
import { MenuList } from './components/MenuList/MenuList';

const { Meta } = Card

export function Establishment(): JSX.Element {

  const dispatch = useAppDispatch()

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const establishment = useAppSelector(state => state.establishment.load.filtered?.data)

  const establishments = useAppSelector(state => state.establishment.load.list?.data)

  const CardStyle = {
    hFontSize: '1.75vh',
    hFontColor: 'white',
    pFontSize: '2vh',
    pFontColor: 'white'
  }

  useEffect(() => {
    (async () => await dispatch(loadEstablishments()))()
  }, [])

  const openEstablishmentModal = useCallback(async ({ id }) => {
    await dispatch(loadEstablishment(id))
    setVisible(true);
  }, [])

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <MainWrapper>
      <WestPlazaCard card={CardStyle} />
      <h1>Confira os locais disponíveis</h1>
      <EstablishmentList>
        {establishments?.map(({ name, description, id, image }) => (
          <EstablishmentCard
            hoverable
            cover={<img src={image || 'Intro2.png'} alt={`${name}`} />}
            onClick={() => openEstablishmentModal({ id })}
            key={`establishment-${id}`}
          >
            <Meta title={name} description={description} />
          </EstablishmentCard>
        ))}
      </EstablishmentList>
      <ModalWrapper
        title={establishment?.name}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={'Reservar'}
        cancelText={'Voltar'}
      >
        <TableList environments={establishment?.environments} />
        <MenuList menu={establishment?.menu_items} />
      </ModalWrapper>
    </MainWrapper>)
}