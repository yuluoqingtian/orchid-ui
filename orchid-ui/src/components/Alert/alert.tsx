import React, { useState } from "react"
import classnames from "classnames"
import Transition from "../Transition/tansition"
import Icon from "../Icon/icon"

/*规定一下props的样子*/
interface BaseAlertProps {
  type?: "success" | "default" | "danger" | "warning"
  className?: string // 用户自定义的类名
  message?: string // 警告的内容
  description?: string //辅助文字
  closable?: boolean // 是否显示关闭按钮
}

export type AlertProps = Partial<
  BaseAlertProps & React.HTMLAttributes<HTMLDivElement>
>

const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    type,
    message,
    description,
    closable,
    ...restProprs
  } = props

  const [show, setShow] = useState(true)

  const classes = classnames("orch-alert", className, {
    [`orch-alert-${type}`]: type
  })

  return (
    <Transition in={show} timeout={300} animation="zoom-in-top">
      <div className={classes} {...restProprs}>
        <div className="orch-alert-content">
          <div className="orch-alert-message">{message}</div>
          {description && (
            <div className="orch-alert-description">{description}</div>
          )}
        </div>
        {closable && (
          <Icon
            icon="times"
            className="icon-close"
            onClick={() => {
              setShow(false)
            }}
          />
        )}
      </div>
    </Transition>
  )
}

// 默认的参数
Alert.defaultProps = {
  type: "default",
  closable: false
}

export default Alert
