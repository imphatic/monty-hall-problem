import React from "react";

function Door(props) {
    return (
        <div className={ props.data.inactive ? 'doorWrap fade' : 'doorWrap'}>
            <div className="arrowWrap">
                { props.data.arrow ? <div className="arrow" /> : null }
            </div>
            <div className="doorShape">
                <span>{props.index + 1}</span>
                <div className={(props.data.car) ? 'car' : 'goat'}>
                    {(props.data.car) ? 'car' : 'goat'}
                </div>
            </div>
        </div>
    );
}


export default class Doors extends React.Component {
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