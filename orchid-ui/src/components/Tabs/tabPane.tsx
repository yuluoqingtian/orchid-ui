import React, { useContext } from "react"
import className from "classnames"
import { TabsContext } from "./tabs"

export interface ITabPaneProps {
  tabKey: string
  tab?: React.ReactNode
  disabled?: boolean
}

const TabPane: React.FC<ITabPaneProps> = (props) => {
  const { children, tabKey } = props
  const contect = useContext(TabsContext)
  const classes = className("orch-tabs-tabpane", {
    "is-active": tabKey === contect.currentKey
  })
  return <div className={classes}>{children}</div>
}

TabPane.displayName = "TabPane"

export default TabPane
