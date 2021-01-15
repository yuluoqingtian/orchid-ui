import React, { useState, useContext } from "react"
import classNames from "classnames"
import { MenuItemProps } from "./menuItem"
import { MenuContext } from "./menu"

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  // props
  const { index, children, title, className } = props
  // context
  const context = useContext(MenuContext)
  /**
   * state:menuOpen
   * 记录当前SubMenu是否展开
   * 当 mode="vertical" 并且 Menu传入了参数defaultOpenSubMenus 时，
   * 如果defaultOpenSubMenus包含了当前SubMenu的index，
   * 则当前menuOpen的默认值为true
   */
  const [menuOpen, setOpen] = useState(
    context.defaultOpenSubMenus &&
      typeof index === "string" &&
      context.mode === "vertical"
      ? context.defaultOpenSubMenus.includes(index)
      : false
  )
  // class
  const classes = classNames("menu-item submenu-item", className, {
    "is-opened": menuOpen
  })

  //渲染子节点
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

  // 鼠标事件
  function handleSubMenuClick(e: React.MouseEvent) {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  // 计时器，延时切换效果
  let timer: NodeJS.Timeout
  // 鼠标悬浮和离开时的效果 --仅在mode='hrizontal'时
  function handleMouseHoverOrLeave(e: React.MouseEvent, isOpen: boolean) {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(isOpen)
    }, 200)
  }

  // 垂直菜单才能点击触发，水平菜单是悬浮触发的
  const clickEvents =
    context.mode === "vertical" ? { onClick: handleSubMenuClick } : {}
  const hoverEvents =
    context.mode === "vertical"
      ? {}
      : {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouseHoverOrLeave(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouseHoverOrLeave(e, false)
          }
        }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu"
export default SubMenu
