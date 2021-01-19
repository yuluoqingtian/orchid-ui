import React, { useContext } from "react"
import { TabsContext } from "./tabs"
import classNames from "classnames"
interface ITabNavProps {
  tabKey: string
  disabled?: boolean
  tab: React.ReactNode
  key: string
}
const TabNav: React.FC<ITabNavProps> = (props) => {
  const { tabKey, tab, disabled } = props
  const context = useContext(TabsContext)
  const classes = classNames("orch-tabs-tab", {
    "is-disabled": disabled,
    "is-active": context.currentKey === tabKey
  })
  return (
    <div
      className={classes}
      onClick={(event) => {
        !disabled && context.onClick && context.onClick(tabKey, event)
      }}
    >
      {tab}
    </div>
  )
}

export default TabNav
