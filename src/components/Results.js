import React from "react";


class Round extends React.Component {
    render() {
        const data = this.props.data;
        const switchWinPercent = Math.floor((data.switchWins/data.runLength) * 100);
        const switchLossPercent = Math.floor((data.switchLoses/data.runLength) * 100);
        const noSwitchWinPercent = Math.floor((data.noSwitchWins/data.runLength) * 100);
        const noSwitchLossPercent = Math.floor((data.noSwitchLoses/data.runLength) * 100);
        const switchPadLeft = 50 - switchWinPercent/2;
        const switchPadRight = 50 - switchLossPercent/2;
        const noSwitchPadLeft = 50 - noSwitchWinPercent/2;
        const noSwitchPadRight = 50 - noSwitchLossPercent/2;

        return (
            <li className="round">
                <div className="switch" style={{paddingLeft:switchPadLeft+'%', paddingRight:switchPadRight+'%'}}>
                    <div className={ data.winner === 1 ? 'winner' : null }>
                        <div className="wins">{switchWinPercent}%</div>
                        <div className={ switchPadLeft + switchPadRight < 90 ? 'label' : ' label hide' }>switch</div>
                        <div className="loses">{switchLossPercent}%</div>
                    </div>
                </div>
                <div className="noSwitch" style={{paddingLeft:noSwitchPadLeft+'%', paddingRight:noSwitchPadRight+'%'}}>
                    <div className={ data.winner === 2 ? 'winner' : null }>
                        <div className="wins">{noSwitchWinPercent}%</div>
                        <div className={ noSwitchPadLeft + noSwitchPadRight < 90 ? 'label' : ' label hide' }>no-switch</div>
                        <div className="loses">{noSwitchLossPercent}%</div>
                    </div>
                </div>
            </li>
        );
    }
}

export default class Results extends React.Component {
    render() {
        const rounds = this.props.rounds.map((data, index) => {
            return (
                <Round
                    key={index}
                    data={data}
                />
            );
        });

        const totalRounds = Object.values(this.props.rounds).reduce((t, n) => t + n.runLength, 0);
        const totalSwitchWins = Object.values(this.props.rounds).reduce((t, n) => t + n.switchWins, 0);
        const totalNoSwitchWins = Object.values(this.props.rounds).reduce((t, n) => t + n.noSwitchWins, 0);

        const avgWinWithSwitch = totalSwitchWins/(totalRounds) * 100;
        const avgWinWithoutSwitch = totalNoSwitchWins/(totalRounds) * 100;

        const showAvgLines = (this.props.rounds.length > 1) ? ' show' : 'hide';

        return (
            <div className="results">
                <hr />
                <div className="titleWins">Wins</div>
                <div className="titleLoses">Loses</div>
                <h2>Results</h2>

                <div className="resultsWrap">
                    <div className={showAvgLines + ' leftAverageLine'} style={{left:(30 - avgWinWithSwitch/2) +'%'}}>
                        win average with switch: <span className="switch">{avgWinWithSwitch}%</span>
                    </div>

                    <div className={showAvgLines + ' rightAverageLine'} style={{left:(50 - avgWinWithoutSwitch/2)+'%'}}>
                        win average without switch: <span className="noSwitch">{avgWinWithoutSwitch}%</span>
                    </div>

                    <ul className="rounds">
                        {rounds}
                    </ul>

                </div>
            </div>
        );
    }
}