import React from 'react'

import DownCircleFilled from '@ant-design/icons/lib/icons/DownCircleOutlined';

import { CustomCollapse, CollapseWrapper } from '../../styles'
import { MenuCard } from './styles'

const { Panel } = CustomCollapse;

type MenuListDefinition = {
  menu: any[]
}

export function MenuList({ menu }: MenuListDefinition) {
  return (
    <CollapseWrapper>
      <CustomCollapse accordion expandIconPosition="right" expandIcon={() => (<DownCircleFilled style={{ fontSize: '1.3vh' }} />)}>
        <Panel header="Pratos disponíveis" key="2">
          {menu.map(item =>
            <MenuCard key={`${item.id}-MenuItem`}>
              {item.name}
            </MenuCard>
          )}
        </Panel>
      </CustomCollapse>
    </CollapseWrapper>
  )
}