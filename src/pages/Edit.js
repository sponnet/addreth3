import React, { Component } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gjspresetwebpage from "grapesjs-preset-webpage";



const Editor = ({ }) => {

    const onResponse = (response, editor) => {
        debugger;
        const d = {
            src: `https://ipfs.web3.party:5001/api/v0/cat/${response.Hash}`,
            type: 'image',
            height: 100,
            width: 200,
        };
        // const t = editor;

        // const ed = this.getEditor();
        editor.AssetManager.add(d);
    };


    React.useEffect(() => {


        const editor = grapesjs.init({
            // Indicate where to init the editor. You can also pass an HTMLElement
            plugins: [gjspresetwebpage],
            container: "#gjs",
            fromElement: true,

            height: "800px",
            width: "auto",

            assetManager: {
                upload: "https://ipfs.web3.party:5001/api/v0/add?stream-channels=true",
                multiUpload: false,
            },
            panels: { defaults: [] }
        });

        editor.on("asset:upload:response", (response) => { onResponse(response, editor); });


    }, []);

    return (
        <div>
            <div id="gjs">
            </div>
        </div>
    );

}

export default Editor;
