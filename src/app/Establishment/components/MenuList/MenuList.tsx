import React from 'react'

import { CustomViewBody } from '../../styles'
import { MenuCard } from './styles'
import Meta from 'antd/lib/card/Meta'

type MenuListDefinition = {
  menu: any[]
}

export function MenuList({ menu }: MenuListDefinition): JSX.Element {
  return (
    <CustomViewBody >
      {menu?.map(item =>
        <MenuCard
          key={`${item.id}-MenuItem`}
          cover={<img alt="food.png" src="food.png" />}
        >
          <Meta title={item.name} description={item.ingredients} />
        </MenuCard>
      )}
    </CustomViewBody>
  )
}