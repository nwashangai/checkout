import React from 'react'

import './Card.scss'

export default (props: any) => {
  return (
    <div className="card">
      <span>{props.title}</span>
      <div>
        {props.children}
      </div>
    </div>
  )
}
