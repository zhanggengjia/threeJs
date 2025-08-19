import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeScene from './Scene'

function App() {

  return (
    <div style={{ height: '80vh' }}>
      <h1>Hello React + Three.js</h1>
      <ThreeScene /> {/* 這裡就會顯示你的 three.js 畫面 */}
    </div>
  )
}

export default App
