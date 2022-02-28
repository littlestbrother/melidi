import React from "react";
import Keys from "./components/Keys";
import PianoControls from "./components/PianoControls";

export default function App() {
  return (
    <div className="app">
      <Keys></Keys>
      <PianoControls></PianoControls>
    </div>
  );
}
