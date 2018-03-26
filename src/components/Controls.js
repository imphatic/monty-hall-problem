import React from "react";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class Controls extends React.Component {
    render() {
        return (
            <div className="controls">
                <hr />
                <h2>Controls</h2>
                <div className="controlsWrap">
                    <div className="controlWrap">
                        <div>Runs</div>
                        <div>
                            <input type="input"
                                   name="runs"
                                   value={this.props.runs}
                                   onChange={this.props.handleControlsChange.bind(this)}  />
                        </div>
                    </div>
                    <div className="controlWrap speed">
                        <div>Speed</div>
                        <Slider value={this.props.speed} onChange={this.props.handleSliderChange.bind(this)} />
                    </div>
                    <div className="controlWrap">
                        <div />
                        <div>
                            <input type="button"
                                   name="run"
                                   value="Run!"
                                   onClick={() => this.props.run()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}