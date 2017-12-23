import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Door(props) {
    return (
        <div className={ props.data.inactive ? 'doorWrap fade' : 'doorWrap'}>
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
        const switchWinPercent = data.switchWins/data.runLength;
        const noSwitchWinPercent = data.noSwitchWins/data.runLength;

        const switchPadRight = (switchWinPercent)/2;
        const switchPadLeft = (100 - switchWinPercent)/2;
        const noSwitchPadRight = (noSwitchWinPercent)/2;
        const noSwitchPadLeft = (100 - noSwitchWinPercent)/2;

        return (
            <li className="round">
                <div className="switch" style={{paddingLeft:switchPadLeft+'%', paddingRight:switchPadRight+'%'}}>
                    <div className={ data.winner === 1 ? 'winner' : null }>
                        <div className="wins">{switchWinPercent}%</div>
                        switch
                        <div className="loses">{100 - switchWinPercent}%</div>
                    </div>
                </div>
                <div className="noSwitch" style={{paddingLeft:noSwitchPadLeft+'%', paddingRight:noSwitchPadRight+'%'}}>
                    <div className={ data.winner === 2 ? 'winner' : null }>
                        <div className="wins">{noSwitchWinPercent}%</div>
                        no switch
                        <div className="loses">{100 - noSwitchWinPercent}%</div>
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
            currentRound: 0,
            doors: [
                {
                    'arrow': false,
                    'car' : false,
                    'inactive' : false
                },
                {
                    'arrow': false,
                    'car' : false,
                    'inactive' : false
                },
                {
                    'arrow': false,
                    'car' : false,
                    'inactive' : false
                }
            ],
            rounds : [
                /*
                {
                    'runLength': 100,
                    'switchWins': 45,
                    'noSwitchWins':35,
                    'winner': 0
                },
                */
            ]
        };
    }

    async run(runs, speed)
    {
        // Start a new round
        let rounds = this.state.rounds;
        rounds.push({
            'runLength': runs,
            'switchWins': 0,
            'noSwitchWins':0,
            'winner': 0
        });
        this.setState({rounds});

        let withSwitch = 1;
        for (let h = 0; h < 2; h++) {

            for (let i = 0; i < runs; i++) {
                // Reset
                this.setState({
                    doors: [
                        {
                            'arrow': false,
                            'car': false,
                            'inactive': false
                        },
                        {
                            'arrow': false,
                            'car': false,
                            'inactive': false
                        },
                        {
                            'arrow': false,
                            'car': false,
                            'inactive': false
                        }
                    ]
                });
                let doors = this.state.doors;

                // Randomly assign one door with a car
                let doorWithCar = getRandomInt(0, 3);
                doors[doorWithCar].car = true;
                this.setState({doors});
                await speedGovernor(speed);

                // Randomly choose door, moving arrow into position
                let doorChosen = getRandomInt(0, 3);
                doors[doorChosen].arrow = true;
                this.setState({doors});
                await speedGovernor(speed);

                // Randomly remove a goat
                let goats = this.goatSet(doors, doorChosen)
                let goatChoice = getRandomInt(0, goats.length);
                let goatDoorRemoved = goats[goatChoice];
                doors[goatDoorRemoved].inactive = true;
                this.setState({doors});
                await speedGovernor(speed);

                // Switch door for switch run
                if (withSwitch) {
                    let firstDoorChosen = doorChosen;
                    doors[firstDoorChosen].arrow = false;

                    for (let i = 0; i < 3; i++) {
                        if (doors[i].inactive) continue;
                        if (firstDoorChosen === i) continue;
                        doors[i].arrow = true;
                        doorChosen = i;
                    }
                    this.setState({doors});
                    await speedGovernor(speed);
                }

                // Record wins.
                this.setState((prevState, props) => {
                    let rounds = prevState.rounds;
                    let currentRound = prevState.currentRound;
                    let round = rounds[currentRound];
                    let roundType = (withSwitch) ? 'switchWins' : 'noSwitchWins';

                    for (let i = 0; i < 3; i++) {
                        if(doors[i].arrow && doors[i].car) {
                            round[roundType]++;
                        }
                    }

                    return {'rounds' : rounds}
                });
            }

            withSwitch = 0;
        }

        //update the round number
        this.setState((prevState, props) => {
           return {'currentRound':prevState.currentRound + 1}
        });
    }

    // Returns an array of doors that have goats behind them, unless that door was selected
    goatSet(doors, doorChosen)
    {
        let goatDoors = [];
        for (let i = 0; i < 3; i++) {
            if(i === doorChosen) continue;
            if(!doors[i].car) {
                goatDoors.push(i);
            }
        }

        return goatDoors;
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