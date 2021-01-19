import React, { useState, createContext } from "react"
import TabPane, { ITabPaneProps } from "./tabPane"
import TabNav from "./tabNav"
import classNames from "classnames"

/*-----------------------------------------------------------------*/
/*                           type定义区域                           */
/*-----------------------------------------------------------------*/
type ButtonStyleType = "line" | "card"
type onChangeType = (activeKey: string) => void
type onTabClickType = (key: string, event: React.MouseEvent) => void
export interface ITabsProps {
  type?: ButtonStyleType
  onChange?: onChangeType
  onTabClick?: onTabClickType
  defaultActiveKey?: string
  className?: string
}
type TabsType = React.FC<ITabsProps> & { TabPane: React.FC<ITabPaneProps> }
interface ITabsContext {
  currentKey: string
  onClick?: onTabClickType
}
export const TabsContext = createContext<ITabsContext>({ currentKey: "" })

const Tabs: TabsType = (props) => {
  const { children, defaultActiveKey, onTabClick, className, type } = props
  // classes
  const classes = classNames("orch-tabs", className, {
    "orch-tabs-card": type === "card"
  })
  // init active key
  let initKey = defaultActiveKey || ""
  /**
   * 如果没有传defaultActiveKey，则默认初始化的activeKey为第一个TabPane的key
   */
  if (!defaultActiveKey) {
    React.Children.forEach(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<ITabPaneProps>
      if ((childElement.type.displayName = "TabPane")) {
        if (!initKey) {
          initKey = childElement.props.tabKey
        }
      }
    })
  }

  /*-----------------------------------------------------------------*/
  /*                             state区域                            */
  /*-----------------------------------------------------------------*/
  const [currentKey, setCurrent] = useState(initKey)

  function renderNavsAndPanes() {
    const TabItem: {
      tabNavList: React.ReactNode[]
      tabPaneList: React.ReactNode[]
    } = {
      tabNavList: [],
      tabPaneList: []
    }
    React.Children.forEach(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<ITabPaneProps>
      if ((childElement.type.displayName = "TabPane")) {
        TabItem.tabPaneList.push(
          React.cloneElement(childElement, { key: childElement.props.tabKey })
        )
        TabItem.tabNavList.push(
          <TabNav
            key={childElement.props.tabKey}
            tabKey={childElement.props.tabKey}
            tab={childElement.props.tab}
            disabled={childElement.props.disabled}
          />
        )
      } else {
        console.error("Warning,Tabs has a child which is not a TabPane")
      }
    })
    return TabItem
  }

  const TabItem = renderNavsAndPanes()

  const onClick: onTabClickType = (key, event) => {
    setCurrent(key)
    onTabClick && onTabClick(key, event)
  }

  return (
    <div className={classes} data-testid="orch-tabs">
      <TabsContext.Provider value={{ currentKey: currentKey || "", onClick }}>
        <div className="orch-tabs-nav">{TabItem.tabNavList}</div>
        <div className="orch-tabs-content">{TabItem.tabPaneList}</div>
      </TabsContext.Provider>
    </div>
  )
}

Tabs.TabPane = TabPane

Tabs.defaultProps = {
  type: "line"
}

export default Tabs
