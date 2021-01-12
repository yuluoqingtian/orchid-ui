import React from "react"
import classNames from "classnames"

interface MenuItemProps {
  index?: number
  style?: React.CSSProperties
  disabled?: boolean
  className?: string
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, style, disabled, className, children } = props

  const classes = classNames("menu-item", className, {
    "is-disabled": disabled
  })

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}

export default MenuItem
