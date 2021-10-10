import React from 'react'

import { CustomViewBody } from '../../styles'
import { EnvironmentCard, EnvironmentCardBody, EnvironmentCardRules } from './styles'
import Meta from 'antd/lib/card/Meta'

import { RiForbid2Fill, RiCheckboxCircleFill } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { filterEnvironment } from '../../../../hooks/Reservation'

type EnvironmentListDefinition = {
  environments: any[]
}

enum LocationLabel {
  indoor = 'fechado',
  outdoor = 'ao ar livre'
}

export function EnvironmentList({ environments }: EnvironmentListDefinition) {

  const dispatch = useAppDispatch()

  const { environments: stateEnvironments } = useAppSelector( state => state.reservation.create.params )

  const getAllowedBox = (allow, text) => (
    <EnvironmentCardRules>{
      allow
        ? <RiCheckboxCircleFill color='green' />
        : <RiForbid2Fill color='red' />
    }
    {text}
    </EnvironmentCardRules>
  )

  const selectEnvironment = (id) => {
    dispatch(filterEnvironment(id))
  }

  return (
    <CustomViewBody>
      {environments?.map(environment => (
        <EnvironmentCard
          key={`${environment.id}-Table`}
          style={{ width: '44%' }}
          cover={<img alt="example" src="Intro3.png" />}
          selected={stateEnvironments.includes(environment.id)}
          onClick={() => selectEnvironment(environment.id)}
        >
          <EnvironmentCardBody>
            <h4 style={{ fontWeight: 'lighter' }}>
              {`Ambiente ${LocationLabel[environment.location]}`}
            </h4>
            <p>
              {getAllowedBox(environment.smoking_allowed, 'Permitido fumar')}
            </p>
            <p>
              {getAllowedBox(environment.pets_allowed, 'Permitido pets')}
            </p>
          </EnvironmentCardBody>
          <Meta description={environment.description} />
        </EnvironmentCard>
      ))}
    </CustomViewBody>
  )
}