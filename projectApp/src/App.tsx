import './App.css'
import { Canvas, useThree } from '@react-three/fiber';
import InitScene from './Scene/InitScene';
import { OrbitControls, Sky } from '@react-three/drei';
import { Controllers, VRButton, XR } from '@react-three/xr';

function App() {
  
  
  return (
    <>
    <div>CMPT 371: Team #1</div>
    <VRButton/>
    <div className="canvas-container">
      <Canvas>
        {/* Might need to get rid of XR */}
        <XR>
          <Sky sunPosition={[0.5,0,0.5]}/>
          <ambientLight/>
          <Controllers/>
          <InitScene/>
        </XR>
        
      </Canvas>
      </div>
    </>
  )
}

export default App
