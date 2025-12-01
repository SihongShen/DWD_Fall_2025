"use client";

function MyButton() {
  let handleClick = () => {
    console.log("Button clicked!");
  }

  return (
    <button onClick={handleClick}>Click Me</button>
  )
}

export default function Home() {
  return (
    <>
    <MyButton />
    </>
  )
}