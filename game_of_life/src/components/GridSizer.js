import React from "react";

export default function GridSizer(props) {
    // console.log((props.rows + 10) * 10 + 40);
    const theFormula = (props.rows + 10) * 10 + 40;

    return (
        <div className="buttons">
            <button
                onClick={props.removeTen}
                className={props.rows === 5 ? "grey" : null}
            >
                Remove 10x10 cells
            </button>

            <button
                onClick={props.addTen}
                className={
                    (props.rows === 25 && window.innerWidth < 500) ||
                    theFormula > window.innerWidth ||
                    theFormula > window.innerHeight
                        ? "grey"
                        : null
                }
            >
                Add 10x10 cells
            </button>
            {/* <form>
                <input
                    type="range"
                    min="25"
                    max="100"
                    id="myRange"
                    className="slider"
                ></input>
                <p>Value: </p>
            </form> */}
        </div>
    );
}
