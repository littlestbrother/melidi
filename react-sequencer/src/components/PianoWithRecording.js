import React from "react";
import { Piano } from "react-piano";
import Grid from "./Grid";

// const DURATION_UNIT = 0.2;

class PianoWithRecording extends React.Component {
  // static defaultProps = {
  //   notesRecorded: false,
  // };

  // state = {
  //   keysDown: {},
  //   noteDuration: DURATION_UNIT,
  // };

  // onPlayNoteInput = (midiNumber) => {
  //   this.setState({
  //     notesRecorded: false,
  //   });
  // };

  // onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
  //   if (this.state.notesRecorded === false) {
  //     this.recordNotes(prevActiveNotes, this.state.noteDuration);
  //     this.setState({
  //       notesRecorded: true,
  //       noteDuration: DURATION_UNIT,
  //     });
  //   }
  // };

  // 👇👇👇👇👇👇👇 FIGURE THIS OUT

  // recordNotes = (midiNumbers, duration) => {
  //   if (this.props.recording.mode !== "RECORDING") {
  //     return;
  //   }
  //   const newEvents = midiNumbers.map((midiNumber) => {
  //     return {
  //       midiNumber,
  //       time: this.props.recording.currentTime,
  //       duration: duration,
  //     };
  //   });
  //   this.props.setRecording({
  //     events: this.props.recording.events.concat(newEvents),
  //     currentTime: this.props.recording.currentTime + duration,
  //   });
  // };

  static grid = { cells: 19, rows: 1 };


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
        <Piano
          playNote={this.props.playNote}
          stopNote={this.props.stopNote}
          // onPlayNoteInput={this.onPlayNoteInput}
          // onStopNoteInput={this.onStopNoteInput}
          activeNotes={activeNotes}
          {...pianoProps}
        />

        {/* sequencer UI */}
        <div className="keys">
          <Grid keyName={"row F#5"} grid={this.grid} />
          <Grid keyName={"row F5"} grid={this.grid} />
          <Grid keyName={"row E5"} grid={this.grid} />
          <Grid keyName={"row D#5"} grid={this.grid} />
          <Grid keyName={"row D5"} grid={this.grid} />
          <Grid keyName={"row C#5"} grid={this.grid} />
          <Grid keyName={"row C5"} grid={this.grid} />
          <Grid keyName={"row B4"} grid={this.grid} />
          <Grid keyName={"row A#4"} grid={this.grid} />
          <Grid keyName={"row A4"} grid={this.grid} />
          <Grid keyName={"row G#4"} grid={this.grid} />
          <Grid keyName={"row G4"} grid={this.grid} />
          <Grid keyName={"row F#4"} grid={this.grid} />
          <Grid keyName={"row F4"} grid={this.grid} />
          <Grid keyName={"row E4"} grid={this.grid} />
          <Grid keyName={"row D#4"} grid={this.grid} />
          <Grid keyName={"row D4"} grid={this.grid} />
          <Grid keyName={"row C#4"} grid={this.grid} />
          <Grid keyName={"row C4"} grid={this.grid} />
        </div>
      </div>
    );
  }
}

export default PianoWithRecording;
