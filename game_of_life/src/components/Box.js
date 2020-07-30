import React from "react";

class Box extends React.Component {
    // funciton to toggle box !dead or !alive
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    };
    render() {
        return (
            // Simple div that is just a box with selected color, width, and height
            <div
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}
            />
        );
    }
}
export default Box;
