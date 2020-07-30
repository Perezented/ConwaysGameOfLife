import React from "react";

export default function GridTemplates(props) {
    return (
        <div className="buttons">
            <button onClick={props.bigX}>BigX</button>
            <button onClick={props.seed}>Randomize</button>

            <button onClick={props.clear}>Clear</button>
        </div>
    );
}
