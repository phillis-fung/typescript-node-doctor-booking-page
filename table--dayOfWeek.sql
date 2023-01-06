CREATE TABLE dayOfWeek (
    id integer not null check (id between 0 and 6),
    dayOfWeekName nvarchar(1000) NOT NULL
);

INSERT INTO dayOfWeek (id, dayOfWeekName) VALUES 
(0, 'SUN'),
(1, 'MON'),
(2, 'TUE'),
(3, 'WED'),
(4, 'THU'),
(5, 'FRI'),
(6, 'SAT');