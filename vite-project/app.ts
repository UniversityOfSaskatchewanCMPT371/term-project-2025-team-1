import { startScene } from "./Scene/startScene.js";

console.log("connected");

async function app() {
    try{
        startScene();
    }
    catch(error){
        console.error("Error", error);
    }
}


app();