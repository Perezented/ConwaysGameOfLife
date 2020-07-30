import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./components/Grid";
import Buttons from "./components/Buttons.js";
import GameRules from "./components/GameRules";
import GridTemplates from "./components/GridTemplates.js";
document.title = "Conways's Game of Life";
class App extends React.Component {
    constructor() {
        super();
        this.going = false;
        this.speed = 500;
        this.rows = 51;
        this.cols = 51;
        this.state = {
            generation: 0,
            gridFull: Array(this.rows)
                .fill()
                .map(() => Array(this.cols).fill(false)),
        };
    }

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

    bigX = async () => {
        await this.clear();
        let gridCopy = arrayClone(this.state.gridFull);
        let i = 0;
        let j = 0;
        let m = this.rows - 1;
        while (i < this.rows) {
            gridCopy[i][j] = true;
            gridCopy[m][j] = true;
            console.log(i);
            i += 1;
            j += 1;
            m -= 1;
        }
        this.setState({ gridFull: gridCopy });
    };

    playButton = () => {
        this.going = true;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    };

    pauseButton = () => {
        this.going = false;
        clearInterval(this.intervalId);
    };

    slow = () => {
        this.speed += 200;
        this.playButton();
    };

    fast = () => {
        if (this.speed === 100) {
            return;
        } else {
            this.speed -= 200;
            this.playButton();
        }
    };

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

    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 25;
                this.rows = 25;
                break;
            case "2":
                this.cols = 35;
                this.rows = 35;
                break;
            default:
                this.cols = 51;
                this.rows = 51;
        }
        this.clear();
    };

    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let count = 0;
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && j < this.cols - 1)
                    if (g[i + 1][j + 1]) count++;
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                if (!g[i][j] && count === 3) g2[i][j] = true;
            }
        }
        this.setState({
            gridFull: g2,
            generation: (this.state.generation += 1),
        });
    };

    componentDidMount() {
        this.seed();
    }

    render() {
        return (
            <section>
                <div>
                    <h1>The Game of Life</h1>
                    <h2>Generations: {this.state.generation}</h2>
                    <Grid
                        gridFull={this.state.gridFull}
                        rows={this.rows}
                        cols={this.cols}
                        selectBox={this.selectBox}
                    />
                </div>
                <div>
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
                    />
                    <GridTemplates
                        bigX={this.bigX}
                        clear={this.clear}
                        seed={this.seed}
                    />
                </div>
            </section>
        );
    }
}

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

export default App;
