import React from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gjspresetwebpage from "grapesjs-preset-webpage";
import IPFS from "ipfs-mini";
import "./Edit.css";
import gateways from "public-gateway-checker/gateways.json";

const Editor = ({ }) => {

    const ipfsEndpoint = "https://ipfs.web3.party:5001/api/v0";
    const ipfs = new IPFS({ host: 'ipfs.web3.party', port: 5001, protocol: 'https' });
    const ipfsGatewayEndpoint = "https://ipfs.web3.party/ipfs";

    // upload asset to IPFS and add URL to asset manager
    const uploadAsset = (response, editor) => {
        const d = {
            src: `${ipfsGatewayEndpoint}/${response.Hash}`,
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
                    // make links relative
                    const body = editor.getHtml().replace(`${ipfsGatewayEndpoint}/`,"");
                    const output = `<html><head><style>${editor.getCss()}</style></head><body>${body}</body></html>`;

                    const ipfslinks = [
                        ipfsGatewayEndpoint,
                        ...gateways
                    ];

                    // save HTML to IPFS
                    ipfs.add(output).then((result) => {

                        const links = ipfslinks.map((item) => {
                            const gateway = item.replace(":hash","");
                            return(`<li><a class="ipfslink" target="_new" href="${gateway}${result}">${gateway}${result}</a></li>`);
                        }).join();
                        
                        editor.Modal.setContent(`<div>Your site is live at<br/><ul>${links}</ul></div>`);
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
