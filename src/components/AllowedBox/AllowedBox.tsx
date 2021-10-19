import React from 'react'
import { RiCheckboxCircleFill, RiForbid2Fill } from 'react-icons/ri'

type AllowedBoxParams = {
  allow: boolean
  text?: string
}

export function AllowedBox({ allow, text }: AllowedBoxParams): JSX.Element {
  return (
    <>
      {
        allow
          ? <RiCheckboxCircleFill color='green' />
          : <RiForbid2Fill color='red' />
      }
      {text}
    </>
  )
}