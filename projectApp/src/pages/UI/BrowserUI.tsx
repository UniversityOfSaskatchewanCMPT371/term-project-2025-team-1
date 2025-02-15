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
              console.log(file.name.toString());
                
              //let test = mainController.getGraphController().getReaderModel();
              
              await mainController.getGraphController().readLocalFile(file);
              setControlKey(controlKey + 1);
              //Same test as csvModeTest
              // let headers = test.getCSVFiles()[0].data[0];
              // console.log(headers);
            }
            else{
              console.log("No files selected")
            }
          }}>
        </input>
      </>
      )
    }
  
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
        await mainController.getGraphController().readURLFile(csv);
        setControlKey(controlKey + 1);
      })}></input>
    </>
    )
  }
  
  function UnmountedComponents(){
    let names:[string, boolean][] = mainController.getGraphController().getReaderModel().loadedCsvBrowser();
    
    let controlsObject: Record<string, boolean | ButtonInput> = names.reduce((acc, [name, value]) => {
      acc[name] = value;

      console.log("Unmount ", acc)
      return acc;
    }, {} as Record<string, boolean | ButtonInput>
  );
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