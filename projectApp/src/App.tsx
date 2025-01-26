import './App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './Scene/InitScene';
function App() {

  return (
    <>
    <div className="canvas-container">
    <Canvas flat linear>
      
      <mesh>
      <InitScene>

      </InitScene>
      </mesh>
      </Canvas>
      </div>
    </>
  )
}

export default App
