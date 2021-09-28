import React from 'react'

import { CustomCollapse, CollapseWrapper } from '../../styles'
import { TableCard } from './styles'

const { Panel } = CustomCollapse;

type TableListDefinition = {
  environments: any[]
}

export function TableList({ environments }: TableListDefinition) {
  return (
    <CollapseWrapper>
      <CustomCollapse accordion>
        <Panel header="Ambientes disponíveis" key="1">
          {environments.map(environment => (
            <TableCard>
              {environment.description}
            </TableCard>
          ))}
        </Panel>
      </CustomCollapse>
    </CollapseWrapper>)
}