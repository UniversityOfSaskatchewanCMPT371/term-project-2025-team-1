import { button, useControls } from 'leva';
import mainController from '../../controller/MainController';
import { ButtonInput } from 'leva/dist/declarations/src/types';
import React, { useState } from 'react';

// Displays the main user interface when the webpage is opened
export function BrowserUI(){
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const urlInputRef = React.useRef<HTMLInputElement>(null);

    //Using dynamic key change for unmounted component
    const [ controlKey, setControlKey] = useState(0);
    
    // Button component: opens file explorer and loads a local file
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

              // Read the selected file and load its data
              await mainController.getCSVController().getModel().readLocalFile(file);
              setControlKey(controlKey + 1);
            }
            else{
              // Log an error if no file is selected
              console.log("Invalid File")
            }
          }}>
        </input>
      </>
      )
    }
  
    // Loads a CSV file from a URL
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
        setControlKey(controlKey + 1);
      })}></input>
    </>
    )
  }
  
  // Displays the loaded csv files on the browser UI
  function UnmountedComponents(){
    const names:[string, boolean][] = mainController.getCSVController().getModel().loadedCsvBrowser();

    // Sets the objects to be displayed
    const controlsObject: Record<string, boolean | ButtonInput> = names.reduce((acc, [name, value]) => {
      acc[name] = value;

      console.log("Unmount ", controlKey)
      return acc;
    }, {} as Record<string, boolean | ButtonInput>
  );
  // 'Delete' button to delete files
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
