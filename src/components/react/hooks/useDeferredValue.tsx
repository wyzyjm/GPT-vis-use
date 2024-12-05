import React, { useDeferredValue } from 'react'

const UseDeferredValue = () => {
  const res = useDeferredValue('adfadf')
  return <div>{res}</div>
}

export default UseDeferredValue
