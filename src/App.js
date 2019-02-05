import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Edit from "./pages/Edit.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Edit />
      </div>
    );
  }
}

export default App;
