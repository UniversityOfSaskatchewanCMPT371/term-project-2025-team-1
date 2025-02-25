import { button, useControls } from 'leva';
import mainController from '../../controller/MainController';
import { ButtonInput } from 'leva/dist/declarations/src/types';
import React, { useState } from 'react';

import { sendLog, sendError } from '../../logger-frontend.ts'

//The UI that appears when the webpage is opened
export function BrowserUI(){
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const urlInputRef = React.useRef<HTMLInputElement>(null);

    //Using dynamic key change for unmounted component
    const [ controlKey, setControlKey] = useState(0);
    
    //The botton component that opens file explorer and loads a local file
    function LoadComponent(){
      useControls({
        'Load Local CSV' : button(() => {
          const loadFile = () => {
        fileInputRef.current?.click()
          };
          loadFile();
      })})
      
      return( 
      <>
        <input 
          type='file' 
          ref={fileInputRef} 
          style={{display:'none'}} 
          onChange={async (e):Promise<void> => {
            const files = e.target.files;
            if(files && files.length > 0){
              const file = files[0];

              //If the file is valid, read the csv file
              await mainController.getCSVController().getModel().readLocalFile(file);
              sendLog("info",`LoadComponent read: ${file.name.toString()}`);
              setControlKey(controlKey + 1);
              //Same test as csvModeTest
              // let headers = test.getCSVFiles()[0].data[0];
            }
            else{
              //Logger or alert instead
              sendError(new Error("Invalid File"),"LoadComponent Return Error");

            }
          }}>
        </input>
      </>
      )
    }
  
    //This one is for loading the csvfile through a url link
  function URLComponent(){
    const { csv } = useControls(
      {csv: { label: "CSV by URL", value: "Enter URL"},
    "Enter URL": button(() => {
      const urlFile = () => {
      urlInputRef.current?.click();
      };
      urlFile();
    })}, {oneLineLabels: true});

    return (
    <>
    <input 
      type='button'
      ref={urlInputRef}
      style={{display: 'none'}}
      onClick={( async (): Promise<void> => {
        alert(csv)
        await mainController.getCSVController().getModel().readURLFile(csv);
        sendLog("info",`URLComponent read: ${csv}`);
        setControlKey(controlKey + 1);
      })}></input>
    </>
    )
  }
  
  //Component that displays the loaded csv files on the browser UI
  function UnmountedComponents(){
    const names:[string, boolean][] = mainController.getCSVController().getModel().loadedCsvBrowser();
    
    //setControlKey(controlKey + 1)
    //Setting the objects to be displayed
    const controlsObject: Record<string, boolean | ButtonInput> = names.reduce((acc, [name, value]) => {
      acc[name] = value;

      sendLog("info",`UnmountedComponents unmount: ${String(controlKey)}`);
      return acc;
    }, {} as Record<string, boolean | ButtonInput>
  );
  //Button associated with the deleting files
    controlsObject.delete = button(() => {alert("delete")});

    useControls(
      `Loaded Graphs`, controlsObject, {collapsed: true}
    );

    //Add the delete button useRef
    return null;
  }

    return <>
              <URLComponent/>
              <LoadComponent/>
              <UnmountedComponents/>
            </>
  }