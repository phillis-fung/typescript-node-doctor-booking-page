import React from "react";
import styled from "styled-components"
import Button from './button';
import Timeslot from './timeslot'
import {postBooking} from "../utils/request";

interface popupModalInterface {
    patientName: string,
    patientId: string,
    showPopup: boolean;
    onPopupDismiss?: Function;
    onClickTimeslot?: Function;
    doctorTitle:string,
    doctorId: string;
    bookingDate: string;
    startBookingHour:number;
    startBookingMin:number;
    endBookingHour:number;
    endBookingMin:number;
}

const PopupModalBg = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
`;

const PopupModalContent = styled.div`
    position: fixed;
    top: 50%;
    left:0;
    right:0;
    transform: translateY(-50%);
    display:flex;
    flex-direction:column;
    align-item:center;
    background-color:#f7f7f8;
    margin:1vh;
    padding:5vh;
    border-radium:16px;
    letter-spacing:0.1px;
    color:#333d47;

    @media only screen and (min-width:768px){
        top: 30%;
        margin:5vh;
    }

    @media only screen and (min-width:1200px){
        top: 5%;
        margin:40vh;
    }
`;

const PopupTitle = styled.span`
    font-size:18px;
    line-height: 28px;
    font-weight: 700;
    text-align: center;
`;

const PopupDescription = styled.span`
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    font-weight: 400;
`;

const ErrorMsg = styled.span`
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    font-weight: 400;
    color: red;
`;

const TimeslotRow = styled.div`
    margin-top: 1vh;
    margin-bottom: 2vh
`;


const PopupButtonRow = styled.div`
    margin-top: 1vh;
    @media only screen and (min-width:768px){
        width: 50%;
        margin-left: 25%;
        margin-right: 25%;
    }
`;


const PopupModal: React.FC<popupModalInterface> = ({patientName, patientId, showPopup, onPopupDismiss, doctorTitle, doctorId, bookingDate, startBookingHour, startBookingMin, endBookingHour, endBookingMin}: popupModalInterface) => { 
    const defaultErrorMessage = "Please choose on your favorable timeslot";
    const [selectedTimeslot, setSelectedTimeslot] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState("");
    const [showError, setShowError] = React.useState(false);
    const [errorMsg, setErrorMessage] = React.useState(defaultErrorMessage);
    const [createBooking, setCreateBooking] = React.useState(false);
    const [disableButton, setDisableButton] = React.useState(false);

    var avaliableBookingTimeslot = [];
    var startBookingMinStr = startBookingMin < 10? startBookingMin+"0" : startBookingMin;
    var skipLastHour = startBookingMin > endBookingMin;
    
    const CtaBtnClick = () => {
        console.log('clicked');
        setSelectedDate("")
        setSelectedTimeslot("")
        setShowError(false);
        setCreateBooking(false);
        onPopupDismiss && onPopupDismiss();
    }

    const timeslotClick = (timeslot:string, bookingDate:string) => {
        console.log('clicked:'+timeslot+bookingDate)
        setSelectedDate(bookingDate)
        setSelectedTimeslot(timeslot)
        setShowError(false);
    }

    React.useEffect(() => {
        if(!showError && createBooking){
            const fetchDoctorList = async () => {
                setCreateBooking(false);
                setDisableButton(true);

                await postBooking(patientId, Number(selectedTimeslot.replace(":", ".")), doctorId, selectedDate).then(
                    (response) => {
                        if(response.status === 200){
                            alert("Confirmed booking on "+selectedDate+" "+selectedTimeslot);
                            CtaBtnClick();
                        }
                        if(response.status === 500){
                            alert("SQLite is not supported in this online demo, please download the source code and try full function in local environment, thanks you");
                            CtaBtnClick();
                        }
                    }
                ).catch( 
                    error => {
                        setShowError(true)
                        setErrorMessage(error.response.data)
                    }
                );

                setDisableButton(false);
            };
            fetchDoctorList();
        }
    }, [createBooking, showError]);
    
    const confirmBtnClick = () => {
        if(selectedDate === "" || selectedTimeslot === ""){
            setShowError(true);
        }else{
            setCreateBooking(true);

        }
    }
    
    for(var i = startBookingHour; i < endBookingHour - (skipLastHour? 1: 0); i++){
        avaliableBookingTimeslot.push(i+":"+startBookingMinStr);
    }

    var bookingTimeslots = avaliableBookingTimeslot.map(function(timeslot){
        return <Timeslot onClickTimeslot={timeslotClick} openDate={bookingDate} openHour={timeslot}></Timeslot>
    })
    
    if(showPopup){
        return(
            <>
            <PopupModalBg/>
                <PopupModalContent>
                    <PopupTitle>Create booking</PopupTitle>
                    <PopupDescription>Doctor: {doctorTitle}</PopupDescription>
                    <PopupDescription>Click on your favorable timeslot</PopupDescription>
                    <TimeslotRow>{bookingTimeslots}</TimeslotRow>
                    <PopupDescription>Booking date: {selectedDate}</PopupDescription>
                    <PopupDescription>Selected timeslot: {selectedTimeslot}</PopupDescription>
                    <ErrorMsg>{showError? errorMsg : ""}</ErrorMsg>
                    <PopupButtonRow>
                        <Button width="45%" display="inline-block" color="#fff" backgroundColor="#ff408e" disabled={disableButton} onClick={confirmBtnClick}>CONFIRM</Button>
                        <Button width="45%" display="inline-block" color="#ABABAB" onClick={CtaBtnClick}>CANCEL</Button>
                    </PopupButtonRow>
                    
                </PopupModalContent>
            </>
        )
    }else{
        return <></>;
    }
};

export default PopupModal;