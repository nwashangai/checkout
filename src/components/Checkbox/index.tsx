import React from 'react'

import './Checkbox.scss'

export default (props: any) => {
  return (
    <div className="checkbox">
      <input type="radio" checked={props.isActive} onClick={() => props.onClick(props.value)} />
      <span>{props.name}</span>
    </div>
  )
}
