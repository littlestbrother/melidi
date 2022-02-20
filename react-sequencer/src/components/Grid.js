import React from "react";

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
            {cells.map((cell, index) => (
              <li key={index} className="key sharp" onClick={handleClick} />
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
