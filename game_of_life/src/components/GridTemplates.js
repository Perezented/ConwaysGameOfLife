import React from "react";

export default function GridTemplates(props) {
    return (
        // Buttons to return grid templates
        <div className="buttons">
            <button onClick={props.bigX}>BigX</button>
            <button onClick={props.pulsar}>Pulsar</button>
            <button onClick={props.seed}>Randomize</button>

            <button onClick={props.clear}>Clear</button>
        </div>
    );
}
