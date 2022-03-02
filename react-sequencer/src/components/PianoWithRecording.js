import React from "react";
import { Piano } from "react-piano";
import Grid from "./Grid";

const grid = { cells: 19, rows: 1 };

class PianoWithRecording extends React.Component {
  // 👇👇👇👇👇👇👇 FIGURE THIS OUT

  recordNotes = (midiNumbers, duration) => {
    if (this.props.recording.mode !== "RECORDING") {
      return;
    }
    const newEvents = midiNumbers.map((midiNumber) => {
      return {
        midiNumber,
        time: this.props.recording.currentTime,
        duration: duration,
      };
    });
    this.props.setRecording({
      events: this.props.recording.events.concat(newEvents),
      currentTime: this.props.recording.currentTime + duration,
    });
  };

  render() {
    const { playNote, stopNote, recording, setRecording, ...pianoProps } =
      this.props;

    const { mode, currentEvents } = this.props.recording;
    const activeNotes =
      mode === "PLAYING"
        ? currentEvents.map((event) => event.midiNumber)
        : null;
    return (
      <div>
        {/* sequencer UI */}
        <div className="keys">
          <Grid keyName={"row F#5"} grid={grid} />
          <Grid keyName={"row F5"} grid={grid} />
          <Grid keyName={"row E5"} grid={grid} />
          <Grid keyName={"row D#5"} grid={grid} />
          <Grid keyName={"row D5"} grid={grid} />
          <Grid keyName={"row C#5"} grid={grid} />
          <Grid keyName={"row C5"} grid={grid} />
          <Grid keyName={"row B4"} grid={grid} />
          <Grid keyName={"row A#4"} grid={grid} />
          <Grid keyName={"row A4"} grid={grid} />
          <Grid keyName={"row G#4"} grid={grid} />
          <Grid keyName={"row G4"} grid={grid} />
          <Grid keyName={"row F#4"} grid={grid} />
          <Grid keyName={"row F4"} grid={grid} />
          <Grid keyName={"row E4"} grid={grid} />
          <Grid keyName={"row D#4"} grid={grid} />
          <Grid keyName={"row D4"} grid={grid} />
          <Grid keyName={"row C#4"} grid={grid} />
          <Grid keyName={"row C4"} grid={grid} />
        </div>

        <div className="hide-me">
          <Piano
            playNote={this.props.playNote}
            stopNote={this.props.stopNote}
            activeNotes={activeNotes}
            {...pianoProps}
          />
        </div>
      </div>
    );
  }
}

export default PianoWithRecording;
