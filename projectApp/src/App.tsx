import './App.css'
import { Canvas, useThree } from '@react-three/fiber';
import InitScene from './Scene/InitScene';
import { OrbitControls } from '@react-three/drei';
import { VRButton, XR } from '@react-three/xr';

function App() {
  return (
    <>
    <div>CMPT 371: Team #1</div>
    <VRButton></VRButton>
    <div className="canvas-container">
      <Canvas
      camera={{position:[0,1.6,5]}}>
        <XR>
          <ambientLight/>
          <InitScene/>
        </XR>
      </Canvas>
      </div>
    </>
  )
}

export default App
