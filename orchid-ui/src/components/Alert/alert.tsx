import React, {useState } from "react"
import classnames from "classnames"

//alert 的类型
export enum AlertType {
  success = "success",
  default = "default",
  danger = "danger",
  warning = "warning"
}

/*规定一下props的样子*/
interface BaseAlertProps {
  type?: AlertType
  className?: string // 用户自定义的类名
  message?: string // 警告的内容
  description?: string //辅助文字
  closable?: boolean // 是否显示关闭按钮
}

export type AlertProps = Partial<
  BaseAlertProps & React.HTMLAttributes<HTMLDivElement>
>

const Alert: React.FC<AlertProps> = (props) => {
  // 设置Alert组件是否隐藏。隐藏时播放动画
  const [hide, setHide] = useState(false)
  // 设置Alert组件是否渲染，播放完动画，后让Alert消失
  const [display, setDisplay] = useState(true)

  const { className, type, message, description, closable } = props
  const classes = classnames("orch-alert", className, {
    [`orch-alert-${type}`]: type,
    "orch-alert-hide": hide
  })

  if (!display) {
    return null
  }
  return (
    <div className={classes}>
      <div className="orch-alert-content">
        <div className="orch-alert-message">{message}</div>
        {description && (
          <div className="orch-alert-description">{description}</div>
        )}
      </div>
      {closable && (
        <i
          className="iconfont iconx"
          onClick={() => {
            setHide(true)
            setTimeout(() => setDisplay(false), 300)
          }}
        ></i>
      )}
    </div>
  )
}

// 默认的参数
Alert.defaultProps = {
  type: AlertType.default,
  closable: false
}

export default Alert
