const PORT = process.env.PORT || 3001;

const path = require('path');
const express = require('express');
const service = require('./services/sample');

const app = express();

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/doctors", (req, res) => {
  var doctors = service.getDoctorList().data;
  var result = []
  doctors.map(function(doctor){
    var info = {};
    var openingHours = service.getDoctorInfo(doctor.id).data
    info.doctor_id = doctor.id;
    info.doctor_district = doctor.district_name;
    info.name = doctor.doctor_name;
    info.address_line1 = doctor.doctor_address_line_1;
    info.address_line2 = doctor.doctor_address_line_2;
    info.openingHours = openingHours;
    result.push(info);
  })
  res.status(result.length > 0 ? 200 : 400)
    .json(result);
});

// Handle GET requests to /api route
app.get("/doctor/:id", (req, res) => {
  var doctor_opening_hours = service.getDoctorInfo(req.params.id);
  res.status(doctor_opening_hours.success? 200 : 400)
    .json(doctor_opening_hours);
});

// Handle POST requests to /booking route
app.post("/booking/", (req, res) => {
  // var errors=[]
  // if (!req.body.password){
  //     errors.push("No password specified");
  // }
  // if (!req.body.email){
  //     errors.push("No email specified");
  // }
  // if (errors.length){
  //     res.status(400).json({"error":errors.join(",")});
  //     return;
  // }
console.log(req.body);

  var data = {
      patientId: req.body.patientId,
      startHour: req.body.startHour,
      doctorId : req.body.doctorId,
      date: req.body.date
  };

  // var sql ='INSERT INTO booking (doctorId, patientId, startHour, date) VALUES (?,?,?,?)'
  var tableName = "booking"
  var params =[data.doctorId, data.patientId, data.startHour, data.date]
  var dbInsert = service.create(tableName, params);

  res.status(dbInsert.success? 200 : 400)
    .json(dbInsert.message);
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});