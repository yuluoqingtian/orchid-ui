import React from "react"
interface ITabNavProps {
  tabKey: string
  onClick?: (key: string, event: React.MouseEvent) => void
  disabled?: boolean
  tab: React.ReactNode
}
const TabNav: React.FC<ITabNavProps> = (props) => {
  const { onClick, tabKey } = props
  return (
    <div
      className="orch-tabs-tab"
      onClick={(event: React.MouseEvent) => {
        onClick && onClick(tabKey, event)
      }}
    ></div>
  )
}

export default TabNav
