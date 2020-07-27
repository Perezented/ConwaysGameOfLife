import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./components/Grid";
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            generation: 0,
        };
    }
    render() {
        return (
            <div>
                <h1>The Game of Life</h1>
                <Grid />
                <h2>Generations:{this.state.generation}</h2>
            </div>
        );
    }
}

export default App;
