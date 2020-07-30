import React from "react";

// funciton to toggle box !dead or !alive
class Box extends React.Component {
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
