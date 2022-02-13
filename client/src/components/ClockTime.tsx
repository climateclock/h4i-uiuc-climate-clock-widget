import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ClockTime() {
    useEffect(() => {
        ClockTime();
    }, []);
    const getTime = () => {
        axios.get(`https://api.climateclock.world/v1/clock`)
        .then((response) => {
            const time = response.data.modules.carbon_deadline_1.timestamp;
        })
    }
}
const ClockSection = styled.div`
color: black;
height: 50vh;
font-size: 20vh;
text-align: center;
background-color: red;
`
export default ClockTime;