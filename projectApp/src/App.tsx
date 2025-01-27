import './App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './Scene/InitScene';
import { OrbitControls } from '@react-three/drei';
import MainScene from './Scene/mainScene';
function App() {

  return (
    <>
    <div className="canvas-container">
    <Canvas flat linear>
      <InitScene></InitScene>
      </Canvas>
      </div>
    </>
  )
}

export default App
