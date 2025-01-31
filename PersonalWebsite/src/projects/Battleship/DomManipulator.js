import Player from "./Player.js";
import GameState from "./GameState.js";

class DomManip {
  constructor() {
    this.selectedTiles = [];
    this.lastHoveredTile = null;

    this.shipTypes = [
      { name: "Carrier", length: 5 },
      { name: "Battleship", length: 4 },
      { name: "Cruiser", length: 3 },
      { name: "Submarine", length: 3 },
      { name: "Destroyer", length: 2 },
    ];
    this.gameState = new GameState();

    this.selectedShip = undefined;
    this.rotation = "horizontal";

    this.players = [];
    this.currentPlayer = null;
  }

  //-------------------------------------------------
  //    Navigation Component generators
  //-------------------------------------------------
  onEntry() {
    const mainWrapper = this.generateMainWrapper();
    const navWrapper = this.generateNavWrapper(mainWrapper);
    const playerBoardWrapper = this.generatePlayerBoardWrapper(mainWrapper);

    this.generateStateWrapper(playerBoardWrapper);

    this.players.push(this.generatePlayer("Human", 1, playerBoardWrapper));
    this.generateShipSetupPanel(navWrapper, this.players[0]);
    this.players.push(this.generatePlayer("Human", 2, playerBoardWrapper));

    this.currentPlayer = 1;

    //add listener for rotation
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    this.generateScreenBlocker("Player 1's Setup");
    this.generateBoardBlocker(this.players[1]);
  }

  generateMainWrapper() {
    // Find the correct container to append the screenBlocker
    const screenZone = document.querySelector(".BattleShipApp"); // Replace with the actual class or ID
    if (!screenZone) {
      console.error("screenZone element not found!");
      return;
    }
    const mainProjPanelWrapper = document.createElement("div");
    mainProjPanelWrapper.classList.add("mainWrapper");
    screenZone.appendChild(mainProjPanelWrapper);
    return mainProjPanelWrapper;
  }

  generatePlayerBoardWrapper(mainWrapper) {
    const playerBoardWrapper = document.createElement("div");
    playerBoardWrapper.classList.add("playerBoardWrapper");
    mainWrapper.appendChild(playerBoardWrapper);
    return playerBoardWrapper;
  }

  generateNavWrapper(mainWrapper) {
    const navWrapper = document.createElement("div");
    navWrapper.classList.add("navWrapper");
    mainWrapper.appendChild(navWrapper);
    return navWrapper;
  }

  generateShipSetupPanel(navWrapper) {
    this.shipTypes.forEach((ship) => {
      this.addShipToNavPanel(ship, navWrapper);
    });
  }

  generateScreenBlocker(text, shipHit = null, shipSunk = false) {
    let screenZone = document.querySelector(".game-container");

    if (screenZone) {
      // Replace the existing screenZone with a screenBlocker
      const screenBlocker = document.createElement("div");
      screenBlocker.classList.add("screenBlocker");

      const screenBlockerWrapper = document.createElement("div");
      screenBlockerWrapper.classList.add("screenBlockerWrapper");

      const screenBlockerText = document.createElement("div");
      screenBlockerText.classList.add("screenBlockerText");
      screenBlockerText.textContent = text;

      if (shipSunk) {
        const shipSunkText = document.createElement("div");
        shipSunkText.classList.add("sunkText");
        shipSunkText.textContent = `You sunk their ${shipSunk}!`;
        screenBlockerWrapper.appendChild(shipSunkText);
      } else if (shipHit !== null) {
        const shipHitText = document.createElement("div");
        shipHitText.classList.add("hitText");
        shipHitText.textContent = shipHit ? "You Hit!!!" : "You Missed!";
        screenBlockerWrapper.appendChild(shipHitText);
      }

      const screenBlockerSecondaryText = document.createElement("div");
      screenBlockerSecondaryText.classList.add("screenBlockerText");
      screenBlockerSecondaryText.textContent = "Ready next player";

      const screenBlockerButton = this.generateCloseButton();

      screenBlockerWrapper.appendChild(screenBlockerText);
      screenBlockerWrapper.appendChild(screenBlockerSecondaryText);
      screenBlockerWrapper.appendChild(screenBlockerButton);
      screenBlocker.appendChild(screenBlockerWrapper);

      // Replace the screenZone with screenBlocker
      screenZone.replaceWith(screenBlocker);
    }
  }

  addShipToNavPanel(ship, navWrapper) {
    const shipWrapper = document.createElement("div");
    const shipTitle = document.createElement("div");

    shipTitle.classList.add("shipTitle");
    shipTitle.textContent = ship.name;
    shipWrapper.classList.add("shipWrapper");
    shipWrapper.dataset.shipType = ship.name;
    shipWrapper.dataset.shipLength = ship.length;

    shipWrapper.addEventListener("click", () => {
      this.selectedShip = ship;
      const allNav = document.querySelectorAll(".shipWrapper");

      //Deselect other ship navs
      allNav.forEach((nav) => nav.classList.remove("navShipSelected"));
      shipWrapper.classList.add("navShipSelected");
    });

    shipWrapper.appendChild(shipTitle);
    navWrapper.appendChild(shipWrapper);
  }

  removeShipFromNavPanel() {
    //Remove all ships that have .navShipSelected since we only ever want one.
    const NavToRemove = document.querySelectorAll(".navShipSelected");
    NavToRemove.forEach((nav) => nav.remove("navShipSelected"));
    this.handleShipDeselect();
  }

  generateStateWrapper(mainWrapper) {
    const currentStateWrapper = document.createElement("div");
    currentStateWrapper.classList.add("stateWrapper");
    mainWrapper.appendChild(currentStateWrapper);
    this.updateStateTextContent();
  }

  updateStateTextContent() {
    const stateWrapper = document.querySelector(".stateWrapper");
    switch (this.gameState.state) {
      case 0:
        stateWrapper.textContent = "Player One Setup";
        break;
      case 1:
        stateWrapper.textContent = "Player Two Setup";
        break;
      case 2:
        stateWrapper.textContent = "Player One's turn";
        break;
      case 3:
        stateWrapper.textContent = "Player Two's turn";
        break;
    }
  }

  generatePlayer(type, playerId, mainWrapper) {
    const playerPanel = document.createElement("div");
    const playerTextPanel = document.createElement("div");
    const playerBoardPanel = document.createElement("div");
    const player = new Player(type, playerId);

    playerPanel.classList.add("PlayerPanel");

    playerTextPanel.classList.add("player" + playerId, "playerText");
    playerTextPanel.textContent = "Player " + playerId;

    playerBoardPanel.classList.add("player" + playerId, "playerBoard");

    const boardTileWrapper = this.generateBoard(player);

    mainWrapper.appendChild(playerPanel);
    playerPanel.appendChild(playerTextPanel);
    playerPanel.appendChild(playerBoardPanel);
    playerBoardPanel.appendChild(boardTileWrapper);
    return player;
  }

  generateBoard(player) {
    const boardWrapper = document.createElement("div");
    boardWrapper.classList.add("boardWrapper");
    boardWrapper.addEventListener("mouseout", () => {
      this.clearAllTileHover();
    });

    player.gameBoard.board.forEach((section, colIndex) => {
      let column = document.createElement("div");
      column.classList.add("col");

      section.forEach((tile, rowIndex) => {
        const square = document.createElement("div");
        square.classList.add("player" + player.playerId, "tile");
        square.dataset.col = colIndex;
        square.dataset.row = rowIndex;
        square.dataset.playerId = player.playerId;
        square.addEventListener("click", (event) => {
          this.handleTileClick(event, player);
        });
        square.addEventListener("mouseover", (event) => {
          this.handleTileHover(event);
        });
        column.appendChild(square);
      });
      // Add additional attributes or content to the square if needed
      boardWrapper.appendChild(column);
    });

    return boardWrapper;
  }
  generateBoardBlocker(player) {
    // Hide the player who is not in focus by adding "hidden" class to their board tiles
    player.gameBoard.board.forEach((section, colIndex) => {
      section.forEach((tile, rowIndex) => {
        const tileElement = document.querySelector(
          `.tile[data-player-id="${player.playerId}"][data-col="${colIndex}"][data-row="${rowIndex}"]`
        );
        if (tileElement) {
          tileElement.classList.add("hidden");
        }
      });
    });
  }

  removeBoardBlocker(player) {
    // Unhide the player who is now in focus by removing "hidden" class from their board tiles
    player.gameBoard.board.forEach((section, colIndex) => {
      section.forEach((tile, rowIndex) => {
        const tileElement = document.querySelector(
          `.tile[data-player-id="${player.playerId}"][data-col="${colIndex}"][data-row="${rowIndex}"]`
        );
        if (tileElement) {
          tileElement.classList.remove("hidden");
        }
      });
    });
  }

  generatePlayerFeedbackPanel(text) {
    //Gives the player feedback on whether they hit or miss.
    const playerFeedback = document.createElement("div");
    playerFeedback.classList.add("playerFeedbackPanel");

    const playerFeedbackWrapper = document.createElement("div");
    playerFeedbackWrapper.classList.add("playerFeedbackPanelWrapper");

    const playerFeedbackText = document.createElement("div");
    playerFeedbackText.classList.add("playerFeedbackText");
    playerFeedbackText.textContent = text;

    const playerFeedbackButton = this.generateCloseButton();

    document.body.appendChild(playerFeedback);
    playerFeedback.appendChild(playerFeedbackWrapper);
    playerFeedbackWrapper.appendChild(playerFeedbackText);
    playerFeedbackWrapper.appendChild(playerFeedbackButton);
    return playerFeedback;
  }

  generateCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.classList.add("screenBlockerButton");
    closeButton.textContent = "Continue";

    closeButton.addEventListener("click", () => {
      const screenWrapper = document.querySelector(".screenBlocker");
      screenWrapper.remove();
      closeButton.remove();
    });
    return closeButton;
  }

  //------------------------------------------
  //--Handlers
  //------------------------------------------

  handleKeyDown(event) {
    if (this.selectedShip) {
      if (event.key === "r" || event.key === "R") {
        this.changeRotation();
        if (this.lastHoveredTile) {
          this.handleTileHover({ target: this.lastHoveredTile });
        }
      }
    }
  }

  changeRotation() {
    if (this.rotation == "vertical") {
      this.rotation = "horizontal";
    } else {
      this.rotation = "vertical";
    }
  }

  handleTileClick(event, player) {
    const tile = event.target;
    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);
    let shipSunk = null;
    let shipHit = null;

    const playerId = parseInt(tile.dataset.playerId);

    //Handle clicking on the tile in different stages of the game.

    switch (this.gameState.getState()) {
      case 0:
      case 1:
        if (playerId !== this.currentPlayer) {
          // If the tile does not belong to the current player, ignore the click
          return;
        }
        const shipTiles = this.getShipPlacement(row, col);
        if (this.selectedShip && shipTiles) {
          try {
            player.gameBoard.addShipToBoard(
              this.selectedShip.name,
              this.selectedShip.length,
              shipTiles,
              this.currentPlayer
            );
            this.removeShipFromNavPanel();

            shipTiles.forEach(([r, c]) => {
              const tileToMark = document.querySelector(
                `.tile[data-row="${r}"][data-col="${c}"][data-player-id="${playerId}"]`
              );
              if (tileToMark) {
                tileToMark.classList.add("ship");
              }
            });
            //Should we move on from setup?
            if (this.ShouldStateAdvance()) {
              this.handleStateChange();
            }
            this.rotation = "horizontal";
          } catch (error) {
            console.error(error.message);
            alert(error.message);
          }
        }
        break;
      case 2:
      case 3:
        shipHit = false;
        if (playerId !== this.currentPlayer) {
          const tileToMark = document.querySelector(
            `.tile[data-row="${row}"][data-col="${col}"][data-player-id="${playerId}"]`
          );

          if (tileToMark) {
            const attackResult = this.players[
              playerId - 1
            ].gameBoard.receiveAttack([row, col], this.OnGameEnd);
            shipHit = attackResult.hit;
            shipSunk = attackResult.sunk;

            if (shipHit) {
              tileToMark.classList.add("shipHit");
            } else {
              tileToMark.classList.add("miss");
            }

            this.handleStateChange(shipHit, shipSunk);
          }
        }
        this.rotation = "horizontal";
        break;
    }
  }
  handleTileHover(event) {
    const ship = this.selectedShip;
    const tile = event.target;
    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);
    const playerId = parseInt(tile.dataset.playerId);

    if (ship && playerId === this.currentPlayer) {
      this.lastHoveredTile = tile;
      this.clearAllTileHover();

      // Calculate which tiles should be highlighted
      const shipTiles = this.getShipPlacement(row, col);

      if (shipTiles) {
        shipTiles.forEach(([r, c]) => {
          const hoverTile = document.querySelector(
            `.tile[data-row="${r}"][data-col="${c}"][data-player-id="${playerId}"]`
          );
          if (hoverTile) {
            hoverTile.classList.add("hover");
          }
        });
      }
    }

    //check if we're clicking on an enemy board to fire during gameplay loop
    if (
      !ship &&
      playerId !== this.currentPlayer &&
      [2, 3].includes(this.gameState.getState())
    ) {
      this.lastHoveredTile = tile;
      this.clearAllTileHover();

      // Calculate which tiles should be highlighted
      const hoverTile = document.querySelector(
        `.tile[data-row="${row}"][data-col="${col}"][data-player-id="${playerId}"]`
      );
      if (hoverTile) {
        hoverTile.classList.add("enemyHover");
      }
    }
  }

  getShipPlacement(row, col) {
    //given a row/col, return the tiles we'd need to place the ship
    const ship = this.selectedShip;
    if (!ship) return null;

    const shipTiles = [];
    if (this.rotation == "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        shipTiles.push([row, col + i]);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        shipTiles.push([row + i, col]);
      }
    }

    return shipTiles;
  }

  handleStateChange(shipHit = null, shipSunk = null) {
    switch (this.gameState.getState()) {
      case 0:
        this.generateScreenBlocker("Player 2's Setup");
        this.generateBoardBlocker(this.players[0]);
        this.removeBoardBlocker(this.players[1]);

        this.currentPlayer = this.players[1].playerId;

        this.generateShipSetupPanel(
          document.querySelector(".navWrapper"),
          this.players[1]
        );

        this.gameState.advanceState();
        this.updateStateTextContent();
        break;
      case 1:
        this.generateScreenBlocker("Player 1's Turn");
        this.generateBoardBlocker(this.players[1]);
        this.removeBoardBlocker(this.players[0]);

        this.currentPlayer = this.players[0].playerId;

        this.gameState.advanceState();
        this.updateStateTextContent();

        break;
      case 2:
        this.generateScreenBlocker("Player 2's Turn", shipHit, shipSunk);

        this.currentPlayer = this.players[1].playerId;

        this.gameState.advanceState();
        this.updateStateTextContent();

        this.generateBoardBlocker(this.players[0]);
        this.removeBoardBlocker(this.players[1]);

        break;
      case 3:
        this.generateScreenBlocker("Player 1's Turn", shipHit, shipSunk);

        this.currentPlayer = this.players[0].playerId;

        this.gameState.advanceState();

        this.updateStateTextContent();
        this.generateBoardBlocker(this.players[1]);
        this.removeBoardBlocker(this.players[0]);
        break;
    }
  }

  handleShipDeselect() {
    this.clearAllTileHover();
    this.selectedShip = undefined;
  }
  clearAllTileHover() {
    // Clear previous hover states
    const allTiles = document.querySelectorAll(".tile");
    allTiles.forEach((tile) => tile.classList.remove("hover"));
    allTiles.forEach((tile) => tile.classList.remove("enemyHover"));
  }
  //
  //
  //

  ShouldStateAdvance() {
    //Returns true or false if we should advance the state
    const allNav = document.querySelectorAll(".shipWrapper");
    switch (this.gameState.state) {
      case 0:
      case 1:
        if (allNav.length == 0) {
          return true;
        }
        return false;
      //Deselect other ship navs
      case 2:
        if (players[0].hasShot == true) {
          return true;
        }
        return false;
      case 3:
        if (players[1].hasShot == true) {
          return true;
        }
        return false;
    }
  }
  OnGameEnd() {
    this.generateScreenBlocker("Game End " + this.currentPlayer + " WINS!");
    return this.currentPlayer;
  }
}

export default DomManip;
