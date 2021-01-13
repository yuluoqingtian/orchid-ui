import React from "react"
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
} from "@testing-library/react"
import Menu, { MenuProps } from "./menu"

const MenuItem = Menu.MenuItem

//用来测试的props
const testProps: MenuProps = {
  defaultIndex: 0,
  className: "test",
  onSelect: jest.fn()
}
const testVerProps: MenuProps = {
  mode: "vertical"
}

const renderMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        xyz
      </MenuItem>
    </Menu>
  )
}

// 定义用于测试的元素引用，减少代码重复
let wrapper: RenderResult
let menuEle: HTMLElement
let activeMenuItem: HTMLElement
let disabledMenuItem: HTMLElement
let xyzMenuItem: HTMLElement

// 开始执行单元测试案例
describe("测试Menu组件", () => {
  beforeEach(() => {
    wrapper = render(renderMenu(testProps))
    menuEle = wrapper.getByTestId('menu-test')
    activeMenuItem = wrapper.getByText('active') as HTMLElement
    disabledMenuItem = wrapper.getByText('disabled') as HTMLElement
    xyzMenuItem = wrapper.getByText('xyz') as HTMLElement
  })

  it("Menu 和 MenuItem 在默认参数下应该正常渲染", () => {
    expect(menuEle).toBeInTheDocument()
    expect(menuEle).toHaveClass('orch-menu test')
    expect(menuEle.getElementsByTagName('li').length).toEqual(3)
    expect(activeMenuItem).toHaveClass('is-active')
    expect(disabledMenuItem).toHaveClass('is-disabled')
  })

  it("点击Menu项应切换active并调用onSelect回调函数，disable项点击应该无反应", () => {
    fireEvent.click(xyzMenuItem)
    expect(xyzMenuItem).toHaveClass('is-active')
    expect(activeMenuItem).not.toHaveClass('is-active')
    expect(testProps.onSelect).toBeCalledWith(2)
    fireEvent.click(disabledMenuItem)
    expect(disabledMenuItem).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toBeCalledWith(1)
  })

  it("在mode='vertical' 时，Menu应渲染为vertical", () => {
    cleanup()
    const wrapper = render(renderMenu(testVerProps))
    const menu = wrapper.getByTestId('menu-test')
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveClass('menu-vertical')
  })
})
