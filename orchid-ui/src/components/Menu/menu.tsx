import React, { createContext, useState } from "react"
import classNames from "classnames"
import MenuItem, { MenuItemProps } from "./menuItem"

type OnSelectCallback = (selectIndex: number) => void

export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: "vertical" | "horizontal"
  style?: React.CSSProperties
  onSelect?: OnSelectCallback
}

// context接口
interface IMenuContext {
  index: number
  onSelect?: OnSelectCallback
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

type MenuType = React.FC<MenuProps> & { MenuItem: React.FC<MenuItemProps> }

const Menu: MenuType = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const handleClick: OnSelectCallback = (index) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const passContext: IMenuContext = {
    index: currentActive || 0,
    onSelect: handleClick
  }
  const classes = classNames("orch-menu", className, {
    "menu-vertical": mode === "vertical"
  })

  return (
    <ul className={classes} data-testid="menu-test">
      <MenuContext.Provider value={passContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal"
}

Menu.MenuItem = MenuItem

export default Menu
