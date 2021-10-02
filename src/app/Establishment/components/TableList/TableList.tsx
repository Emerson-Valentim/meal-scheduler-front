import React from 'react'

import DownCircleFilled from '@ant-design/icons/lib/icons/DownCircleOutlined';

import { CustomViewBody } from '../../styles'
import { TableCard } from './styles'
import Meta from 'antd/lib/card/Meta';

const { Panel } = CustomViewBody;

type TableListDefinition = {
  environments: any[]
}

enum LocationLabel {
  indoor = 'Interno',
  outdoor = 'Externo'
}

export function TableList({ environments }: TableListDefinition) {

  return (

    <CustomViewBody>
      {environments?.map(environment => (
        <TableCard
          key={`${environment.id}-Table`}
          style={{ width: '44%' }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          {LocationLabel[environment.location]}
          {environment.description}
          {environment.smoking_allowed ? 'a' : 'b'}
          {environment.pets_allowed}
          <Meta title={environment.name} />
        </TableCard>
      ))}
    </CustomViewBody>
  )
}