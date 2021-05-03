// react libraries
import * as React from 'react'

// Utilities
import classNameFormatter from '../../utilities/classNameFormatter'

// Styles
import './TextInput.scss'

export default ({
  type = 'text',
  label,
  value = '',
  placeholder = '',
  onChange,
  ...props
}) => {
  const classes = classNameFormatter(
    {},
    `text-input-theme`
  )
  const inputClasses = classNameFormatter(
    {},
    `text-input-theme__form-control`
  )

  return (
    <div className={classes}>
      <label
        className={`text-input-theme__label`}
      >
        {label && label}
      </label>
        <div className="text-input-theme__wrapper">
          <input
            type={type}
            className={inputClasses}
            disabled={props.isDisabled}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
          />
          {props.icon &&
            React.cloneElement(props.icon, {
              className: 'text-input-theme__icon'
            })}
        </div>
    </div>
  )
}
