import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { CustomViewBody } from '../../styles'
import { TableCard } from './styles'

export function TableList({ tables }) {
  return (
    <CustomViewBody>
      {tables?.map(table => 
        <TableCard
          key={`${table.id}-Table`}
        >
        <Meta title={`Mesa ${table.identification}`} description={`Mesa com ${table.seats} lugares`} />
        </TableCard>
      )}
    </CustomViewBody>
  )
}