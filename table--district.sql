--- create script for doctor
CREATE TABLE district (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    district_name nvarchar(1000) NOT NULL
);

INSERT INTO district (district_name) VALUES 
('Islands'),
('Kwai Tsing'),
('North'),
('Sai Kung'),
('Sha Tin'),
('Tai Po'),
('Tsuen Wan'),
('Tuen Mun'),
('Yuen Long'),
('Kowloon City'),
('Kwun Tong'),
('Sham Shui Po'),
('Wong Tai Sin'),
('Yau Tsim Mong'),
('Central and Western'),
('Eastern'),
('Southern'),
('Wan Chai');
