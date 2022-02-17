import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Clock from '../pages/Clock';

export default function ClockTime() {
    
}

// function ClockTime() {
//     useEffect(() => {
//         ClockTime();
//     }, []);
//     const getTime = () => {
//         axios.get(`https://api.climateclock.world/v1/clock`)
//         .then((response) => {
//             const time = response.data.modules.carbon_deadline_1.timestamp;
//         })
//         .catch(error => console.error(`Error: ${error}`));
//     }
// }

// export default ClockTime;