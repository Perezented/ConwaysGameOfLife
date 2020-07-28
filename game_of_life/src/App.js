import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import Grid from "./components/Grid";

class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    };
    render() {
        return (
            <div
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}
            />
        );
    }
}
class Grid extends React.Component {
    render() {
        const width = this.props.cols * 16;
        let rowsArr = [];
        let boxClass = "";
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j;
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
                rowsArr.push(
                    <Box
                        boxClass={boxClass}
                        key={boxId}
                        boxId={boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                );
            }
        }
        return (
            <div className="grid" style={{ width: width }}>
                {rowsArr}
            </div>
        );
    }
}
class Buttons extends React.Component {
    handleSelect = (evt) => {
        this.props.gridSize(evt);
    };

    render() {
        return (
            <div className="center">
                {/* <ButtonToolbar> */}
                <button onClick={this.props.playButton}>Play</button>
                <button onClick={this.props.pauseButton}>Pause</button>
                <button onClick={this.props.clear}>Clear</button>
                <button onClick={this.props.slow}>Slow</button>
                <button onClick={this.props.fast}>Fast</button>
                <button onClick={this.props.seed}>Seed</button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.going = false;
        this.speed = 500;
        this.rows = 30;
        this.cols = 50;
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
                if (Math.floor(Math.random() * 7) === 1) {
                    gridCopy[i][j] = true;
                }
            }
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
        var grid = Array(this.rows)
            .fill()
            .map(() => Array(this.cols).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0,
        });
    };
    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 25;
                this.rows = 25;
                break;
            case "2":
                this.cols = 25;
                this.rows = 25;
                break;
            case "3":
                this.cols = 25;
                this.rows = 25;
                break;
            default:
                this.cols = 50;
                this.rows = 30;
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
            <div>
                <h1>The Game of Life</h1>
                <h2>Generations: {this.state.generation}</h2>
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <br />
                <h4>Current Speed: {this.speed / 1000}seconds/generation</h4>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                />
            </div>
        );
    }
}
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}
export default App;
