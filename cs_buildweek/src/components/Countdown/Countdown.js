import React from 'react';
import CountdownTimer from 'react-component-countdown-timer'


const Countdown = props => {
    return (
        <CountdownTimer count={props.count} />
    );
};



export default Countdown;