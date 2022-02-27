import React, { useState } from "react";
import Grid from "../components/Grid";
import "../styles.css";

export default function Keys() {
  const [grid] = useState({ cells: 19, rows: 1 });

  return (
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
  );
}
