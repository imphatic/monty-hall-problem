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
            </div>
        );
    }
}

class Results extends React.Component {
    render() {
        return (
            <div />
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
                        The answer, perhaps suprisingly, is yes, your chance of winning is increased when you switch your
                        choice.  Below you can simulate either switching doors or always sticking with the original choice.
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