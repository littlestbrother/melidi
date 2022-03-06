import React from "react";
import parse from "html-react-parser";

class Grid extends React.Component {
  cells = new Array(this.props.grid.cells).fill(0);
  rows = new Array(this.props.grid.rows).fill(0);

  handleClick = (e) => {
    this.key = parse(e.outerHTML);

    if (this.key.props.className.includes("pressed")) {
      e.classList.remove("pressed");
    } else {
      e.classList.add("pressed");
    }
  };

  render() {

    //https://stackoverflow.com/a/42549927/9090521
    const pushNoteToEvent = this.props.pushNoteToEvent;
    const removeNoteFromEvent = this.props.removeNoteFromEvent;

    const handleClick = (e) => {
      this.key = parse(e.outerHTML);

      if (this.key.props.className.includes("pressed")) {
        e.classList.remove("pressed");
        removeNoteFromEvent();
      } else {
        e.classList.add("pressed");
        pushNoteToEvent(46, 0.199, this.key.props.id / 5);
      }
    }

    const shortKeyName = this.props.keyName
      .replace(new RegExp("[0-9]", "g"), "")
      .replace("row", "")

    if (this.props.keyName.includes("#")) {
      return (
        <main>
          {this.rows.map((row, index) => (
            <ul className={this.props.keyName} key={index}>
              <p className="name origin">
                {shortKeyName}
              </p>
              {this.cells.map((cell, index) => (
                <li
                  key={index}
                  className="key sharp"
                  id={index}
                  onClick={() => handleClick(document.getElementById(index))}
                  name={shortKeyName}
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
              <p className="name">
                {shortKeyName}
              </p>
              {this.cells.map((cell, index) => (
                <li
                  key={index}
                  className="key"
                  id={index}
                  // onClick={() => { pushNoteToEvent(); this.handleClick(document.getElementById(index)) }}
                  name={shortKeyName}
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
