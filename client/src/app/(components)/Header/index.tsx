import React from 'react'

type HeaderProps = {
    name: string,

}

const index = ({name}: HeaderProps) => {
  return (
    <h1 className="text-2xl font-semibold text-gray-700 py-4 pt-8">{name}</h1>
  )
}

export default index