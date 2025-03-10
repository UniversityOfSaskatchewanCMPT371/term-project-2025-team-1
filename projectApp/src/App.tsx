import './styles/App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './pages/Scene/InitScene';
import { Sky } from '@react-three/drei';
import { createXRStore, useXR, XR } from '@react-three/xr';
import BrowserUI from './pages/UI/BrowserUI';
import { useState } from 'react';

//Initializes and configures various parts integral to a VR experienceq
const store = createXRStore()

//The main function for the program
function App() {
  const [inVR, setInVR] = useState(false);

  function XRScene({setInVR}: {setInVR: (value:boolean) => void}){
    const { session } = useXR();
    if(session){
      setInVR(true);
    }
    else{
      setInVR(false);
    }
    return null;
  }
  return (
    <>
      <div>
        CMPT 371: Team #1
      </div>
      {/* This button will allow the user to enter the VR Space */}
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <div className="canvas-container">
      <div>
        <BrowserUI/>
      </div>
        {/* Everything encapsulated by Canvas and XR will contain the Scene to be displayed in VR */}
        <Canvas>
          <color attach="background" args={["black"]}></color>
          <XR store={store}>
            <XRScene setInVR={setInVR}></XRScene>
          <Sky sunPosition={[0.5,0,0.5]}/>
            <ambientLight/>
            {/* InitScene starts up the scene displayed */}
            <InitScene inVR={inVR}/> 
          </XR>
        </Canvas>
      </div>
    </>
  )
}

export default App
