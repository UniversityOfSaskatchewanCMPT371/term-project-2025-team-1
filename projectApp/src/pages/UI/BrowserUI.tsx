import { button, useControls } from 'leva';
import mainController from '../../controller/MainController';
import { ButtonInput } from 'leva/dist/declarations/src/types';
import React, { useState } from 'react';

import { sendLog, sendError } from '../../logger-frontend.ts'

//The UI that appears when the webpage is opened
export function BrowserUI(): React.JSX.Element {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const urlInputRef = React.useRef<HTMLInputElement>(null);

    //Using dynamic key change for unmounted component
    const [ controlKey, setControlKey ] = useState(0);
    
    //The botton component that opens file explorer and loads a local file
    function LoadComponent(): React.JSX.Element {
		useControls({
			'Load Local CSV' : button(() => {
				try{
					const loadFile: () => void = () => {
						fileInputRef.current?.click();
					};
					loadFile();
				} catch(error: unknown){
					sendError(error, "BrowserUI LoadComponent Button Error");
				}
			})
		});
		
		return(<input 
			type='file' 
			ref={fileInputRef} 
			style={{display:'none'}} 
			onChange={(reactEvent: React.ChangeEvent<HTMLInputElement>) => {
				const asyncLocalFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
					const files = event.target.files;
					if(!files){
						throw new TypeError("files list is null");
					}
					else if(files.length === 0){
						throw new RangeError("files list is empty");
					}
					else{
						const file = files[0];
						//console.log(file.name.toString());

						//If the file is valid, read the csv file
						await mainController.getCSVController().getModel().readLocalFile(file);
						sendLog("info",`BrowserUI LoadComponent read: ${file.name.toString()}`);
						setControlKey(controlKey + 1);
						//Same test as csvModeTest
						// let headers = test.getCSVFiles()[0].data[0];
						// console.log(headers);
					}
				}
				asyncLocalFile(reactEvent).catch((error: unknown) => {
					sendError(error,"BrowserUI LoadComponent Return Error");
				});
			}
		}/>);
	}
  
	//This one is for loading the csvfile through a url link
	function URLComponent(): React.JSX.Element {
		const { csv } = useControls({
			csv: {
				label: "CSV by URL", value: "Enter URL"},
				"Enter URL": button(() => {
					try{
						const urlFile: () => void = () => {
							urlInputRef.current?.click();
						};
						urlFile();
					} catch(error: unknown){
						sendError(error, "BrowserUI URLComponent Button Error");
					}
				})
			},
			{oneLineLabels: true}
		);

		return (<input 
			type='button'
			ref={urlInputRef}
			style={{display: 'none'}}
			onClick={() => {
				const asyncUrlFile = (async () => {
					alert(csv);
					await mainController.getCSVController().getModel().readURLFile(csv);
					sendLog("info",`BrowserUI URLComponent read: ${csv}`);
					setControlKey(controlKey + 1);
				});
				asyncUrlFile().catch((error: unknown) => {
					sendError(error,"BrowserUI URLComponent Return Error");
				});
			}
		}/>);
	}
  
	//Component that displays the loaded csv files on the browser UI
	function UnmountedComponents(): null{
		const names:[string, boolean][] = mainController.getCSVController().getModel().loadedCsvBrowser();

		//setControlKey(controlKey + 1)
		//Setting the objects to be displayed
		const controlsObject: Record<string, boolean | ButtonInput> = names.reduce(
			(acc: Record<string, boolean | ButtonInput>, [name, value]) => {
				acc[name] = value;

				console.log("Unmount ", controlKey)
				sendLog("info",`BrowserUI UnmountedComponents unmount: ${String(controlKey)}`);
				return acc;
			},
			{}
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