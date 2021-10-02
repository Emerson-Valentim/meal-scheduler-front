/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react'

import { Card } from 'antd';

import { WestPlazaCard } from '../../components/ShoppingHolder/ShoppingHolder'
import { CustomMenu, CustomMenuItem, EstablishmentCard, EstablishmentList, MainWrapper, ModalWrapper } from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loadEstablishment, loadEstablishments } from '../../hooks/Establishment';
import { TableList } from './components/TableList/TableList';
import { MenuList } from './components/MenuList/MenuList';
import { Reservation } from './components/Reservation/Reservation';
import {
  CalendarFilled,
  ShopFilled,
} from '@ant-design/icons/lib/icons';

import { FaChair } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";



const { Meta } = Card

enum EnumViewMapping {
  'MENU' = 'menu',
  'ENVIRONMENT' = 'environment',
  'TABLE' = 'table',
  'RESERVATION' = 'reservation'
}

type ViewMapping = {
  [key in EnumViewMapping]: JSX.Element
}

export function Establishment(): JSX.Element {

  const dispatch = useAppDispatch()

  const establishment = useAppSelector(state => state.establishment.load.filtered?.data)

  const establishments = useAppSelector(state => state.establishment.load.list?.data)

  const CardStyle = {
    hFontSize: '1.75vh',
    hFontColor: 'black',
    pFontSize: '2vh',
    pFontColor: 'black'
  }

  const Views: ViewMapping = {
    'menu': (<MenuList key='MenuEstablishment' menu={establishment?.menu_items} />),
    'environment': (<TableList key='TableEstablishment' environments={establishment?.environments} />),
    'table': (<TableList key='TableEstablishment' environments={establishment?.environments} />),
    'reservation': (<Reservation schedule={establishment?.schedule} establishment_id={establishment?.id} />)
  }

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [reservationModal, setReservationModal] = useState(false);
  const [activeView, setActiveView] = useState(Views.menu)



  useEffect(() => {
    (async () => await dispatch(loadEstablishments()))()
  }, [])

  const openEstablishmentModal = useCallback(async ({ id }) => {
    setReservationModal(false);
    await dispatch(loadEstablishment(id))
    setVisible(true);
  }, [reservationModal])

  const confirmReservation = useCallback(() => {
    console.log('Oi')
  }, [])

  const nextPage = useCallback(() => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setReservationModal(true);
    }, 2000);
  }, [])

  const handleOk = () => {
    reservationModal
      ? confirmReservation()
      : nextPage()
  };

  const handleCancel = ({ target }) => {
    reservationModal && target.type === 'button'
      ? setReservationModal(false)
      : setVisible(false)
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
        key='ModalEstablishment'
        onCancel={handleCancel}
        okText={'Reservar'}
        cancelText={'Voltar'}
        destroyOnClose
      >
        <CustomMenu
          onClick={({ key }) => { setActiveView(Views[key]) }}
          mode="horizontal"
          forceSubMenuRender
        >
          <CustomMenuItem key={EnumViewMapping.MENU} icon={<IoFastFoodOutline />}>
            Pratos
          </CustomMenuItem>
          <CustomMenuItem key={EnumViewMapping.ENVIRONMENT} icon={<ShopFilled />}>
            Ambientes
          </CustomMenuItem>
          <CustomMenuItem key={EnumViewMapping.TABLE} icon={<FaChair />}>
            Mesas
          </CustomMenuItem>
          <CustomMenuItem key={EnumViewMapping.RESERVATION} icon={<CalendarFilled />}>
            Reservas
          </CustomMenuItem>
        </CustomMenu>
        {activeView}
      </ModalWrapper>
    </MainWrapper>)
}