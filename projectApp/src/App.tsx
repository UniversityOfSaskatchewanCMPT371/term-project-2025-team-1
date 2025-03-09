import './styles/App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './pages/Scene/InitScene';
import { Sky } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import { BrowserUI } from './pages/UI/BrowserUI';

//Initializes and configures various parts integral to a VR experienceq
const store = createXRStore()

//The main function for the program
function App() {
  
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh'}}>
        {/* Everything encapsulated by Canvas and XR will contain the Scene to be displayed in VR */}
        <Canvas>
          <XR store={store}>
          <Sky sunPosition={[0.5,0,0.5]}/>
            <ambientLight/>
            {/* InitScene starts up the scene displayed */}
            <InitScene/> 
          </XR>
        </Canvas>
      </div>
      <div>
        {/* This button will allow the user to enter the VR Space (possibly not needed commented out for now) */}
        {/* <button onClick={() => {void (async () => store.enterAR())}}>Enter AR</button> */}
        <BrowserUI/>
      </div>
    </>
  )
}

export default App
