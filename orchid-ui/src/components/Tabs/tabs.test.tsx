import React from "react"
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from "@testing-library/react"
import Tabs, { ITabsProps } from "./tabs"

const { TabPane } = Tabs
const defaultTabsProps: ITabsProps = {
  onTabClick: jest.fn(),
  defaultActiveKey: "2",
  className: "myclass"
}

function renderTabs(props: ITabsProps) {
  return (
    <Tabs {...props}>
      <TabPane tabKey="1" tab="tab1" disabled>
        <div>tabpane1</div>
      </TabPane>
      <TabPane tabKey="2" tab="tab2">
        <div>tabpane2</div>
      </TabPane>
      <TabPane
        tabKey={"3"}
        tab={
          <div>
            <i className="iconfont iconinfo"></i>&nbsp;tab3
          </div>
        }
      >
        <div>tabpane3</div>
      </TabPane>
    </Tabs>
  )
}

function createStyle() {
  const cssString = `
    .orch-tabs-tabpane {
        display: none;
      }
    .orch-tabs-tabpane.is-active {
        display: block;
      }
    `
  const style = document.createElement("style")
  style.innerHTML = cssString
  return style
}

let wrapper: RenderResult
let tabsEle: HTMLElement
let paneWrapperEle: Element
let activeTabEle: HTMLElement
let disabledTabEle: HTMLElement
let tab3Ele: HTMLElement
let tabpane2Ele: HTMLElement
let tabpane1Ele: HTMLElement
let tabpane3Ele: HTMLElement

describe("测试tabs组件", () => {
  beforeEach(() => {
    wrapper = render(renderTabs(defaultTabsProps))
    tabsEle = wrapper.getByTestId("orch-tabs")
    paneWrapperEle = tabsEle.getElementsByClassName("orch-tabs-content")[0]
    activeTabEle = wrapper.queryByText("tab2") as HTMLElement
    disabledTabEle = wrapper.queryByText("tab1") as HTMLElement
    tab3Ele = wrapper.queryByText("tab3")?.parentElement as HTMLElement
    tabpane2Ele = wrapper.queryByText("tabpane2") as HTMLElement
    tabpane1Ele = wrapper.queryByText("tabpane1") as HTMLElement
    tabpane3Ele = wrapper.queryByText("tabpane3") as HTMLElement
  })
  it("默认的tabs正确渲染", () => {
    // 添加样式
    tabsEle.append(createStyle())
    expect(tabsEle).toHaveClass("orch-tabs myclass")
    expect(
      paneWrapperEle.getElementsByClassName("orch-tabs-tabpane")
    ).toHaveLength(3)
    expect(activeTabEle).toHaveClass("is-active")
    expect(disabledTabEle).toHaveClass("is-disabled")
    // 第二个面板应该显示，其余面板应该隐藏
    expect(tabpane2Ele).toBeVisible()
    expect(tabpane1Ele).not.toBeVisible()
    expect(tabpane3Ele).not.toBeVisible()
  })

  it("点击tab项切换,onClick回调函数被正确执行", () => {
    expect(tab3Ele).not.toHaveClass("is-active")
    fireEvent.click(tab3Ele)
    expect(defaultTabsProps.onTabClick).toBeCalled()
    expect(activeTabEle).not.toHaveClass("is-active")
    expect(tab3Ele).toHaveClass("is-active")
    fireEvent.click(disabledTabEle)
    expect(defaultTabsProps.onTabClick).not.toBeCalledTimes(2)
    expect(tab3Ele).toHaveClass("is-active")
    expect(disabledTabEle).not.toHaveClass("is-active")
  })

  it("card 类型的 tabs 能正常显示", () => {
    cleanup()
    const cardTabProps: ITabsProps = {
      onTabClick: jest.fn(),
      defaultActiveKey: "2",
      className: "myclass",
      type: "card"
    }
    const wrapper = render(renderTabs(cardTabProps))
    const tabsEle = wrapper.getByTestId("orch-tabs")
    expect(tabsEle).toHaveClass("orch-tabs orch-tabs-card")
  })
})
