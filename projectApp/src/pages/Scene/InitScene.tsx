import { OrbitControls } from '@react-three/drei';
import MainScene from './MainScene';
import TestScene from './TestScene';

/* Starting scene
* Not really needed anymore since we are using modules that deals with initialization
* However, could be useful for future testing when working with different scenes
*/
export default function InitScene(): React.JSX.Element{
    
    return (
        <>
            <OrbitControls/>
            {/* Over here we could specify the scene */}
            <TestScene></TestScene>
            <MainScene/>
        </>
    )
    
};
