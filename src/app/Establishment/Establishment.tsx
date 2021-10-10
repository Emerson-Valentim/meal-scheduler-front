import React, { useCallback, useState, useEffect } from 'react'

import { Card } from 'antd'

import { WestPlazaCard } from '../../components/WestPlazaCard/WestPlazaCard'
import { CustomMenu, CustomMenuItem, EstablishmentCard, EstablishmentList, MainWrapper, ModalWrapper } from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { loadEstablishment, loadEstablishments } from '../../hooks/Establishment'
import { EnvironmentList } from './components/EnvironmentList/EnvironmentList'
import { MenuList } from './components/MenuList/MenuList'
import { Agenda } from './components/Agenda/Agenda'
import {
  CalendarFilled,
  ShopFilled,
} from '@ant-design/icons/lib/icons'

import { FaChair } from 'react-icons/fa'
import { IoFastFoodOutline } from 'react-icons/io5'
import { updateLoading } from '../../hooks/Common'
import { TableList } from './components/TableList/TableList'
import { createReservation, loadReservations, resetNewReservation } from '../../hooks/Reservation'

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

  const {
    environments: stateEnvironments,
    ...params
  } = useAppSelector(state => state.reservation.create.params)

  const CardStyle = {
    hFontSize: '1.75vh',
    hFontColor: 'black',
    pFontSize: '2vh',
    pFontColor: 'black'
  }

  const Views: ViewMapping = {
    'menu': (<MenuList key='MenuEstablishment' menu={establishment?.menu_items} />),
    'environment': (<EnvironmentList key='EnvironmentEstablishment' environments={establishment?.environments} />),
    'table': (<TableList key='TableEstablishment' tables={establishment?.environments?.flatMap(environment => environment.tables)} />),
    'reservation': (<Agenda schedule={establishment?.schedule} establishment_id={establishment?.id} />)
  }

  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [activeView, setActiveView] = useState(<></>)

  useEffect(() => {
    (async () => await dispatch(loadEstablishments()))()
  }, [])

  useEffect(() => {
    setActiveView(Views.menu)
    dispatch(resetNewReservation(establishment?.id))
  }, [establishment])

  const openEstablishmentModal = useCallback(async ({ id }) => {
    dispatch(updateLoading(true))
    await dispatch(loadEstablishment(id))
    dispatch(updateLoading(false))
    setVisible(true)
  }, [])

  const confirmReservation = useCallback(async () => {
    setConfirmLoading(true)

    await dispatch(createReservation({
      ...params,
      status: 'scheduled',
      phone: '5511948083191',
      cpf: '46911198844'
    }))

    setConfirmLoading(false)
    await dispatch(loadReservations())
  }, [params])

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

        onOk={confirmReservation}
        onCancel={() => setVisible(false)}

        confirmLoading={confirmLoading}

        okText={'Reservar'}
        cancelText={'Voltar'}

        destroyOnClose

        key='ModalEstablishment'
      >
        <CustomMenu
          onClick={({ key }) => { setActiveView(Views[key]) }}
          mode='horizontal'
          defaultSelectedKeys={[EnumViewMapping.MENU]}
          forceSubMenuRender
          inlineIndent={12}
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