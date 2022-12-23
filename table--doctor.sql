--- create script for doctor
CREATE TABLE doctor (
    id nvarchar(5) PRIMARY KEY,
    doctor_name nvarchar(10) NOT NULL,
    district_id int,
    doctor_address_line_1 nvarchar(1000) NOT NULL,
    doctor_address_line_2 nvarchar(1000) NOT NULL
);

INSERT INTO doctor (id, doctor_name, district_id, doctor_address_line_1, doctor_address_line_2) VALUES 
('M2159', 'KWOK KWAN MAN', 11, 'Unit 4, Floor 5, Block F', 'Boom Building'),
('M2160', 'SHUM CHI KIN', 4, 'Unit 4, Floor 6, Block C', 'Secret Giant'),
('M2161', 'Lam Tsz To', 5, 'Unit 5, Floor 4, Block A', 'Good Hope Building'),
('M2162', 'Wan Ting Yuk', 5, 'Unit 2, Floor 3, Block F', 'Lost Pine Road'),
('M2163', 'Lam Chi Lan', 5, 'Unit 1, Floor 8, Block C', 'Longevity Building');