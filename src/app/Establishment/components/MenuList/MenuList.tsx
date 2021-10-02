import React from 'react'

import { CustomViewBody } from '../../styles'
import { MenuCard } from './styles'
import Meta from 'antd/lib/card/Meta';

type MenuListDefinition = {
  menu: any[]
}

export function MenuList({ menu }: MenuListDefinition) {
  return (
    <CustomViewBody >
      {menu?.map(item =>
        <MenuCard
          key={`${item.id}-MenuItem`}
          style={{ width: '44%' }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <Meta title={item.name} description={item.ingredients} />
        </MenuCard>
      )}
    </CustomViewBody>
  )
}