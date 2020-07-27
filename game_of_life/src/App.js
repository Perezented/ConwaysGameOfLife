import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import Grid from "./components/Grid";

class Grid extends React.Component {
    render() {
        const width = this.props.cols;
        let rowsArr = [];
        let boxClass = "";
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j;
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
                rowsArr.push(
                    <></>
                    // <Box
                    //     boxClass={boxClass}
                    //     key={boxId}s
                    //     boxId={boxId}
                    //     row={i}
                    //     col={j}
                    //     selectBox={this.props.selectBox}
                    // >
                    //     test
                    // </Box>
                );
            }
        }
        return (
            <div className="grid" style={{ width: width }}>
                {{ rowsArr }}
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;
        this.state = {
            generation: 0,
            gridFull: Array(this.rows)
                .fill()
                .map(() => {
                    Array(this.columns).fill(false);
                }),
        };
    }
    render() {
        return (
            <div>
                <h1>The Game of Life</h1>
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                />
                <h2>Generations:{this.state.generation}</h2>
            </div>
        );
    }
}

export default App;
