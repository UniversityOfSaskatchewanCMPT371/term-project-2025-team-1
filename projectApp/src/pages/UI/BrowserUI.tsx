import { button, useControls } from 'leva';
import mainController from '../../controller/MainController';
import { ButtonInput } from 'leva/dist/declarations/src/types';
import React, { useState } from 'react';

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
        fileInputRef.current?.click()
      })})
      
      return( 
      <>
        <input 
          type='file' 
          ref={fileInputRef} 
          style={{display:'none'}} 
          onChange={async (e) => {
            const files = e.target.files;
            if(files && files.length > 0){
              const file = files[0];
              //console.log(file.name.toString());

              //If the file is valid, read the csv file
              await mainController.getCSVController().readLocalFile(file);
              setControlKey(controlKey + 1);
              //Same test as csvModeTest
              // let headers = test.getCSVFiles()[0].data[0];
              // console.log(headers);
            }
            else{
              //Logger or alert instead
              console.log("Invalid File")
            }
          }}>
        </input>
      </>
      )
    }
  
    //This one is for loading the csvfile through a url link
  function URLComponent(){
    let { csv } = useControls(
      {csv: { label: "CSV by URL", value: "Enter URL"},
    "Enter URL": button(() => {
      urlInputRef.current?.click();
    })}, {oneLineLabels: true});

    return (
    <>
    <input 
      type='button'
      ref={urlInputRef}
      style={{display: 'none'}}
      onClick={(async () => {
        alert(csv)
        await mainController.getCSVController().readURLFile(csv);
        setControlKey(controlKey + 1);
      })}></input>
    </>
    )
  }
  
  //Component that displays the loaded csv files on the browser UI
  function UnmountedComponents(){
    let names:[string, boolean][] = mainController.getCSVController().getModel().loadedCsvBrowser();
    
    //Setting the objects to be displayed
    const controlsObject: Record<string, boolean | ButtonInput> = names.reduce((acc, [name, value]) => {
      acc[name] = value;

      console.log("Unmount ", controlKey)
      return acc;
    }, {} as Record<string, boolean | ButtonInput>
  );
  //Button associated with the deleting files
    controlsObject['delete'] = button(() => alert("delete"));

    useControls(
      `Loaded Graphs ${controlKey}`, controlsObject, {collapsed: true}
    );
    return null;
  }

    return <>
              <URLComponent/>
              <LoadComponent/>
              <UnmountedComponents/>
            </>
  }