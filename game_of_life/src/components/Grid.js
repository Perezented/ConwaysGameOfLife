import React from "react";
import Box from "./Box";
// grid size, sets the grid up dynamically
class Grid extends React.Component {
    // checks the grid to see if the box is true or false and sets them to their approipriate css class
    // Here is the returned width for the grid
    render() {
        const width = this.props.cols * 11;

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

export default Grid;
