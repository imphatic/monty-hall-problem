import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Door(props) {
    return (
        <div className="doorWrap">
            <div className="arrowWrap">
                { props.selected ? <div className="arrow" /> : null }
            </div>
            <div className="doorShape">
                <span>{props.value}</span>
            </div>
            <div className={'prize ' + props.prize}>
                {props.prize}
            </div>
        </div>
    );
}


class Doors extends React.Component {
    renderDoor(i, prize, selected) {
        return (
            <Door
                value={i+1}
                prize={prize}
                selected={selected}
            />
        );
    }

    render() {
        return (
            <div className="doors">
                {this.renderDoor(0, 'car', false)}
                {this.renderDoor(1, 'goat', true)}
                {this.renderDoor(2, 'goat', false)}
            </div>
        );
    }
}

class Controls extends React.Component {
    render() {
        return (
            <div className="controls">
                <hr />
                <h2>Controls</h2>
                <div className="controlsWrap">
                    <div className="controlWrap">
                        <div>Runs</div>
                        <div><input type="input" name="runs" value="100" /></div>
                    </div>
                    <div className="controlWrap">
                        <div>Speed</div>
                        <div><input type="input" name="speed" value="50" /> %</div>
                    </div>
                    <div className="controlWrap">
                        <div />
                        <div><input type="button" name="run" value="Run!" /></div>
                    </div>
                </div>
            </div>
        );
    }
}

class Results extends React.Component {
    render() {
        return (
            <div className="results">
                <hr />
                <div className="titleWins">Wins</div>
                <div className="titleLoses">Loses</div>
                <h2>Results</h2>

                <div className="resultsWrap">
                    <div className="leftAverageLine">
                        win average with switch: <span className="switch">55%</span>
                    </div>

                    <div className="rightAverageLine">
                        win average without switch: <span className="noSwitch">45%</span>
                    </div>

                    <ul className="rounds">
                        <li className="round">
                            <div className="switch" style={{paddingRight:'25%', paddingLeft:'12%'}}><div className="winner">switch</div></div>
                            <div className="noSwitch"><div>no switch</div></div>
                        </li>

                        <li className="round">
                            <div className="switch" style={{paddingRight:'25%', paddingLeft:'12%'}}><div className="winner">switch</div></div>
                            <div className="noSwitch"><div>no switch</div></div>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}

class MontyHallProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="montyHallProblem">
                <h1>The Monty Hall Problem</h1>
                <div className="summary">
                    <p>
                    "Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car;
                    behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors,
                    opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?"
                    Is it to your advantage to switch your choice?"<br />
                    <span className="grey">From the "Ask Marilyn" column in Parade magazine in 1990</span>
                    </p>
                    <p>
                        The answer, perhaps suprisingly, is yes, your chance of winning is increased when you switch from your
                        original choice.  Below you can simulate either switching doors or always sticking with the original choice.
                    </p>
                </div>

                <Doors />

                <Controls />

                <Results />

            </div>

        );
    }
}


ReactDOM.render(
    <MontyHallProblem />,
    document.getElementById('root')
);