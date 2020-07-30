import React from "react";
import Box from "./Box";
class Grid extends React.Component {
    render() {
        // grid size, sets the grid up dynamically
        const width = this.props.cols * 14;

        let rowsArr = [];
        let boxClass = "";

        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                // checks the grid to see if the box is true or false and sets them to their approipriate css class
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
            // Here is the returned width for the grid
            <div className="grid" style={{ width: width }}>
                {rowsArr}
            </div>
        );
    }
}

export default Grid;
