import React, { useState, useRef, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"
import Hello from "./components/Hello"
import LikeButton from "./components/LikeButton"
import MouseTracker from "./components/MouseTracker"
import useMousePosition from "./hooks/useMousePosition"
import useURLLoader from "./hooks/useURLLoader"

const App: React.FC = () => {
  const position = useMousePosition()
  const [photoSeq, setPhotoSeq] = useState(0)
  const [
    data,
    loading,
  ] = useURLLoader("https://dog.ceo/api/breeds/image/random", [photoSeq])

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log("effect")

    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  })

  console.log('reRender');
  
  return (
    <div className="App">
      <input type="text" ref={inputRef}></input>
      <Hello />
      <LikeButton />
      {/* <MouseTracker/> */}
      <p>{"x:" + position.x + "  " + "y:" + position.y}</p>
      <button onClick={() => setPhotoSeq(photoSeq + 1)}>
        加载下一张张狗狗的照片
      </button>
      <div>
        {loading ? (
          <p>🐕狗狗正在加载</p>
        ) : (
          <p>
            <img src={data && data.message}></img>
          </p>
        )}
      </div>
    </div>
  )
}

export default App
