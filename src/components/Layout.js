import React from "react";

import Doors from './Doors';
import Controls from './Controls';
import Results from './Results';

import AnimateHeight from 'react-animate-height';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summaryHeight: null,
            footerSpacerHeight:null,
            executeRun: this.run,
            speed: 95,
            runs: 100,
            currentRound: 0,
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
            ],
            rounds: []
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const height = this.summaryElement.clientHeight;

        this.setState({
            summaryStartHeight:height
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        let scrollPos = window.scrollY;

        if(scrollPos > 30 && this.summaryHeight !== 0)
        {
            this.setState({
                summaryHeight:0,
                footerSpacerHeight:this.state.summaryStartHeight
            });
        } else if(scrollPos === 0) {
            this.setState({
                summaryHeight:this.state.summaryStartHeight,
                footerSpacerHeight:0
            });
        }
    }

    handleControlsChange(e) {
        let change = {};
        let newValue = Number(e.target.value);
        let oldValue = this.state[e.target.name];

        change[e.target.name] = !isNaN(newValue) ? newValue : oldValue;
        this.setState(change)
    }

    handleSliderChange(e)
    {
        this.setState({
            speed:e
        });
    }

    async run() {
        let runs = this.state.runs;

        // Start a new round
        let rounds = this.state.rounds;
        rounds.push({
            'runLength': runs,
            'switchWins': 0,
            'switchLoses' : 0,
            'noSwitchWins': 0,
            'noSwitchLoses' : 0,
            'winner': 0
        });
        this.setState({rounds});

        let withSwitch = 1;
        for (let h = 0; h < 2; h++) {

            for (let i = 0; i < runs; i++) {
                // Reset
                let doors = [
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
                ];
                this.setState({
                    doors: doors
                });

                // Randomly assign one door with a car
                let doorWithCar = getRandomInt(0, 3);
                doors[doorWithCar].car = true;
                this.setState({doors});
                await speedGovernor(this.state.speed);

                // Randomly choose door, moving arrow into position
                let doorChosen = getRandomInt(0, 3);
                doors[doorChosen].arrow = true;
                this.setState({doors});
                await speedGovernor(this.state.speed);

                // Randomly remove a goat
                let goats = this.goatSet(doors, doorChosen)
                let goatChoice = getRandomInt(0, goats.length);
                let goatDoorRemoved = goats[goatChoice];
                doors[goatDoorRemoved].inactive = true;
                this.setState({doors});
                await speedGovernor(this.state.speed);

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
                    await speedGovernor(this.state.speed);
                }

                // Record wins.
                this.setState((prevState, props) => {
                    let rounds = prevState.rounds;
                    let round = rounds[prevState.currentRound];
                    let roundType = (withSwitch) ? 'switch' : 'noSwitch';
                    let win = 0;

                    for (let i = 0; i < 3; i++) {
                        if(doors[i].arrow && doors[i].car) {
                            win = 1;
                        }
                    }

                    if(win) {
                        round[roundType + 'Wins']++;
                    } else {
                        round[roundType + 'Loses']++;
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
                <AnimateHeight
                    duration={ 500 }
                    height={ this.state.summaryHeight }
                >
                    <div className="summary"
                         ref={ (summaryElement) => this.summaryElement = summaryElement}>
                        <p>
                            The Monty Hall Problem first appeared in the "Ask Marilyn" column in Parade Magazine in 1990:
                        </p>
                        <p className="quote">
                            "Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car;
                            behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors,
                            opens another door, say No. 3, which has a goat. He then says to you, 'Do you want to pick door No. 2?'
                            Is it to your advantage to switch your choice?"<br />
                        </p>
                        <p>
                            The answer, perhaps suprisingly, is yes, your chance of winning is increased when you switch from your
                            original choice.  Below you can simulate either switching doors or always sticking with the original choice.
                        </p>
                    </div>
                </AnimateHeight>

                <Doors
                    doors={this.state.doors}
                />

                <Controls
                    run={() => this.run()}
                    handleControlsChange={(e) => this.handleControlsChange(e)}
                    handleSliderChange={(e) => this.handleSliderChange(e)}
                    runs={this.state.runs}
                    speed={this.state.speed}
                />

                <Results
                    rounds={this.state.rounds}
                />
                <AnimateHeight
                    duration={ 500 }
                    height={ this.state.footerSpacerHeight }
                >
                 <div className="footerSpacer">&nbsp;</div>
                </AnimateHeight>
            </div>

        );
    }
}

function speedGovernor(speed)
{
    var ms =  1000 + (1000 * (speed/-100));
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
