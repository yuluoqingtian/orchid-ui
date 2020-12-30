import React from "react"
import Button, { ButtonSize, ButtonType } from "./components/Button/button"
import { renderBlank } from "./utils"
function App() {
  return (
    <div className="App">
      <h2>Button</h2>
      <Button>hello</Button>
      {renderBlank(4)}
      <Button disabled>Disabled Button</Button>
      {renderBlank(4)}
      <Button disabled  btnType={ButtonType.Danger} size={ButtonSize.Large}>Large Danger Disabled Button</Button>
      {renderBlank(4)}
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Large Primary
      </Button>
      {renderBlank(4)}
      <Button
        size={ButtonSize.Small}
        btnType={ButtonType.Danger}
      >
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
    </div>
  )
}

export default App
