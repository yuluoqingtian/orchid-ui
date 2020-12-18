import React from "react"
import Button, { ButtonSize, ButtonType } from "./components/Button/button"
import { renderBlank } from "./utils"
function App() {
  return (
    <div className="App">
      <h2>Button</h2>
      <Button disabled>hello</Button>
      {renderBlank(8)}
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        hello
      </Button>
      <Button btnType={ButtonType.Link} disabled>
        link
      </Button>
    </div>
  )
}

export default App
