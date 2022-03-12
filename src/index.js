import React from "react";
import ReactDOM from "react-dom";
import PlaybackControls from "../src/components/PlaybackControls";
import "../src/styles.css";
import disableScroll from 'disable-scroll';
disableScroll.on(); // prevent scrolling

ReactDOM.render(
    <div className="app">
        <PlaybackControls></PlaybackControls>
    </div>, document.getElementById("root"));
