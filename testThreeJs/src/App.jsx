import './App.css'
import ThreeScene from './Scene'

function App() {

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <h1>Hello React + Three.js</h1> */}
      <ThreeScene /> {/* 這裡就會顯示你的 three.js 畫面 */}
    </div>
  )
}

export default App
