import { render, fireEvent } from "@testing-library/react"
import Alert, { AlertProps } from "./alert"

describe("测试Alert组件", () => {
  it("测试default Alert是否渲染正确", () => {
    const defaultPorps: AlertProps = {
      message: "message",
      title: "test-alert"
    }
    const wrapper = render(<Alert {...defaultPorps} />)
    const ele = wrapper.queryByTitle("test-alert")
    //alert 组件应该在文档中
    expect(ele).toBeInTheDocument()
    // alert 组件应默认含有以下类名
    expect(ele).toHaveClass("orch-alert orch-alert-default")
    //message 应被正确渲染
    const messageEle = wrapper.queryByText("message")
    expect(messageEle).toBeInTheDocument()
    // 不应该含有关闭按钮
    const iconEle = wrapper.queryByLabelText("i")
    expect(iconEle).toBeNull()
  })

  it("测试不同类型的 Alert", () => {
    const defaultPorps: AlertProps = {
      message: "message",
      title: "test-alert",
      type: 'success'
    }
    const wrapper = render(<Alert {...defaultPorps} />)
    const ele = wrapper.queryByTitle("test-alert")
    expect(ele).toBeInTheDocument()
    // alert 组件应含有以下类名
    expect(ele).toHaveClass("orch-alert orch-alert-success")
  })

  it("测试description 正确渲染", () => {
    const defaultPorps: AlertProps = {
      message: "message",
      title: "test-alert",
      description: "description"
    }
    const wrapper = render(<Alert {...defaultPorps} />)
    const ele = wrapper.queryByTitle("test-alert")
    expect(ele).toBeInTheDocument()
    const desEle = wrapper.queryByText("description")
    expect(desEle).toBeInTheDocument()
  })

  it("测试关闭开关×正确渲染,点击事件是否正确", () => {
    const defaultPorps: AlertProps = {
      message: "message",
      title: "test-alert",
      description: "description",
      closable:true,
    }
    const wrapper = render(<Alert {...defaultPorps} />)
    const ele = wrapper.queryByTitle("test-alert") as HTMLElement
    expect(ele).toBeInTheDocument()
     // 应该含有关闭按钮
     const iconEle = ele.lastChild as HTMLElement
     expect(iconEle).toBeInTheDocument()
     expect(iconEle.tagName).toEqual("I")
    // 点击×，元素300ms后会消失
    fireEvent.click(iconEle)
    setTimeout(()=>{
        expect(ele).not.toBeInTheDocument()
    },1000)
  })

})
