import React from "react";
import Button from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Title from "./components/Title/title";
import Menu from "./components/Menu/menu";
import { renderBlank } from "./utils";
import Tabs from "./components/Tabs/tabs";

const { TabPane } = Tabs;

const { MenuItem, SubMenu } = Menu;

function App() {
  const style = {
    padding: "1.5%",
  };
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
        type="card"
        onTabClick={(key, event) => {
          console.log(key);
        }}
        defaultActiveKey="3"
      >
        <TabPane tabKey="1" tab="tab1">
          <div>我是面板1</div>
        </TabPane>
        <TabPane tabKey="2" tab="tab2" disabled>
          <div>我是面板2</div>
        </TabPane>
        <TabPane
          tabKey={"3"}
          tab={<div style={{ color: "red" }}>div tab3</div>}
        >
          <div>我是面板3</div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
