import React from "react";
import PianoControls from "./PianoControls";

const Grid = ({
  grid,
  keyName,
  handleGridSize,
  inputCells,
  setCells,
  inputRows,
  setRows,
}) => {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  const handleClick = (e) => {
    // PianoControls.state.recording.events = [{"midiNumber":48,"time":0,"duration":0.2},{"midiNumber":50,"time":0.2,"duration":0.2},{"midiNumber":52,"time":0.4,"duration":0.2},{"midiNumber":53,"time":0.6000000000000001,"duration":0.2},{"midiNumber":55,"time":0.8,"duration":0.2},{"midiNumber":57,"time":1,"duration":0.2},{"midiNumber":59,"time":1.2,"duration":0.2},{"midiNumber":60,"time":1.4,"duration":0.2},{"midiNumber":62,"time":1.5999999999999999,"duration":0.2},{"midiNumber":64,"time":1.7999999999999998,"duration":0.2},{"midiNumber":65,"time":1.9999999999999998,"duration":0.2}];
    const key = e.target;
    if (key.classList.contains("pressed")) {
      key.classList.remove("pressed");
    } else {
      key.classList.add("pressed");
    }
  };

  if (keyName.includes("#")) {
    return (
      <main>
        {rows.map((row, index) => (
          <ul className={keyName} key={"index"}>
            <p className="name origin">{keyName.replace(new RegExp("[0-9]","g"), "").replace("row", "")}</p>
            {cells.map((cell, index) => (
              <li key={index} className="key sharp" id={index} onClick={handleClick} />
            ))}
          </ul>
        ))}
      </main>
    );
  } else {
    return (
      <main>
        {rows.map((row, index) => (
          <ul className={keyName} key={index}>
            <p className="name">{keyName.replace(new RegExp("[0-9]","g"), "").replace("row", "")}</p>
            {cells.map((cell, index) => (
              <li key={index} className="key" onClick={handleClick} />
            ))}
          </ul>
        ))}
      </main>
    );
  }
};

export default Grid;
