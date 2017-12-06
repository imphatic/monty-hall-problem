import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Door(props) {
    return (
        <div className="doorWrap">
            <div className="arrowWrap">
                { props.data.arrow ? <div className="arrow" /> : null }
            </div>
            <div className="doorShape">
                <span>{props.index + 1}</span>
            </div>
            <div className={(props.data.car) ? 'car' : 'goat'}>
                {(props.data.car) ? 'car' : 'goat'}
            </div>
        </div>
    );
}


class Doors extends React.Component {
    render() {
        const doors = this.props.doors.map((data, index) => {
            return (
                <Door
                    key={index}
                    index={index}
                    data={data}
                />
            );
        });

        return (
            <div className="doors">
                {doors}
            </div>
        );
    }
}

class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          'runs': 100,
          'speed' : 50
        };
    }

    executeRun()
    {
        this.props.run(this.state.runs, this.state.speed);
    }

    handleChange(e) {
        let change = {};
        let newValue = Number(e.target.value);
        let oldValue = this.state[e.target.name];

        change[e.target.name] = !isNaN(newValue) ? newValue : oldValue;
        this.setState(change)
    }

    render() {
        return (
            <div className="controls">
                <hr />
                <h2>Controls</h2>
                <div className="controlsWrap">
                    <div className="controlWrap">
                        <div>Runs</div>
                        <div><input type="input" name="runs" value={this.state.runs}
                                    onChange={this.handleChange.bind(this)}  /></div>
                    </div>
                    <div className="controlWrap">
                        <div>Speed</div>
                        <div><input type="input" name="speed" value={this.state.speed}
                                    onChange={this.handleChange.bind(this)} /> %</div>
                    </div>
                    <div className="controlWrap">
                        <div />
                        <div><input type="button" name="run" value="Run!" onClick={() => this.executeRun()} /></div>
                    </div>
                </div>
            </div>
        );
    }
}

class Round extends React.Component {
    render() {
        const data = this.props.data;
        const switchWin = data.switchWinPercent;
        const noSwitchWin = data.noSwitchWinPercent;
        const switchPadRight = (switchWin)/2;
        const switchPadLeft = (100 - switchWin)/2;
        const noSwitchPadRight = (noSwitchWin)/2;
        const noSwitchPadLeft = (100 - noSwitchWin)/2;

        return (
            <li className="round">
                <div className="switch" style={{paddingLeft:switchPadLeft+'%', paddingRight:switchPadRight+'%'}}>
                    <div className={ data.winner === 1 ? 'winner' : null }>
                        <div className="wins">{switchWin}%</div>
                        switch
                        <div className="loses">{100 - switchWin}%</div>
                    </div>
                </div>
                <div className="noSwitch" style={{paddingLeft:noSwitchPadLeft+'%', paddingRight:noSwitchPadRight+'%'}}>
                    <div className={ data.winner === 2 ? 'winner' : null }>
                        <div className="wins">{noSwitchWin}%</div>
                        no switch
                        <div className="loses">{100 - noSwitchWin}%</div>
                    </div>
                </div>
            </li>
        );
    }
}

class Results extends React.Component {
    render() {
        const rounds = this.props.rounds.map((data, index) => {
            return (
                <Round
                    key={index}
                    data={data}
                />
            );
        });

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
                        {rounds}
                    </ul>

                </div>
            </div>
        );
    }
}

class MontyHallProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRun: 0,
            doors: [
                {
                    'arrow': false,
                    'car' : false
                },
                {
                    'arrow': false,
                    'car' : false
                },
                {
                    'arrow': false,
                    'car' : false
                }
            ],
            rounds : [
                {
                    'runLength': 100,
                    'switchWinPercent': 45,
                    'noSwitchWinPercent':35,
                    'winner': 0
                },
                {
                    'runLength': 100,
                    'switchWinPercent': 35,
                    'noSwitchWinPercent':45,
                    'winner': 0
                }
            ]
        };
    }

    async run(runs, speed)
    {
        console.log('run!');
        for (let i = 0; i < runs; i++) {

            // Rest
            this.state.doors[0].car = false;
            this.state.doors[1].car = false;
            this.state.doors[2].car = false;
            this.state.doors[0].arrow = false;
            this.state.doors[1].arrow = false;
            this.state.doors[2].arrow = false;

            // Randomly assign one door with a car
            let c = getRandomInt(0, 2);
            console.log(c);
            this.state.doors[c].car = true;
            await speedGovernor(speed);

            // Randomly choose door, moving arrow into position
            let a = getRandomInt(0, 2);
            this.state.doors[a].arrow = true;
            await speedGovernor(speed);

            // Randomly remove a goat, if it is not chosen

            await speedGovernor(speed);

            // Switch door for switch run

            await speedGovernor(speed);
            // Record win or lose.
        }
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

                <Doors
                    doors={this.state.doors}
                />

                <Controls
                    run={(runs, speed) => this.run(runs, speed)}
                />

                <Results
                    rounds={this.state.rounds}
                />

            </div>

        );
    }
}

ReactDOM.render(
    <MontyHallProblem />,
    document.getElementById('root')
);

function speedGovernor(speed)
{
    var ms = 1000 * (speed/100);
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}