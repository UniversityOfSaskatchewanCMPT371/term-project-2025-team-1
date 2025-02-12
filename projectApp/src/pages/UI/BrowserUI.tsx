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
        onChange={(e) => {
            const files = e.target.files;
            if(files && files.length > 0){
                const file = files[0];
                console.log(file.name.toString());
                
                // LocalCsvReader(file).then((data) => {
                //   console.log("Parsed data", data);
                // })
                // .catch((error) => {
                //   console.error("Error", error);
                // });
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