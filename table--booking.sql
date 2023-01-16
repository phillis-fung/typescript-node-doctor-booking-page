CREATE TABLE booking (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id nvarchar(5) NOT NULL,
    patient_id nvarchar not null,
    startHour DECIMAL NOT NULL,
    date nvarchar(10) NOT NULL
);