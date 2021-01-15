import React, { createContext, useState } from "react"
import classNames from "classnames"
import MenuItem, { MenuItemProps } from "./menuItem"
import SubMenu, { SubMenuProps } from "./subMenu"

type OnSelectCallback = (selectIndex: string) => void
type MenuMode = "vertical" | "horizontal"

export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: OnSelectCallback
  defaultOpenSubMenus?: string[]
}

// context接口
interface IMenuContext {
  index: string
  onSelect?: OnSelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: "0" })

type MenuType = React.FC<MenuProps> & {
  MenuItem: React.FC<MenuItemProps>
  SubMenu: React.FC<SubMenuProps>
}

const Menu: MenuType = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenSubMenus
  } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const handleClick: OnSelectCallback = (index) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const passContext: IMenuContext = {
    index: currentActive || "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const classes = classNames("orch-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical"
  })

  /*
   * 渲染子组件，子组件必须时MenuItem或者SubMenu，否则不渲染并且报错
   * 并且直接将渲染顺序直接当成MenuItem的index传入组件
   */
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps | SubMenuProps
      >
      if (
        childElement.type.displayName === "MenuItem" ||
        childElement.type.displayName === "SubMenu"
      ) {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.warn("Warning : Menu has a child which is not a MenuItem ")
      }
    })
  }

  return (
    <ul className={classes} data-testid="menu-test" style={style}>
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal"
}

Menu.MenuItem = MenuItem
Menu.SubMenu = SubMenu

export default Menu
