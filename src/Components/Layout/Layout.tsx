import { useState } from "react";
import App from "../App/App";
import "./Layout.css";

function Layout(): JSX.Element {
    const [colorMode, setColorMode] = useState<boolean>(false);
    
    const color: string = colorMode === false ? "dark" : "light";
    console.log(color);
    

    return (
        <div className={`Layout ${color}-mode`}>
			<App colorMode={colorMode} setColorMode={setColorMode}></App>
        </div>
    );
}

export default Layout;
