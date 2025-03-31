import { button, useControls } from "leva";
import mainController from "../../controller/MainController";
import { ButtonInput } from "leva/dist/declarations/src/types";
import React, { useState } from "react";

import { sendLog, sendError } from "../../logger-frontend.ts";
import { addTestSceneInfo } from "../Scene/TestScene.tsx";

/**
 * The UI that appears when the webpage is opened, created using module leva.
 * Allows the loading of csv files on start up and displays loaded csv files in the program
 * @preconditions None
 * @postconditions A browser UI that can is used on Start up or outside of VR environment
 */
export default function BrowserUI() {
  // These are used for linking leva components
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const urlInputRef = React.useRef<HTMLInputElement>(null);

  // Using dynamic key change for unmounted component
  const [controlKey, setControlKey] = useState(0);

  /**
   * Create a leva component that loads a csv file using a url.
   * @preconditions None
   * @postconditions a leva textfield component and its linked button
   */
  function URLComponent(): React.JSX.Element {
    const { csv } = useControls(
      {
        csv: { label: "CSV by URL", value: "", placeholder: "Enter URL" },
        "Enter URL": button(() => {
          const urlFile = () => {
            urlInputRef.current?.click();
          };
          urlFile();
        }),
      },
      { oneLineLabels: true },
    );

    return (
      <>
        <input
          type="button"
          ref={urlInputRef}
          style={{ display: "none" }}
          onClick={async (): Promise<void> => {
            // Try using the string value to load csv file
            try {
              addTestSceneInfo("Starting url csv loading");
              await mainController.getCSVController().loadURLFile(csv);
              addTestSceneInfo("url csv file upload succeded");
              alert(`Successfully Loaded: ${csv}`);
              sendLog("info", `URLComponent read: ${csv}`);
            } catch (error: unknown) {
              addTestSceneInfo("url csv loading failed");
              alert(`${error} Failed Loading: ${csv}`);
              sendLog("info", `URLComponent read: ${csv}`);
            }
            // key for Re-rendering leva component
            setControlKey(controlKey + 1);
          }}
        />
      </>
    );
  }

  /**
   * Create a leva button component that allows the reading of a local file
   * @preconditions None
   * @postconditions leva button component that reads a local file
   */
  function LoadComponent(): React.JSX.Element {
    useControls({
      "Load Local CSV": button(() => {
        const loadFile = () => {
          fileInputRef.current?.click();
        };
        loadFile();
      }),
    });

    return (
      <>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={async (e): Promise<void> => {
            const files = e.target.files;
            if (files && files.length > 0) {
              const file = files[0];

              // If the file is valid, try to read the local csv file
              try {
                addTestSceneInfo("Starting local csv file reading");
                await mainController.getCSVController().loadLocalFile(file);
                addTestSceneInfo("local csv file loading succeeded");
                alert(`Successfully Loaded: ${file.name}`);
                sendLog("info", `LoadComponent read: ${file.name.toString()}`);
              } catch (error: unknown) {
                addTestSceneInfo("local csv file loading failed");
                alert(`${error} Failed Loading: ${file.name}`);
                sendError(
                  new Error("Invalid File"),
                  "LoadComponent Return Error",
                );
              }
              setControlKey(controlKey + 1);
            } else {
              sendError(
                new Error("Invalid File"),
                "LoadComponent Return Error",
              );
            }
          }}
        />
      </>
    );
  }

  /**
   * Create a component that displays the loaded csv files on the browser UI
   * @preconditions None
   * @postconditions Unmounted component that displays loaded csv files when opened
   */
  function UnmountedComponents(): null {
    const names: [string, boolean][] = mainController
      .getCSVController()
      .browserCSVFiles();

    // Setting the objects to be displayed
    const controlsObject: Record<string, boolean | ButtonInput> = names.reduce(
      (acc, [name, value]) => {
        acc[name] = value;

        sendLog("info", `UnmountedComponents unmount: ${String(controlKey)}`);
        return acc;
      },
      {} as Record<string, boolean | ButtonInput>,
    );

    useControls(`Loaded Graphs`, controlsObject, { collapsed: true });

    return null;
  }

  return (
    <>
      <URLComponent />
      <LoadComponent />
      <UnmountedComponents />
    </>
  );
}
