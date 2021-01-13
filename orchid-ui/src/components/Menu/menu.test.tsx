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
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>xyz</MenuItem>
    </Menu>
  )
}

// 定义用于测试的元素引用，减少代码重复
let wrapper: RenderResult
let activeMenuItem: HTMLElement
let disabledMenuItem : HTMLElement
let xyzMenuItem : HTMLElement
describe("测试Menu组件", () => {
  beforeEach(() => {
    wrapper = render(renderMenu(testProps))
    activeMenuItem = wrapper.queryByTestId('menu-test')
  })

  it("Menu 和 MenuItem 在默认参数下应该正常渲染", () => {})

  it("点击Menu项应切换active并调用onSelect回调函数，disable项点击应该无反应", () => {})

  it("在mode = 'vertical' 时，Menu应渲染为vertical",()=>{})
})
