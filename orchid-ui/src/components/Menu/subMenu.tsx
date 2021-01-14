import React, { useState } from "react"
import classNames from "classnames"
import { MenuItemProps } from "./menuItem"

interface SubMenuProps {
  index?: number
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  // 创建一个state记录菜单打开和关闭的状态
  const [menuOpen, setOpen] = useState(false)

  const { index, children, title, className } = props

  const classes = classNames("menu-item submenu-item", className, {
    "is-opened": menuOpen
  })

  function renderChildren() {
    const subNemuClasses = classNames("orch-submenu", {
      "menu-opened": menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error(
          "Warning: SubMenu has a child which is not a MenuItem component"
        )
      }
    })
    return <ul className={subNemuClasses}>{childrenComponent}</ul>
  }

  function handleSubMenuClick(e: React.MouseEvent) {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  return (
    <li key={index} className={classes}>
      <div className="submenu-title" onClick={handleSubMenuClick}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu"
export default SubMenu
