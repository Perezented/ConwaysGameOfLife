import React from "react";
class Buttons extends React.Component {
    handleSelect = (evt) => {
        this.props.gridSize(evt);
    };

    render() {
        return (
            <div className="buttons">
                <button onClick={this.props.playButton}>Play</button>
                <button onClick={this.props.pauseButton}>Pause</button>
                <button onClick={this.props.slow}>Slower</button>
                <button onClick={this.props.fast}>Faster</button>
                <button onClick={this.props.clear}>Clear</button>
            </div>
        );
    }
}

export default Buttons;
