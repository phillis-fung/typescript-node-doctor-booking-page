import { MouseEventHandler } from "react";
import styled from "styled-components"

const TimeslotCircleWrapper = styled.button`
    width: 80px;
    height: 80px;
    border-radius: 25%;
    color: #2a2e42;
    text-align: center;
    background-color: #f7f7f8;
    font-size: 12px;
    display: inline-block;
    margin: 5px;
    border: 2px solid;
`;

const OpeningDate = styled.span`
    color: black;
    line-height: 15px;
    display: block;
`;

const OpeningHour = styled.span`
    color: blue;
    line-height: 15px;
    display: block
`;

export interface timeslotCircleInterface {
    openDate: string;
    openHour: string;
    onClickTimeslot?: Function;
}



const TimeslotCircle: React.FC<timeslotCircleInterface> = ({openDate, openHour, onClickTimeslot}: timeslotCircleInterface) => {
    const timeslotClick = () => {
        onClickTimeslot && onClickTimeslot(openHour, openDate);
    }

    return (
        <TimeslotCircleWrapper onClick={timeslotClick}>
            <OpeningDate>{openDate}</OpeningDate>
            <OpeningHour>{openHour}</OpeningHour>
        </TimeslotCircleWrapper>
    );
}

export default TimeslotCircle;