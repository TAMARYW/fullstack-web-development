--Exercise - Scalar Functions

--“Disney_plus_titles” table:

--1
SELECT title, LEN(title) AS title_length 
FROM disney_plus_titles;

--2
SELECT UPPER(director) 
FROM disney_plus_titles
WHERE type = 'Movie';

--3
SELECT * 
FROM disney_plus_titles
WHERE title LIKE '%e%' 
  AND release_year BETWEEN 2017 AND 2019;

--4
SELECT CONCAT(director, ' ', [cast]) 
FROM disney_plus_titles 
WHERE type = 'Movie' 
  AND release_year BETWEEN 2015 AND 2020 
ORDER BY release_year;


--5
SELECT product_name, ROUND(sales, 1) 
FROM DsOne_orders;

--6
SELECT sub_category, product_name, ROUND(unit_cost, -1) 
FROM DsOne_orders
WHERE sub_category LIKE '%s%';

--7
SELECT * 
FROM DsOne_orders
WHERE product_name LIKE '%e%' 
  AND LEN(product_name) > 7 
ORDER BY LEN(product_name) DESC;