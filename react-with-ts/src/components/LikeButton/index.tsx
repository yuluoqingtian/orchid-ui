import React, { useState, useEffect } from "react"

const LikeButton: React.FC = (props) => {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  useEffect(() => {
    document.title = `like = ${like}`
  })

  function alertClick() {
    setTimeout(() => {
      alert(`you clicked button like = ${like}`)
    }, 3000)
  }

  return (
    <>
      <button
        onClick={() => {
          setLike(like + 1)
        }}
      >
        {like} 👍
      </button>
      <button
        onClick={() => {
          setOn(!on)
        }}
      >
        {on ? "ON" : "OFF"}
      </button>
      <button onClick={alertClick}>Alert!</button>
    </>
  )
}

export default LikeButton
