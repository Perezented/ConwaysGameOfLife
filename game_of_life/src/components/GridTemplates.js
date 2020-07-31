import React from "react";
import bigXimg from "../imgs/bigX.png";
import pulsarImg from "../imgs/pulsar.png";
import lwssImg from "../imgs/lwss.png";
import fpentominoImg from "../imgs/fpentomino.png";
import randomizeImg from "../imgs/randomize.png";

// Buttons to return grid templates
export default function GridTemplates(props) {
    return (
        <>
            <div className="gridTemps">
                <h4>Grid Templates</h4>
                {/* <div className="buttons">
                <button onClick={props.bigX}>BigX</button>
                <button onClick={props.pulsar}>Pulsar</button>
                <button onClick={props.ship}>LWSS</button>
                <button onClick={props.fpentomino}>F-pentomino</button>
                <button onClick={props.seed}>Randomize</button>
            </div> */}
                <div className="imgs">
                    <div>
                        <h4>Big X</h4>{" "}
                        <img
                            src={bigXimg}
                            width="90"
                            height="90"
                            onClick={props.bigX}
                        />
                    </div>{" "}
                    <div>
                        <h4>Pulsar</h4>
                        <img
                            src={pulsarImg}
                            width="90"
                            height="90"
                            onClick={props.pulsar}
                        />
                    </div>
                    <div>
                        <h4>LWSS</h4>{" "}
                        <img
                            src={lwssImg}
                            width="90"
                            height="90"
                            onClick={props.ship}
                        />
                    </div>{" "}
                    <div>
                        <h4>F-Pentomino</h4>{" "}
                        <img
                            src={fpentominoImg}
                            width="90"
                            height="90"
                            onClick={props.fpentomino}
                        />
                    </div>{" "}
                    <div>
                        <h4>Randomize</h4>{" "}
                        <img
                            src={randomizeImg}
                            width="90"
                            height="90"
                            onClick={props.seed}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
