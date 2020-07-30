import React from "react";

export default function GridSize(props) {
    return (
        <div>
            <button onClick={props.gridSize(1)}>25x25</button>
            <button onClick={props.gridSize(2)}>35x35</button>
            <button onClick={props.gridSize(3)}>51x51</button>
        </div>
    );
}
