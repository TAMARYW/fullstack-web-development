CREATE TABLE Customers (
    Customer_id INT PRIMARY KEY,
    Customer_name VARCHAR(100),
    Customer_address VARCHAR(255),
    Birth_date DATE
);

INSERT INTO Customers (Customer_id, Customer_name, Customer_address, Birth_date)
VALUES 
(1, 'John Doe', '123 Main St', '1990-05-15'),
(2, 'Jane Smith', '456 Oak Ave', '1985-10-22');

ALTER TABLE Customers
DROP COLUMN Customer_address;

DROP TABLE Customers;

CREATE TABLE Summer_Athletes AS
SELECT *
FROM Athletes
WHERE Season = 'Summer';

ALTER TABLE Summer_Athletes
ADD athlete_city VARCHAR(100);

UPDATE Summer_Athletes
SET athlete_city = 'Unknown City'
WHERE NOC = 'ISL' OR Team = 'Iceland';

UPDATE Summer_Athletes
SET athlete_city = 'Springfield'
WHERE NOC = 'USA' OR Team = 'United States';

DELETE FROM Summer_Athletes
WHERE Height < 1.70;