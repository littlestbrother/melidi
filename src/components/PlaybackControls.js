import React from "react";
import _ from "lodash";

import SoundfontProvider from "./SoundfontProvider";
import PianoWithRecording from "./PianoWithRecording";
import { MidiNumbers } from "react-piano";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c4"),
  last: MidiNumbers.fromNote("c6"),
};

const disableGrid = () => {
  document.getElementById("grid-keys").classList.add("disabled");
}

const enableGrid = () => {
  document.getElementById("grid-keys").classList.remove("disabled");
}

class PlaybackControls extends React.Component {
  state = {
    recording: {
      mode: "RECORDING",
      events: [],
      currentTime: 0,
      currentEvents: [],
    },
  };

  constructor(props) {
    super(props);

    this.scheduledEvents = [];
  }

  getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.recording.events.map((event) => event.time + event.duration)
    );
  };

  setRecording = (value) => {
    this.setState({
      recording: Object.assign({}, this.state.recording, value),
    });
  };

  onClickPlay = () => {

    disableGrid();

    this.setRecording({
      mode: "PLAYING",
    });
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, (event) => [
        event.time,
        event.time + event.duration,
      ])
    );
    startAndEndTimes.forEach((time) => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events.filter((event) => {
            return event.time <= time && event.time + event.duration > time;
          });
          this.setRecording({
            currentEvents,
          });
        }, time * 1000)
      );
    });

    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    enableGrid();
    this.scheduledEvents.forEach((scheduledEvent) => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: "RECORDING",
      currentEvents: [],
    });
  };

  onClickClear = () => {

    enableGrid()

    this.clearUi = () => {

      this.keys = document.getElementsByClassName('pressed');

      for (let key of this.keys) {
        key.classList.remove("pressed");
        key.classList.remove("long");
      }

      if (document.getElementsByClassName('pressed').length > 0) {
        this.clearUi();
      }
    }

    this.clearUi();

    this.onClickStop();

    this.setRecording({
      events: [],
      mode: "RECORDING",
      currentEvents: [],
      currentTime: 0,
    });
  };

  render() {
    return (
      <div>
        <SoundfontProvider
          instrumentName="pad_4_choir"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({ playNote, stopNote }) => (
            <PianoWithRecording
              recording={this.state.recording}
              setRecording={this.setRecording}
              noteRange={noteRange}
              playNote={playNote}
              stopNote={stopNote}
            />
          )}
        />
        <div className="playback-controls">
        <button className="play-button" onClick={this.onClickPlay}>&#9658;</button>
        <button className="stop-button" onClick={this.onClickStop}>&#9632;</button>
        <button className="clear-button" onClick={this.onClickClear}>&#9672;</button>
        {/* <div className="sharp-named-note">{JSON.stringify(this.state.recording.events)}</div> */}
        </div>
      </div>
    );
  }
}

export default PlaybackControls;