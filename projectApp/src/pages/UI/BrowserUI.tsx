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
    function LoadComponent(): React.JSX.Element{
      useControls({
        'Load Local CSV' : button(() => {
          const loadFile = () => {
        fileInputRef.current?.click()
          };
          loadFile();
          //i guess erroring is unecessary given there is no try/catch here originally
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
              try{
                await mainController.getCSVController().loadLocalFile(file);
                alert(`Successfully Loaded: ${file.name}`);
                sendLog("info",`LoadComponent read: ${file.name.toString()}`);
              }
              catch(error: unknown){
                alert(`${error} Failed Loading: ${file.name}`);
                sendError(new Error("Invalid File"),"LoadComponent Return Error");
              }
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
  function URLComponent(): React.JSX.Element{
    const { csv } = useControls(
      {csv: { label: "CSV by URL", value: "Enter URL"},
    "Enter URL": button(() => {
      const urlFile = () => {
      urlInputRef.current?.click();
      };
      urlFile();
      //no more longging here
    })}, {oneLineLabels: true});

    return (
    <>
    <input 
      type='button'
      ref={urlInputRef}
      style={{display: 'none'}}
      onClick={( async (): Promise<void> => {
        try{
          await mainController.getCSVController().loadURLFile(csv);
          alert(`Successfully Loaded: ${csv}`);
          sendLog("info",`URLComponent read: ${csv}`);
        }
        catch(error: unknown){
          alert(`${error} Failed Loading: ${csv}`);
          sendLog("info",`URLComponent read: ${csv}`);
        }
        setControlKey(controlKey + 1);
        // no error catching, no sendError
      })}></input>
    </>
    )
  }
  
  //Component that displays the loaded csv files on the browser UI
  function UnmountedComponents(): null{
    const names:[string, boolean][] = mainController.getCSVController().browserCSVFiles();
    
    //setControlKey(controlKey + 1)
    //Setting the objects to be displayed
    const controlsObject: Record<string, boolean | ButtonInput> = names.reduce((acc, [name, value]) => {
      acc[name] = value;

      sendLog("info",`UnmountedComponents unmount: ${String(controlKey)}`);
      return acc;
      // eslint HATES {} as ~ for Array.reduce 
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

    return (
      <>
        <URLComponent/>
        <LoadComponent/>
        <UnmountedComponents/>
      </>
    )
  }