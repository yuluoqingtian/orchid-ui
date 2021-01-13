import { render, fireEvent } from "@testing-library/react"
import Button, { ButtonProps } from "./button"

const defaultProps: ButtonProps = {
  onClick: jest.fn()
}

const testPorps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: "klass"
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe("测试BUTTON 组件", () => {
  it("测试 default button 渲染正确", () => {
    const wrapper = render(<Button {...defaultProps}>test</Button>)
    const ele = wrapper.queryByText("test") as HTMLElement
    expect(ele).toBeTruthy()
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual("BUTTON")
    expect(ele).toHaveClass("btn btn-default")
    // 模拟用户点击事件
    fireEvent.click(ele)
    // 断言按钮点击事件被调用
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it("测试不同的 props 渲染正确", () => {
    const wrapper = render(<Button {...testPorps}>test</Button>)
    const ele = wrapper.queryByText("test") as HTMLElement
    expect(ele).toBeTruthy()
    expect(ele).toHaveClass("btn btn-lg btn-primary klass")
  })

  it("测试 <a/> 类型 button 是否渲染正确", () => {
    const wrapper = render(<Button btnType='link'>Link</Button>)
    const ele = wrapper.queryByText("Link") as HTMLElement
    expect(ele.tagName).toEqual("A")
    expect(ele).toHaveClass("btn-link")
  })

  it("测试 disabled 是否渲染正确", () => {
    const wrapper = render(<Button {...disabledProps}>test</Button>)
    const ele = wrapper.queryByText("test") as HTMLElement
    expect(ele).toBeTruthy()
    expect(ele).toBeDisabled()
    fireEvent.click(ele)
    expect(disabledProps.onClick).not.toBeCalled()
  })
})
