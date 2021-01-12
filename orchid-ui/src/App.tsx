import React from "react"
import Button, { ButtonSize, ButtonType } from "./components/Button/button"
import Alert, { AlertType } from "./components/Alert/alert"
import { renderBlank } from "./utils"
function App() {
  const style = {
    padding: "1.5%"
  }
  return (
    <div className="App" style={{ ...style }}>
      <h2>Button</h2>
      <Button>hello</Button>
      {renderBlank(4)}
      <Button disabled>Disabled Button</Button>
      {renderBlank(4)}
      <Button disabled btnType={ButtonType.Danger} size={ButtonSize.Large}>
        Large Danger Disabled Button
      </Button>
      {renderBlank(4)}
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Large Primary
      </Button>
      {renderBlank(4)}
      <Button size={ButtonSize.Small} btnType={ButtonType.Danger}>
        Small Danger
      </Button>
      {renderBlank(4)}
      <Button
        btnType={ButtonType.Link}
        target="_blnak"
        href="https://baidu.com"
      >
        Baidu Link
      </Button>
      {renderBlank(4)}
      <Button btnType={ButtonType.Link} disabled>
        Disabled Link
      </Button>
      <br />
      <br />
      <h2>Alert</h2>
      <Alert
        type={AlertType.danger}
        message="我是警告的标题"
        closable
        description="我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字,我是辅助文字我是辅助文字我是辅助文字"
      />
      {renderBlank(4)}
      <Alert
        type={AlertType.success}
        message="我是成功的标题"
        description="我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字,我是辅助文字我是辅助文字我是辅助文字"
      />
      {renderBlank(4)}
      <Alert type={AlertType.default} message="我是成功的标题" closable />
      {renderBlank(4)}
      <Alert
        type={AlertType.warning}
        message="我是警告的标题"
        closable
        description="我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字我是辅助文字,我是辅助文字我是辅助文字我是辅助文字"
      />
    </div>
  )
}

export default App
