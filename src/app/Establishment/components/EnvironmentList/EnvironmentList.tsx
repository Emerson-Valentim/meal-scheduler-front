import React from 'react'

import { CustomViewBody } from '../../styles'
import { EnvironmentCard, EnvironmentCardBody, EnvironmentCardRules } from './styles'
import Meta from 'antd/lib/card/Meta';

import { RiForbid2Fill, RiCheckboxCircleFill } from "react-icons/ri";

type EnvironmentListDefinition = {
  environments: any[]
}

enum LocationLabel {
  indoor = 'fechado',
  outdoor = 'ao ar livre'
}

export function EnvironmentList({ environments }: EnvironmentListDefinition) {

  const getAllowedBox = (allow, text) => (
    <EnvironmentCardRules>{
      allow
        ? <RiCheckboxCircleFill color='green'/>
        : <RiForbid2Fill color='red'/>
    }
      {text}
    </EnvironmentCardRules>
  )

  return (
    <CustomViewBody>
      {environments?.map(environment => (
        <EnvironmentCard
          key={`${environment.id}-Table`}
          style={{ width: '44%' }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <EnvironmentCardBody>
            <h4 style={{ fontWeight: 'lighter'}}>
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