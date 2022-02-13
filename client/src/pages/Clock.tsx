import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Clock() {
    const date = new Date();
    return (
        <ClockSection>
            {date.toLocaleTimeString()}
      </ClockSection>
    );
}
const ClockSection = styled.div`
color: black;
height: 50vh;
font-size: 20vh;
text-align: center;
background-color: red;
`
export default Clock;