import React, { ReactChildren, ReactComponentElement } from "react"
import classNames from "classnames"
import MenuItem from "./menuItem"

type MenuMode = "vertical" | "horizontal"

interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: (selectIndex: number) => void
}

type MenuType = React.FC<MenuProps> & { MenuItem: React.FC }

const Menu: MenuType = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props

  const classes = classNames("orch-menu", className, {
    "menu-vertical": mode === "vertical"
  })

  return <ul className={classes}>{children}</ul>
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal"
}

Menu.MenuItem = MenuItem

export default Menu
