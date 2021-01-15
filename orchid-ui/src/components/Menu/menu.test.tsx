import React from "react"
import {
  render,
  fireEvent,
  cleanup,
  RenderResult,
  waitFor
} from "@testing-library/react"
import Menu, { MenuProps } from "./menu"

const { MenuItem, SubMenu } = Menu

//用来测试的props
const testProps: MenuProps = {
  defaultIndex: "0",
  className: "test",
  onSelect: jest.fn()
}
// 测试垂直模式,和默认展开
const testVerProps: MenuProps = {
  mode: "vertical",
  onSelect: jest.fn(),
  defaultOpenSubMenus:['4']
}
const renderMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown 1</MenuItem>
      </SubMenu>
      <SubMenu title="default dropdown">
        <MenuItem>default dropdown 1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

//创建样式文件
function createStyle() {
  const cssString = `
    .orch-submenu{
      display:none
    }
    .orch-submenu.menu-opened{
      display:block
    }
  `
  const style = document.createElement("style")
  style.type = "text/css"
  style.innerHTML = cssString
  return style
}

// 定义用于测试的元素引用，减少代码重复
let wrapper: RenderResult
let menuEle: HTMLElement
let activeMenuItem: HTMLElement
let disabledMenuItem: HTMLElement
let xyzMenuItem: HTMLElement
let subMenu: HTMLElement
let subMenuItem: HTMLElement

// 开始执行单元测试案例
describe("测试Menu组件", () => {
  beforeEach(() => {
    wrapper = render(renderMenu(testProps))
    menuEle = wrapper.getByTestId("menu-test")
    activeMenuItem = wrapper.getByText("active") as HTMLElement
    disabledMenuItem = wrapper.getByText("disabled") as HTMLElement
    xyzMenuItem = wrapper.getByText("xyz") as HTMLElement
    subMenu = wrapper.getByText("dropdown").parentElement as HTMLElement
    subMenuItem = wrapper.queryByText("dropdown 1") as HTMLElement
  })

  it("Menu 和 MenuItem 在默认参数下应该正常渲染", () => {
    expect(menuEle).toBeInTheDocument()
    expect(menuEle).toHaveClass("orch-menu test")
    //expect(menuEle.getElementsByTagName("li").length).toEqual(3)
    expect(menuEle.querySelectorAll(":scope > li")).toHaveLength(5)
    expect(activeMenuItem).toHaveClass("is-active")
    expect(disabledMenuItem).toHaveClass("is-disabled")
  })

  it("点击Menu项应切换active并调用onSelect回调函数，disable项点击应该无反应", () => {
    fireEvent.click(xyzMenuItem)
    expect(xyzMenuItem).toHaveClass("is-active")
    expect(activeMenuItem).not.toHaveClass("is-active")
    expect(testProps.onSelect).toBeCalledWith("2")
    fireEvent.click(disabledMenuItem)
    expect(disabledMenuItem).not.toHaveClass("is-active")
    expect(testProps.onSelect).not.toBeCalledWith("1")
  })

  it("在mode='vertical' 时，Menu应渲染为vertical", () => {
    cleanup()
    const wrapper = render(renderMenu(testVerProps))
    const menu = wrapper.getByTestId("menu-test")
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveClass("menu-vertical")
  })

  it("水平菜单模式下,当鼠标悬浮在SubMenu上时应该展示下拉菜单", async () => {
    wrapper.container.append(createStyle())
    expect(subMenuItem).not.toBeVisible()
    fireEvent.mouseEnter(subMenu)
    /**
     * SubMenu中有一个异步操作，鼠标悬浮上去之后300ms，下来菜单才出现
     * 所以这里不能直接断言 expect(subMenuItem).toBeVisible()
     * 要用异步的断言，waitFor，
     * 其中的回调函数会被一直执行直到超时或断言通过,才会执行后面的代码
     */
    await waitFor(() => {
      expect(subMenuItem).toBeVisible()
    })

    // 此时下拉菜单已经出现，因为上面那条断言已经通过
    fireEvent.click(subMenuItem)
    expect(testProps.onSelect).toBeCalledWith("3-0")

    fireEvent.mouseLeave(subMenu)
    await waitFor(() => {
      expect(subMenuItem).not.toBeVisible()
    })
  })

  it("垂直菜单模式下,点击SubMenu能控制下拉菜单的显示和隐藏", () => {
    cleanup()
    const wrapper = render(renderMenu(testVerProps))
    wrapper.container.append(createStyle())
    const subMenu = wrapper.getByText("dropdown") as HTMLElement
    const subMenuItem = wrapper.getByText("dropdown 1")
    expect(subMenuItem).not.toBeVisible()
    fireEvent.click(subMenu)
    expect(subMenuItem).toBeVisible()
    fireEvent.click(subMenuItem)
    expect(testVerProps.onSelect).toBeCalledWith("3-0")
    fireEvent.click(subMenu)
    expect(subMenuItem).not.toBeVisible()
    const defaultDropDownItem = wrapper.getByText('default dropdown 1')
    expect(defaultDropDownItem).toBeVisible()
  })
})
