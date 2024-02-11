//dynamically creates a table, table body in container
function createGameTable() {
  const container = document.querySelector("#game-container");
  let gameTable = document.createElement("table");
  gameTable.setAttribute("id", "game-table");
  gameTable.setAttribute("class", "table table-striped");
  let tableBody = document.createElement("tbody");
  tableBody.setAttribute("id", "table-body");
  gameTable.appendChild(tableBody);
  container.appendChild(gameTable);
}

//populates the table with 9 cells with a predefined value of -
function createTableRows() {
  let counter = 0;
  const tableBody = document.querySelector("#table-body");
  for (let i = 0; i < 3; i++) {
    const newRow = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      const newCell = document.createElement("td");
      newCell.setAttribute("data-value", `${counter++}`);
      newCell.innerText = "-";
      newRow.appendChild(newCell);
    }
    tableBody.appendChild(newRow);
  }
}
//checks columns for a match
function checkColumns() {
  const rows = document.querySelectorAll("tr");
  const table = [rows[0].children, rows[1].children, rows[2].children];

  for (let i = 0; i < 3; i++) {
    if (
      table[0][i].innerText === table[1][i].innerText &&
      table[1][i].innerText === table[2][i].innerText &&
      table[0][i].innerText !== "-"
    ) {
      return table[0][i].innerText;
    }
  }
  return false;
}
//checks rows for a match
function checkRows() {
  const rows = document.querySelectorAll("tr");
  const table = [rows[0].children, rows[1].children, rows[2].children];
  for (let i = 0; i < 3; i++) {
    if (
      table[i][0].innerText === table[i][1].innerText &&
      table[i][1].innerText === table[i][2].innerText &&
      table[i][0].innerText !== "-"
    ) {
      return table[i][0].innerText;
    }
  }
  return false;
}
//checks the two diagonals for a match
function checkDiagonals() {
  const rows = document.querySelectorAll("tr");
  const table = [rows[0].children, rows[1].children, rows[2].children];

  if (
    table[0][0].innerText === table[1][1].innerText &&
    table[1][1].innerText === table[2][2].innerText &&
    table[0][0].innerText !== "-"
  ) {
    return table[1][1].innerText;
  } else if (
    table[0][2].innerText === table[1][1].innerText &&
    table[1][1].innerText === table[2][0].innerText &&
    table[0][2].innerText !== "-"
  ) {
    return table[1][1].innerText;
  }
  return false;
}

//calls all three check functions to return a true or false value
function checkForWin() {
  if (
    checkRows() !== false ||
    checkColumns() !== false ||
    checkDiagonals() !== false
  ) {
    return true;
  }
  return false;
}

//gets the string value returned from a matched check function
function getWinner() {
  if (checkColumns() !== false) {
    return checkColumns();
  } else if (checkRows() !== false) {
    return checkRows();
  } else if (checkDiagonals() !== false) {
    return checkDiagonals();
  }
}

//determines the players turn based on the turn counter in the outer function
function getPlayerTurn(turnCounter) {
  if (turnCounter % 2 === 1) {
    return "X";
  } else {
    return "O";
  }
}

// several render functions to change banner text
function renderPlayerTurn(turnCounter) {
  const turnContainer = document.querySelector("#banner-container");
  if (turnContainer.hasChildNodes()) {
    turnContainer.removeChild(turnContainer.firstChild);
  }
  const bannerText = document.createElement("p");
  bannerText.innerText = `${getPlayerTurn(turnCounter)}'s turn`;
  turnContainer.appendChild(bannerText);
}

function renderWinBanner() {
  const turnContainer = document.querySelector("#banner-container");
  if (turnContainer.hasChildNodes()) {
    turnContainer.removeChild(turnContainer.firstChild);
  }
  const bannerText = document.createElement("p");
  bannerText.innerText = `${getWinner()} Won the Round!`;
  turnContainer.appendChild(bannerText);
}

function renderDrawBanner() {
  const turnContainer = document.querySelector("#banner-container");
  if (turnContainer.hasChildNodes()) {
    turnContainer.removeChild(turnContainer.firstChild);
  }
  const bannerText = document.createElement("p");
  bannerText.innerText = "Draw!";
  turnContainer.appendChild(bannerText);
}

//function to reset the board with default values and reset turn coutner
function resetBoard() {
  const table = document.querySelector("#game-table");
  const cells = table.querySelectorAll("td");

  for (const cell of cells) {
    cell.innerText = "-";
  }
}

//funciton that creates event listener for table, reset button, and starts game
function startGame() {
  const gameTable = document.querySelector("#game-table");
  let turnCounter = 1;

  const resetButton = document.querySelector("#reset-button");
  resetButton.addEventListener("click", () => {
    turnCounter = 1;
    resetBoard();
    renderPlayerTurn(turnCounter);
  });

  gameTable.addEventListener("click", (event) => {
    // if the targeted element is a td and has a blank and game isnt over
    if (
      event.target.nodeName === "TD" &&
      event.target.innerText === "-" &&
      checkForWin() !== true
    ) {
      //if counter is even Xs, if counter odd, Os
      if (turnCounter % 2 === 1) {
        event.target.innerText = "X";
        turnCounter++;
        renderPlayerTurn(turnCounter);
      } else {
        event.target.innerText = "O";
        turnCounter++;
        renderPlayerTurn(turnCounter);
      }
    }
    if (checkForWin() === true) {
      renderWinBanner();
    } else if (!checkForWin() && turnCounter > 9) {
      renderDrawBanner();
    }
  });
}

//execution of the functions
createGameTable();
createTableRows();
renderPlayerTurn(1);
startGame();
