import './styles/App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './pages/Scene/InitScene';
import { Html, Sky, Text } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import { useControls, Leva, button, buttonGroup } from 'leva';
import { Root, Container } from '@react-three/uikit';
import { useState } from 'react';

//Initializes and configures various parts integral to a VR experience
const store = createXRStore()

function MyComponent() {
  const { local } = useControls({ 
    'Load Local Csv': button(()=> alert("hey"))}) as {local: () => void}
  return <div></div>;
}

function AnotherComponent() {
  const { csv} = useControls(
    { csv: { label:'CSV by URL', value: 'Enter URL'} })
  return <div>Hey, I'm {csv}</div>
}

//Boolean folder graphs, then a button right under it
//Any graph marked, will be deleted on button click
function UnmountedComponent() {
  const {barValue} = useControls(
    'Loaded Graphs', { barValue: false },{collapsed: true});
  return barValue ? <div>Hello!</div> : null
}

//The main function for the program
function App() {
  const [pressed, press] = useState(false);
  const x= 0;
  const y = 1;
  const z = -1;
  return (
    <>
      <div>
        CMPT 371: Team #1
      </div>
      {/* Maybe keep gui stuff on one function, and return the <div> For title */}
      <div>
              <MyComponent></MyComponent>
              <AnotherComponent></AnotherComponent>
              <UnmountedComponent></UnmountedComponent>
            </div>
      {/* This button will allow the user to enter the VR Space */}
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <div className="canvas-container">
        {/* Everything encapsulated by Canvas and XR will contain the Scene to be displayed in VR */}
        <Canvas>
          <XR store={store}>
            <Sky sunPosition={[0.5,0,0.5]}/>
            <ambientLight intensity={0.5}/>
            {/* InitScene starts up the scene displayed */}
            <InitScene/> 
            <mesh position={[0, 1, -1]}>
            <Root backgroundColor="red" sizeX={3.2} sizeY={2} flexDirection="row">
              <Container flexGrow={1} margin={16} hover={{backgroundColor : "skyblue"}} backgroundColor="green" />
              <Container 
              flexGrow={1} 
              margin={16} 
              onClick={() => press(!pressed)} 
              backgroundColor={pressed? "pink" : "blue"}
              backgroundOpacity={0.5}
              hover={{backgroundOpacity: 1}}
              >
                
            </Container>
            <mesh position={[0.8, 0, 0 + 0.01]}>
            <Text fontSize={0.2} color={"black"}>
              Source Code
            </Text>
            </mesh>
            
            </Root>
            </mesh>
          </XR>
        </Canvas>
      </div>
    </>
  )
}

export default App
