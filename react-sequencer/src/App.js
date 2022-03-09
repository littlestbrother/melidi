import React from "react";
import PlaybackControls from "./components/PlaybackControls";
import "../src/styles.css";
import disableScroll from 'disable-scroll';
disableScroll.on(); // prevent scrolling

export default function App() {
  return (
    <div className="app">
      <PlaybackControls></PlaybackControls>
    </div>
  );
}