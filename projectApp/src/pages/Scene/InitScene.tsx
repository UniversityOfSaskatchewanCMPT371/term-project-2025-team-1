import { OrbitControls } from '@react-three/drei';
import MainScene from './MainScene';

/* Starting scene
* Can only be used for future testing when working with different scenes
*/
export default function InitScene(){
    
    return (
        <>
            <OrbitControls/>
            <MainScene/>
        </>
    )
    
};
