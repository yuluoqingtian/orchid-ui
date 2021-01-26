import React, { useState } from "react"
import Button from "./components/Button/button"
import Alert from "./components/Alert/alert"
import Title from "./components/Title/title"
import Menu from "./components/Menu/menu"
import { renderBlank } from "./utils"
import Tabs from "./components/Tabs/tabs"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import Icon from "./components/Icon/icon"
import Transition from "./components/Transition/tansition"
library.add(fas)

const { TabPane } = Tabs

const { MenuItem, SubMenu } = Menu

function App() {
  const style = {
    padding: "1.5%"
  }
  const [show, toogleShwo] = useState(false)
  return (
    <div className="App" style={{ ...style }}>
      <Title>Button</Title>
      <Button>hello</Button>
      {renderBlank(4)}
      <Button disabled>Disabled Button</Button>
      {renderBlank(4)}
      <Button disabled btnType="danger" size="lg">
        Large Danger Disabled Button
      </Button>
      {renderBlank(4)}
      <Button btnType="primary" size="lg">
        Large Primary
      </Button>
      {renderBlank(4)}
      <Button size="sm" btnType="danger">
        Small Danger
      </Button>
      {renderBlank(4)}
      <Button btnType="link" target="_blnak" href="https://baidu.com">
        Baidu Link
      </Button>
      {renderBlank(4)}
      <Button btnType="link" disabled>
        Disabled Link
      </Button>
      <Title>Alert</Title>
      <Alert
        type="danger"
        message="我是警告的标题"
        closable
        description="我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字,我是辅助文字我是辅助文字我是辅助文字"
      />
      {renderBlank(4)}
      <Alert
        type="success"
        message="我是成功的标题"
        description="我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字,我是辅助文字我是辅助文字我是辅助文字"
      />
      {renderBlank(4)}
      <Alert type="default" message="我是成功的标题" closable />
      {renderBlank(4)}
      <Alert
        type="warning"
        message="我是警告的标题"
        closable
        description="我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字,我是辅助文字我是辅助文字我是辅助文字"
      />
      <Title>Menu</Title>
      <Menu
        onSelect={(index) => alert(index)}
        defaultOpenSubMenus={["2"]}
        defaultIndex="1"
      >
        <MenuItem>cool link 1</MenuItem>
        <MenuItem>cool link 2</MenuItem>
        <SubMenu title="SubMenu">
          <MenuItem disabled>sub menu 1</MenuItem>
          <MenuItem>sub menu 2</MenuItem>
        </SubMenu>
        <MenuItem>cool link 3</MenuItem>
      </Menu>
      <Menu mode="vertical" defaultOpenSubMenus={["2"]}>
        <MenuItem>cool link 1</MenuItem>
        <MenuItem disabled>cool link 2</MenuItem>
        <SubMenu title="SubMenu1">
          <MenuItem disabled>sub menu 1</MenuItem>
          <MenuItem>sub menu 2</MenuItem>
        </SubMenu>
        <SubMenu title="SubMenu2">
          <MenuItem>sub menu 3</MenuItem>
          <MenuItem>sub menu 4</MenuItem>
        </SubMenu>
        <MenuItem>cool link 3</MenuItem>
      </Menu>
      <Title>Tabs</Title>
      <Tabs
        onTabClick={(key, event) => {
          console.log(key)
        }}
      >
        <TabPane tabKey="1" tab="选项卡1">
          <div>我是面板1</div>
        </TabPane>
        <TabPane tabKey="2" tab="选项卡1">
          <div>我是面板2</div>
        </TabPane>
        <TabPane
          tabKey={"3"}
          tab={
            <div>
              <i className="iconfont iconinfo"></i>&nbsp;用户管理
            </div>
          }
        >
          <div>我是面板3</div>
        </TabPane>
      </Tabs>
      <Tabs
        type="card"
        onTabClick={(key, event) => {
          console.log(key)
        }}
      >
        <TabPane tabKey="1" tab="选项卡1">
          <div>我是面板1</div>
        </TabPane>
        <TabPane tabKey="2" tab="选项卡1">
          <div>我是面板2</div>
        </TabPane>
        <TabPane tabKey={"3"} tab={<div>用户管理</div>}>
          <div>我是面板3</div>
        </TabPane>
        <TabPane tabKey={"4"} tab="选项卡4" disabled>
          <div>我是面板3</div>
        </TabPane>
      </Tabs>
      <Title>Transition</Title>
      <div>
        <Button
          onClick={() => {
            toogleShwo(!show)
          }}
        >
          toogle
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>fjdasfpaoqwjfqjfeqwfqfew</p>
            <p>fjdasfpaoqwjfqjfeqwfqfew</p>
            <p>fjdasfpaoqwjfqjfeqwfqfew</p>
            <p>fjdasfpaoqwjfqjfeqwfqfew</p>
            <p>fjdasfpaoqwjfqjfeqwfqfew</p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
          <Button>123</Button>
        </Transition>
      </div>
    </div>
  )
}

export default App
