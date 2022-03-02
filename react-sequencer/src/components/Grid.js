import React from "react";
// import { render } from "react-dom";

class Grid extends React.Component {
  cells = new Array(this.props.grid.cells).fill(0);
  rows = new Array(this.props.grid.rows).fill(0);

  handleClick = (e) => {
    this.key = e.target;
    if (this.key.classList.contains("pressed")) {
      this.key.classList.remove("pressed");
    } else {
      this.key.classList.add("pressed");
    }
  };

  render() {
    if (this.props.keyName.includes("#")) {
      return (
        <main>
          {this.rows.map((row, index) => (
            <ul className={this.keyName} key={"index"}>
              <p className="name origin">
                {this.props.keyName
                  .replace(new RegExp("[0-9]", "g"), "")
                  .replace("row", "")}
              </p>
              {this.cells.map((cell, index) => (
                <li
                  key={index}
                  className="key sharp"
                  id={index + 1}
                  onClick={this.handleClick}
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
            <ul className={this.keyName} key={index}>
              <p className="name">
                {this.props.keyName
                  .replace(new RegExp("[0-9]", "g"), "")
                  .replace("row", "")}
              </p>
              {this.cells.map((cell, index) => (
                <li
                  key={index}
                  className="key"
                  id={index + 1}
                  onClick={this.handleClick}
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
