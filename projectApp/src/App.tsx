import './styles/App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './pages/Scene/InitScene';
import { Sky } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';

const store = createXRStore()

function App() {
  
  return (
    <>
      <div>
        CMPT 371: Team #1
      </div>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <div className="canvas-container">
        <Canvas>
          <XR store={store}>
            <Sky sunPosition={[0.5,0,0.5]}/>
            <ambientLight/>
            <InitScene/>
          </XR>
        </Canvas>
      </div>
    </>
  )
}

export default App
