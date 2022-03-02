import React from "react";
import _ from "lodash";

import SoundfontProvider from "./SoundfontProvider";
import PianoWithRecording from "./PianoWithRecording";
import { MidiNumbers } from "react-piano";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("d3"),
};

class PlaybackControls extends React.Component {
  state = {
    recording: {
      mode: "RECORDING",
      events: [
        { midiNumber: 48, time: 0, duration: 0.2 },
        { midiNumber: 50, time: 0.2, duration: 0.2 },
        { midiNumber: 52, time: 0.4, duration: 0.2 },
        { midiNumber: 53, time: 0.61, duration: 0.2 },
        { midiNumber: 55, time: 0.8, duration: 0.2 },
        { midiNumber: 57, time: 1, duration: 0.2 },
        { midiNumber: 59, time: 1.2, duration: 0.2 },
        { midiNumber: 60, time: 1.4, duration: 0.2 },
        { midiNumber: 62, time: 1.5999999999999999, duration: 0.2 },
        { midiNumber: 64, time: 1.7999999999999998, duration: 0.2 },
        { midiNumber: 65, time: 1.9999999999999998, duration: 0.2 },
      ],
      // events: [],
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
    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    this.scheduledEvents.forEach((scheduledEvent) => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: "RECORDING",
      currentEvents: [],
    });
  };

  onClickClear = () => {
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
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({ isLoading, playNote, stopNote }) => (
            <PianoWithRecording
              recording={this.state.recording}
              setRecording={this.setRecording}
              noteRange={noteRange}
              playNote={playNote}
              stopNote={stopNote}
              disabled={isLoading}
            />
          )}
        />
        <button onClick={this.onClickPlay}>Play</button>
        <button onClick={this.onClickStop}>Stop</button>
        <button onClick={this.onClickClear}>Clear</button>
        <div>{JSON.stringify(this.state.recording.events)}</div>
      </div>
    );
  }
}

export default PlaybackControls;