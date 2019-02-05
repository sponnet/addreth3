import React, { Component } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gjspresetwebpage from "grapesjs-preset-webpage";


class N extends Component {
  componentDidMount() {
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      plugins: [gjspresetwebpage],
      container: "#gjs",
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: "800px",
      width: "auto",
      // Disable the storage manager for the moment

      assetManager: {
        upload: "https://ipfs.web3.party:5001/api/v0/add?stream-channels=true",
        multiUpload: false
      },

      //storageManager: { type: 'ipfs-storage' },
      // Avoid any default panel
      panels: { defaults: [] }
    });
    this.editor.on("asset:upload:response", response => {
      debugger;
    });

    // this.editor.StorageManager.add("ipfs-storage", {
    //   /**
    //    * Load the data
    //    * @param  {Array} keys Array containing values to load, eg, ['gjs-components', 'gjs-style', ...]
    //    * @param  {Function} clb Callback function to call when the load is ended
    //    * @param  {Function} clbErr Callback function to call in case of errors
    //    */
    //   load(keys, clb, clbErr) {
    //     const result = {};

    //     keys.forEach(key => {
    //       const value = SimpleStorage[key];
    //       if (value) {
    //         result[key] = value;
    //       }
    //     });

    //     // Might be called inside some async method
    //     clb(result);
    //   },

    //   /**
    //    * Store the data
    //    * @param  {Object} data Data object to store
    //    * @param  {Function} clb Callback function to call when the load is ended
    //    * @param  {Function} clbErr Callback function to call in case of errors
    //    */
    //   store(data, clb, clbErr) {
    //     for (let key in data) {
    //       SimpleStorage[key] = data[key];
    //     }
    //     // Might be called inside some async method
    //     clb();
    //   }
    // });
  }

  render() {
    return (
      <div>
        <div id="gjs">
          <h1>Hello World Component!</h1>
        </div>
      </div>
    );
  }
}

export default N;
