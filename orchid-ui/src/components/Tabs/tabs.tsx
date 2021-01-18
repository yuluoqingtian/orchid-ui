import React, { useState, createContext } from "react"
import TabPane, { ITabPaneProps } from "./tabPane"

/*-----------------------------------------------------------------*/
/*                           type定义区域                           */
/*-----------------------------------------------------------------*/
type ButtonStyleType = "line" | "card" | "editable-card"
type onChangeType = (activeKey: string) => void
type onTabClickType = (key: string, event: React.MouseEvent) => void
interface ITabsProps {
  type?: ButtonStyleType
  onChange?: onChangeType
  onTabClick?: onTabClickType
  defaultActiveKey?: string
}
type TabsType = React.FC<ITabsProps> & { TabPane: React.FC<ITabPaneProps> }
interface ITabsContext {
  currentKey: string
}
export const TabsContext = createContext<ITabsContext>({ currentKey: "" })

const Tabs: TabsType = (props) => {
  const { children, defaultActiveKey, onTabClick, onChange } = props
  const tab_key_paneElement_map = {} as any

  let initKey = defaultActiveKey

  /**
   * 遍历children中每个TabPane,取出其中的props中的key和tab用于渲染tabNav,
   * 如果没有传defaultActiveKey，则默认初始化的activeKet为第一个TabPane的key
   */
  React.Children.forEach(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<ITabPaneProps>
    if ((childElement.type.displayName = "TabPane")) {
      // 如果说没有传defaultActiveKey,就将第一个TabPane中的key作为默认的
      if (!defaultActiveKey && index === 0) {
        initKey = childElement.props.tabKey
      }
      console.log("child", childElement)
      tab_key_paneElement_map[childElement.props.tabKey] =
        childElement.props.tab
    }
  })

  /*-----------------------------------------------------------------*/
  /*                             state区域                            */
  /*-----------------------------------------------------------------*/
  const [currentKey, setCurrent] = useState(initKey)

  function rederTabNavs() {
    return (
      <div className="orch-tabs-nav-list">
        {Object.keys(tab_key_paneElement_map).map((key, index) => {
          return (
            <div
              className="orch-tabs-tab"
              onClick={(event: React.MouseEvent) => {
                setCurrent(key)
                onTabClick && onTabClick(key, event)
              }}
            >
              {tab_key_paneElement_map[key]}
            </div>
          )
        })}
      </div>
    )
  }

  function renderTabPanes() {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<ITabPaneProps>
      if ((childElement.type.displayName = "TabPane")) {
        return child
      } else {
        console.error("Warning,Tabs has a child which is not a TabPane")
      }
    })
  }

  function renderNavsAndPanes(){
    
  }

  return (
    <div className="orch-tabs">
      <div className="orch-tabs-nav">{rederTabNavs()}</div>
      <div className="orch-tabs-content">
        <TabsContext.Provider value={{ currentKey: currentKey || "" }}>
          {renderTabPanes()}
        </TabsContext.Provider>
      </div>
    </div>
  )
}

Tabs.TabPane = TabPane

Tabs.defaultProps = {
  type: "line"
}

export default Tabs
