import React from "react"
import classNames from "classnames"

interface BaseTitleProps {
  text?: string
  className: String
}

type TitleProps = Partial<BaseTitleProps & React.HTMLAttributes<HTMLDivElement>>

const Title: React.FC<TitleProps> = (props) => {
  const { text, children, className } = props

  const classes = classNames("orch-title", className)
  return <div className={classes}>{text ? text : children}</div>
}

export default Title
