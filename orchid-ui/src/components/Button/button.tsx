import React from "react"
import classNames from "classnames"
import { type } from "os"

export enum ButtonSize {
  Large = "lg",
  Small = "sm"
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link"
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children?: React.ReactNode
  href?: string
}

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>
type AnchorNativeProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorNativeProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    size,
    btnType,
    children,
    href,
    ...restProps
  } = props

  // btn btn-lg btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled
  })

  // 只有link返回a标签，其余都返回button
  if (btnType === ButtonType.Link) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
  // eslint-disable-next-line no-script-url
}

export default Button
