import React from 'react';
import HeaderBar from './components/headerBar';
import Button from './components/button';
import localDoctorlist from './mock-response/get-doctor-list.json';
import DoctorProfile from './components/doctorProfile';
import PopupModal from './components/popupModal';
import {getDoctorList} from './utils/request';

function App() {

  const [showPopup, setShowPopup] = React.useState(false);
  const [doctorId, setDoctorId] = React.useState("");
  const [doctorTitle, setDoctorTitle] = React.useState("")
  const [bookingDate, setBookingDate] = React.useState("");
  const [startBookingHour, setStartBookingHour] = React.useState(0);
  const [startBookingMin, setStartBookingMin] = React.useState(0);
  const [endBookingHour, setEndBookingHour] = React.useState(0);
  const [endBookingMin, setEndBookingMin] = React.useState(0);
  const [doctorList, setDoctorList] = React.useState([]);
  const [patientName, setPatientName] = React.useState("Chan Tai Man");
  const [patientId, setPatientId] = React.useState("P0001");

  const onPopupShow = (
      doctorTitle:string,
      doctorId:string | "", 
      bookingDate:string, 
      startBookingHour:number, 
      startBookingMin:number,
      endBookingHour:number, 
      endBookingMin:number
    ) => {
    document.body.style.overflow = "hidden";
    setDoctorTitle(doctorTitle)
    setDoctorId(doctorId)
    setShowPopup(true)
    setBookingDate(bookingDate)
    setStartBookingHour(startBookingHour)
    setStartBookingMin(startBookingMin)
    setEndBookingHour(endBookingHour)
    setEndBookingMin(endBookingMin)
  }

  const onPopupDismiss = () => {
    document.body.style.overflow = "scroll";
    setShowPopup(false);
  }
 
  React.useEffect(() => {
    const fetchDoctorList = async () => {
       let response = await getDoctorList();
       if(response.data){
        setDoctorList(response.data);
       }
       
    };
    fetchDoctorList();
  }, []);

  //use doctorList -> localDoctorlist for local testing
  var doctors = doctorList.map(function (doctor: { name: string; doctor_id: string; doctor_district: string; address_line1: string; address_line2: string; openingHours: any; }){
    var title = doctor.name + " ("+ doctor.doctor_id + ")";
    var district = doctor.doctor_district;
    var line_1 = doctor.address_line1;
    var line_2 = doctor.address_line2;
    var doctor_opening_hours = doctor.openingHours;

    var openingHours = doctor_opening_hours.map(function (openingHours: { dayOfWeekName: string; startHour: string; endHour: string; isOpen: any; }){
      var openingDay = openingHours.dayOfWeekName;
      var startHour = openingHours.startHour.replace(".", ":");
      var endHour = openingHours.endHour.replace(".", ":");
      var isClosed = !openingHours.isOpen;

      return (
        <>
            <li key={doctor.doctor_id + "_" + openingDay}>{openingDay}:{isClosed? 'CLOSED' : startHour + "-" + endHour} </li> 
        </>
      )
    })

    var today = new Date();

    var bookingDate = [];
    for(var i= 0; i < 3; i++){
      bookingDate.push(new Date().setDate(today.getDate()+i));
    }

    var bookingButtons = bookingDate.map(function (date){
      var day = new Date(date).getDate()
      var month = new Date(date).getMonth() + 1
      var year = new Date(date).getFullYear();
      var dayOfWeek = new Date(date).getDay();
      var dateFormat = [year, (month < 10? '0'+ month.toString() : month), (day < 10? '0'+ day.toString() : day)].join('-');

      var nearlyClosed = false;
      var isClosed = !doctor_opening_hours[dayOfWeek].isOpen;
      var isToday = 
        (new Date(date).getDate() === today.getDate()) 
        && (new Date(date).getMonth() === today.getMonth())
        && (new Date(date).getFullYear() === today.getFullYear()); 

      var startBookingHour = parseInt(doctor_opening_hours[dayOfWeek].startHour.split('.')[0])
      var startBookingMin = parseInt(doctor_opening_hours[dayOfWeek].startHour.split('.')[1])
      var endBookingHour = parseInt(doctor_opening_hours[dayOfWeek].endHour.split('.')[0])
      var endBookingMin = parseInt(doctor_opening_hours[dayOfWeek].endHour.split('.')[1])

      if(!isClosed && isToday){
        var todayBookingPeriodStart = parseInt(doctor_opening_hours[dayOfWeek].startHour);
        var todayBookingPeriodEnd = parseInt(doctor_opening_hours[dayOfWeek].endHour);
        startBookingHour = 
          (today.getHours() < todayBookingPeriodStart)? 
            todayBookingPeriodStart : 
            (today.getMinutes() < startBookingMin? today.getHours() : today.getHours()+1)
        endBookingHour = today.getHours() <= (todayBookingPeriodEnd) ? todayBookingPeriodEnd : today.getHours()+1
        isClosed = startBookingHour > todayBookingPeriodEnd;
        nearlyClosed = startBookingHour === endBookingHour;
      }

    
      return (
        <Button 
          onClick={() => onPopupShow(title, doctor.doctor_id, dateFormat, startBookingHour, startBookingMin, endBookingHour, endBookingMin)}
          disabled={(isClosed || nearlyClosed)? true: false}
        >
          Book for {isToday? "today": dateFormat} {isClosed? '(CLOSED)' : ""} {!isClosed && nearlyClosed? "(Close soon)": ""}
        </Button>
      )
    })

    return (
      <DoctorProfile>
        <div key={doctor.doctor_id} style={{margin: "15px"}}>
            <div className="role-title">Doctor: {title} </div>
            <div className="span-info"> District: {district} </div>
            <div className="span-info"> Address: </div>
            <div className="span-info"> {line_1} </div>
            <div className="span-info"> {line_2} </div>
        </div>
        <div style={{margin: "15px"}}>
          <div className="span-info"> Opening Hours:</div>
          {openingHours}
        </div>
        <div>{bookingButtons}</div>
        
      </DoctorProfile>
    );
  });

  return (
    <div className="doctor-booking-page">
      <HeaderBar title="Doctor Booking Page"></HeaderBar>
      <div style={{margin: '5vh 5vh 0vh 5vh'}}>Hello! {patientName} ({patientId})</div>
      {doctors}  
      <PopupModal 
        patientName={patientName}
        patientId={patientId}
        showPopup={showPopup} 
        bookingDate={bookingDate} 
        startBookingHour={startBookingHour}
        startBookingMin={startBookingMin}
        endBookingHour={endBookingHour}
        endBookingMin={endBookingMin}
        doctorTitle={doctorTitle}
        doctorId={doctorId} 
        onPopupDismiss={onPopupDismiss}
      />
    </div>
    
  );
}

export default App;