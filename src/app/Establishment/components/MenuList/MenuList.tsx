import React from 'react'
import { CustomCollapse, CollapseWrapper } from '../../styles'
import { MenuCard } from './styles'

const { Panel } = CustomCollapse;

type MenuListDefinition = {
  menu: any[]
}

export function MenuList({ menu }: MenuListDefinition) {
  return (
    <CollapseWrapper>
      <CustomCollapse accordion>
        <Panel header="Pratos disponíveis" key="2">
          {menu.map(item =>
            <MenuCard>
              {item.name}
            </MenuCard>
          )}
        </Panel>
      </CustomCollapse>
    </CollapseWrapper>
  )
}