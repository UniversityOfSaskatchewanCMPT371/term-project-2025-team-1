import './styles/App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './pages/Scene/InitScene';
import { Sky } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import { MainController } from './controller/MainController';

//Initializes and configures various parts integral to a VR experience
const store = createXRStore()

//The main function for the program
function App() {
  return (
    <>
      <div>
        CMPT 371: Team #1
      </div>
      {/* This button will allow the user to enter the VR Space */}
      <button onClick={() => {void (async () => store.enterAR())}}>Enter AR</button>
      <div className="canvas-container">
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
    </>
  )
}

export default App
