import React from "react";
import parse from "html-react-parser";
import { MidiNumbers } from "react-piano";

class Grid extends React.Component {
  cells = new Array(this.props.grid.cells).fill(0);
  rows = new Array(this.props.grid.rows).fill(0);

  render() {

    // https://stackoverflow.com/a/42549927/9090521
    const pushNoteToEvent = this.props.pushNoteToEvent;
    const removeNoteFromEvent = this.props.removeNoteFromEvent;

    const handleClick = (e) => {
      this.key = parse(e[0].outerHTML);

      if (this.key.props.className.includes("pressed")) {
        e[0].classList.remove("pressed");
        removeNoteFromEvent(MidiNumbers.fromNote(name), 0.19, (this.key.props.id / 5));
      } else {
        e[0].classList.add("pressed");
        pushNoteToEvent(MidiNumbers.fromNote(name), 0.19, (this.key.props.id / 5));
      }
    }

    const shortKeyName = this.props.keyName
      .replace("row", "")
      .replace(" ", "")

    const omitOctaves = this.props.keyName
      .replace(new RegExp("[0-9]", "g"), "")
      .replace("row", "")
      .replace(" ", "")

    if (this.props.keyName.includes("#")) {
      return (
        <main>
          {this.rows.map((row, index) => (
            <ul className={this.props.keyName} key={index}>
              <p className="note-name sharp-named-note sticky">
                {omitOctaves}
              </p>
              {this.cells.map((cell, index) => (
                <li
                  key={index}
                  className="key sharp"
                  name={shortKeyName + '_' + index}
                  id={index}
                  onClick={() => handleClick(document.getElementsByName(shortKeyName + '_' + index))}
                />
              ))}
            </ul>
          ))}
        </main>
      );
    } else {
      return (
        <main>
          {this.rows.map((row, index) => (
            <ul className={this.props.keyName} key={index}>
              <p className="note-name sticky">
                {omitOctaves}
              </p>
              {this.cells.map((cell, index) => (
                <li
                  key={index}
                  className="key"
                  name={shortKeyName + '_' + index}
                  id={index}
                  onClick={() => handleClick(document.getElementsByName(shortKeyName + '_' + index))}
                />
              ))}
            </ul>
          ))}
        </main>
      );
    }
  }
}

export default Grid;
