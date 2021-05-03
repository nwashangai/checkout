import React from 'react';

// style
import './Button.scss'

const renderButtonContent = (props) => {
  // spinner shows when isLoading is true
  if (props.isLoading) {
    return <i className="fa fa-spin fa-spinner" aria-hidden="true" />

  }

  return <React.Fragment>{props.name}</React.Fragment>
}

export default (props) => {
  const { classes, onClick, id, name, isLoading, ...rest } = props
  return (
    <button
      {...rest}
      id={props.id}
      disabled={props.disabled}
      className={`button ${classes ? classes : ''}`}
      onClick={props.onClick}
    >
      {renderButtonContent({ isLoading, name })}
    </button>
  )
}
