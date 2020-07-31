import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./components/Grid";
import Buttons from "./components/Buttons.js";
import GameRules from "./components/GameRules";
import GridTemplates from "./components/GridTemplates.js";
import GridSizer from "./components/GridSizer";
//  Renaming of the page's title
document.title = "Conways's Game of Life";
console.log(window.innerWidth);

// Start off app being a class. Have a check to see if the program is running,
// has a speed, rows, columns, generation state and grid state
class App extends React.Component {
    constructor() {
        super();
        this.going = false;
        this.speed = 500;
        if (window.innerWidth > 500) {
            this.rows = 55;
            this.cols = 55;
        } else {
            this.rows = 25;
            this.cols = 25;
        }
        this.state = {
            generation: 0,
            gridFull: Array(this.rows)
                .fill()
                .map(() => Array(this.cols).fill(false)),
        };
    }

    // Function to click a box and selected it !dead or !alive
    selectBox = (row, col) => {
        if (this.going) {
            return;
        } else {
            let gridCopy = arrayClone(this.state.gridFull);
            gridCopy[row][col] = !gridCopy[row][col];
            this.setState({
                gridFull: gridCopy,
            });
        }
    };
    // Randomizer ot fill the grid randomly. Does not restart the current gen going
    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 5) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({ gridFull: gridCopy, generation: 0 });
    };
    // Makes a big x across the board. It clears the board and pauses the game
    bigX = async () => {
        await this.clear();
        let gridCopy = arrayClone(this.state.gridFull);
        let i = 0;
        let j = 0;
        let m = this.rows - 1;
        while (i < this.rows) {
            gridCopy[i][j] = true;
            gridCopy[m][j] = true;
            i += 1;
            j += 1;
            m -= 1;
        }
        this.setState({ gridFull: gridCopy });
    };

    pulsar = async () => {
        await this.clear();
        let gridCopy = arrayClone(this.state.gridFull);
        let j = Math.floor(this.rows / 2) + 1;
        let i = Math.floor(this.cols / 2) + 1;
        // 4 center up and down
        threeUP(i - 2, j + 1);
        threeUP(i - 2, j - 1);
        threeUP(i + 4, j + 1);
        threeUP(i + 4, j - 1);

        // 4 center across
        threeAcross(i - 1, j + 2);
        threeAcross(i + 1, j + 2);
        threeAcross(i + 1, j - 4);
        threeAcross(i - 1, j - 4);

        // the outer across rows
        threeAcross(i - 6, j + 2);
        threeAcross(i + 6, j + 2);
        threeAcross(i + 6, j - 4);
        threeAcross(i - 6, j - 4);

        // the outer up and down columns
        threeUP(i - 2, j + 6);
        threeUP(i - 2, j - 6);
        threeUP(i + 4, j + 6);
        threeUP(i + 4, j - 6);

        function threeUP(x, y) {
            gridCopy[x][y] = true;
            gridCopy[x - 1][y] = true;
            gridCopy[x - 2][y] = true;
        }

        function threeAcross(x, y) {
            gridCopy[x][y] = true;
            gridCopy[x][y + 1] = true;
            gridCopy[x][y + 2] = true;
        }

        this.setState({ gridFull: gridCopy });
    };

    ship = async () => {
        await this.clear();
        let gridCopy = arrayClone(this.state.gridFull);
        let j = Math.floor(this.rows / 2) + 1;
        let i = Math.floor(this.cols / 2) + 1;
        threeUP(i, j);
        threeAcross(i - 2, j - 2);
        gridCopy[i - 2][j - 3] = true;
        gridCopy[i - 1][j - 4] = true;
        gridCopy[i + 1][j - 4] = true;
        gridCopy[i + 1][j - 1] = true;
        function threeUP(x, y) {
            gridCopy[x][y] = true;
            gridCopy[x - 1][y] = true;
            gridCopy[x - 2][y] = true;
        }
        function threeAcross(x, y) {
            gridCopy[x][y] = true;
            gridCopy[x][y + 1] = true;
            gridCopy[x][y + 2] = true;
        }
        this.setState({ gridFull: gridCopy });
    };

    fpentomino = async () => {
        await this.clear();
        let gridCopy = arrayClone(this.state.gridFull);
        let j = Math.floor(this.rows / 2) + 1;
        let i = Math.floor(this.cols / 2) + 1;
        threeUP(i, j);
        gridCopy[i - 1][j - 1] = true;
        gridCopy[i - 2][j + 1] = true;
        function threeUP(x, y) {
            gridCopy[x][y] = true;
            gridCopy[x - 1][y] = true;
            gridCopy[x - 2][y] = true;
        }
        this.setState({ gridFull: gridCopy });
    };
    // play
    playButton = () => {
        this.going = true;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    };
    // pause
    pauseButton = () => {
        this.going = false;
        clearInterval(this.intervalId);
    };
    // slow down the program by 100 ms
    slow = () => {
        this.speed += 100;
        this.playButton();
    };
    // speed up the program by 100 ms

    fast = () => {
        if (this.speed === 100) {
            return;
        } else {
            this.speed -= 100;
            this.playButton();
        }
    };
    // clear and pauses the game
    clear = () => {
        const grid = Array(this.rows)
            .fill()
            .map(() => Array(this.cols).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0,
        });
        this.pauseButton();
    };

    removeTen = async () => {
        if (this.cols > 14) {
            await this.clear();
            this.rows -= 10;
            this.cols -= 10;
            this.clear();
        }
    };

    addTen = async () => {
        const theFormula = (this.rows + 10) * 10 + 40;
        if (theFormula > window.innerWidth || theFormula > window.innerHeight) {
            return;
        } else {
            if (window.innerWidth <= 500) {
                if (this.cols !== 25) {
                    await this.clear();
                    this.rows += 10;
                    this.cols += 10;
                    this.clear();
                }
            } else {
                await this.clear();
                this.rows += 10;
                this.cols += 10;
                this.clear();
            }
        }
    };

    // the game playing
    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let count = 0;
                // check and see if the items to the left, right, below, above, and the diagnals contain live or dead cells. if there are live cells, increment count
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && j < this.cols - 1)
                    if (g[i + 1][j + 1]) count++;
                // if the amount of live cells in the area are not between 2 and 3, the item is dead
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                // if the amount of neighbors is 3 exactly and the item was dead originally, it comes back to life
                if (!g[i][j] && count === 3) g2[i][j] = true;
            }
        }
        this.setState({
            gridFull: g2,
            generation: (this.state.generation += 1),
        });
    };
    // when the program opens up, be ready to watch a random grid
    componentDidMount() {
        this.seed();
    }

    render() {
        return (
            <section>
                <div className="theGrid">
                    <div className="title">
                        {window.innerWidth < 700 && (
                            <a href="#gameRules">Rules</a>
                        )}
                        <h1>The Game of Life</h1>
                    </div>
                    <h2>Generation: {this.state.generation}</h2>
                    <Grid
                        gridFull={this.state.gridFull}
                        rows={this.rows}
                        cols={this.cols}
                        selectBox={this.selectBox}
                    />
                </div>

                <div className="notTheGrid">
                    <GameRules />
                    <h4>
                        Current Speed: {this.speed / 1000} seconds/generation
                    </h4>
                    <Buttons
                        playButton={this.playButton}
                        pauseButton={this.pauseButton}
                        slow={this.slow}
                        fast={this.fast}
                        gridSize={this.gridSize}
                        clear={this.clear}
                        going={this.going}
                        speed={this.speed}
                    />
                    <GridTemplates
                        bigX={this.bigX}
                        pulsar={this.pulsar}
                        ship={this.ship}
                        seed={this.seed}
                        fpentomino={this.fpentomino}
                    />
                    <GridSizer
                        removeTen={this.removeTen}
                        addTen={this.addTen}
                        rows={this.rows}
                    />
                </div>
            </section>
        );
    }
}
// function to duplicate array
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

export default App;
