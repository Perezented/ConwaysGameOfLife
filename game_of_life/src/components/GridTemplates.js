import React from "react";

// Buttons to return grid templates
export default function GridTemplates(props) {
    return (
        <div className="buttons">
            <button onClick={props.bigX}>BigX</button>
            <button onClick={props.pulsar}>Pulsar</button>
            <button onClick={props.ship}>LWSS</button>
            <button onClick={props.fpentomino}>F-pentomino</button>
            <button onClick={props.seed}>Randomize</button>
            <button onClick={props.clear}>Clear</button>
        </div>
    );
}
