import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from '@react-three/fiber';
import InitScene from './Scene/InitScene';

function App() {

  return (
    <>
    <Canvas style = {{backgroundColor: '#20232a'}}>
      <InitScene>

      </InitScene>
      </Canvas>
    </>
  )
}

export default App
