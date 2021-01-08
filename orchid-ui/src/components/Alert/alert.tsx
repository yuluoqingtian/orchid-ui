import React from "react"
import classnames from "classnames"

//alert 的类型
export enum AlertType {
  success = "success",
  default = "default",
  danger = "danger",
  warning = "warning"
}

/*规定一下props的样子*/
interface AlertProps {
  type?: AlertType
  className?: string
  message?: string // 警告的内容
  description?: string //辅助文字
  closable?: boolean // 是否显示关闭按钮
}

const Alert: React.FC<AlertProps> = (props) => {
  const { className, type } = props
  const classes = classnames("orch-alert", className, {
    [`orch-alert-${type}`]: type
  })
  return (
    <div
      style={{ border: "1px solid black", height: "100px", width: "100px" }}
      className={classes}
    ></div>
  )
}

// 默认的参数
Alert.defaultProps = {
  type: AlertType.default,
  closable: false
}

export default Alert
