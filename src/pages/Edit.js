import React from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gjspresetwebpage from "grapesjs-preset-webpage";
import IPFS from "ipfs-mini";

const Editor = ({ }) => {

    const ipfsEndpoint = "https://ipfs.web3.party:5001/api/v0";
    const ipfs = new IPFS({ host: 'ipfs.web3.party', port: 5001, protocol: 'https' });
    const ipfsGatewayEndpoint = "https://ipfs.web3.party/ipfs";

    // upload asset to IPFS and add URL to asset manager
    const uploadAsset = (response, editor) => {
        const d = {
            src: `${ipfsEndpoint}/cat/${response.Hash}`,
            type: 'image',
            height: 100,
            width: 200,
        };
        editor.AssetManager.add(d);
    };

    React.useEffect(() => {
        const editor = grapesjs.init({
            // Indicate where to init the editor. You can also pass an HTMLElement
            plugins: [gjspresetwebpage],
            container: "#gjs",
            fromElement: true,
            assetManager: {
                upload: `${ipfsEndpoint}/add?stream-channels=true`,
                multiUpload: false,
                credentials: 'omit',
            },
            panels: { defaults: [] },
        });

        // enable saving of assets (images) to IPFS 
        editor.on("asset:upload:response", (response) => { uploadAsset(response, editor); });

        // add panel with IPFS save button
        var newPanel = editor.Panels.addPanel({
            id: 'myIPFSSaver',
            visible: true,
            buttons: [{
                id: 'alert-button',
                className: 'btn-alert-button',
                label: 'Publish to IPFS',
                command(editor) {
                    // create HTML output
                    const output = `<html><head><style>${editor.getCss()}</style></head><body>${editor.getHtml()}</body></html>`;

                    // save HTML to IPFS
                    ipfs.add(output).then((result) => {
                        editor.Modal.setContent(`<div>Your site is live at<br/><h4>${ipfsGatewayEndpoint}/${result}</h4></div>`);
                        editor.Modal.open();
                    }).catch((e) => {
                        editor.Modal.setContent(`<div>Could not save your page ${e.message}</div>`);
                        editor.Modal.open();
                    });
                }
            }],
        });




    }, []);

    return (
        <div>
            <div id="gjs">
            </div>
        </div>
    );

}

export default Editor;
