import React, { useContext } from "react"
import { MenuContext } from "./menu"
import classNames from "classnames"

export interface MenuItemProps {
  index: number
  style?: React.CSSProperties
  disabled?: boolean
  className?: string
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, style, disabled, className, children } = props
  const context = useContext(MenuContext)
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index
  })

  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem
