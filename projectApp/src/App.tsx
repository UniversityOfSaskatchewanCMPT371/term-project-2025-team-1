import './styles/App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './pages/Scene/InitScene';
import { Sky } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import { button, useControls } from 'leva';

//Initializes and configures various parts integral to a VR experienceq
const store = createXRStore()

//The main function for the program
function App() {
  //The GUI button for loading local files
  function LoadComponent(){
    const { load } = useControls({
      'Load Load CSV' : button(() => alert("Loading Local File"))}) as {load: () => void}
      return null;
    }
  
  function URLComponent(){
    const { csv } = useControls(
      {csv: { label: 'CSV by URL', value: "Enter URL"}, button: button(() => alert("test"))} 
    )
    return null;
  }
  function UnmountedComponents(){
    useControls(
      'Loaded Graphs', {barValue: false, second:false}, {collapsed: true}
    );

    return null;
  }

  function AllComponents(){
    return <>
              <LoadComponent/>
              <URLComponent/>
              <UnmountedComponents/>
            </>
  }
  return (
    <>
      <div>
        CMPT 371: Team #1
      </div>
      <div>
        <AllComponents></AllComponents>
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
