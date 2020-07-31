import React from "react";

export default function GameRules() {
    return (
        <div id={"gameRules"}>
            <h2>Rules of Conway's Game of Life</h2>
            <p>
                The Game of Life has a grid. Each cell of the grid is either
                dead(black) or alive(green). Each cell relies on its surrounding
                cells.(Up, Down, Left, Right, Diagonals){" "}
            </p>
            <li>
                If the cell is alive and has 2 or 3 live neighbors, then that
                cell stays alive.
            </li>
            <li>
                If the live cell has only 1 or 4 or more live neighbors, then
                the cell dies.
            </li>
            <li>
                If the cell is dead and has exactly 3 live neighbors, then the
                dead cell comes to life.
            </li>
            <li>All other cells stay dead.</li>
            <li>Walls act as dead cells. </li>
        </div>
    );
}
