import { button, useControls } from 'leva';
import mainController from '../../controller/MainController';
import { ButtonInput } from 'leva/dist/declarations/src/types';
import React, { useState } from 'react';

//The UI that appears when the webpage is opened
export function BrowserUI(){
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    
    function LoadComponent(){
      useControls({
        'Load Local CSV' : button(() => {
        fileInputRef.current?.click()
      })})
      
      return <>
      <input 
        type='file' 
        ref={fileInputRef} 
        style={{display:'none'}} 
        onChange={async (e) => {
            const files = e.target.files;
            if(files && files.length > 0){
                const file = files[0];
                console.log(file.name.toString());
                
                let test = mainController.getGraphController().getReaderModel();
                await mainController.getGraphController().readLocalFile(file);
                //undefined
                // console.log("File:", test.getCSVFiles()[0].getDataByTime("2025-01-19")?.toString());
            }
            else{
              console.log("No files selected")
            }
        }}>
      </input></>
    }
  
  function URLComponent(){
    let { csv } = useControls(
      {csv: { label: 'CSV by URL', value: "Enter URL"}} 
    )
    useControls({
      'Enter URL': button(() => {alert("To")})})
    return null;
  }

  function UnmountedComponents(){
    const names:[string, boolean][] = [['barvalue', false], ['second',false]];
    
    const controlsObject: Record<string, boolean | ButtonInput> = names.reduce((acc, [name, value]) => {
      acc[name] = value;
      return acc;
    }, {} as Record<string, boolean | ButtonInput>
  );
    controlsObject['delete'] = button(() => alert("delete"));
    useControls(
      'Loaded Graphs', controlsObject, {collapsed: true}
    );
    return null;
  }

    return <>
              <URLComponent/>
              <LoadComponent/>
              <UnmountedComponents/>
            </>
  }