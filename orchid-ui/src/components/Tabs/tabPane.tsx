import React, { useContext } from "react"
import classNames from "classnames"
import { TabsContext } from "./tabs"

export interface ITabPaneProps {
  tabKey: string
  tab?: React.ReactNode
  disabled?: boolean
}

const TabPane: React.FC<ITabPaneProps> = (props) => {
  const { children, tabKey } = props
  const contect = useContext(TabsContext)
  const classes = classNames("orch-tabs-tabpane", {
    "is-active": tabKey === contect.currentKey
  })
  return <div className={classes}>{children}</div>
}

TabPane.displayName = "TabPane"

export default TabPane
