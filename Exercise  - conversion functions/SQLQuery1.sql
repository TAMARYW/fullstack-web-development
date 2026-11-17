--1
SELECT DAY(order_date) FROM DsOne_orders
ORDER BY DAY(order_date);

--2
SELECT MONTH(ship_date) from DsOne_orders where sub_category='Office Supplies';

--3
 SELECT MONTH(order_date) AS order_month, MONTH(ship_date) AS ship_month 
 FROM DsOne_orders 
 WHERE sub_category = 'Phones'
 ORDER BY ship_month;

--4
SELECT DATEDIFF(day,ship_date,order_date) AS diff 
FROM DsOne_orders
ORDER BY diff;

--5
SELECT order_date, DATEADD(year, 2, order_date) AS order_date_plus_2_years 
FROM DsOne_orders;

--6
SELECT CAST(days_to_ship AS CHAR) AS days_to_ship_char 
FROM DsOne_orders 
WHERE MONTH(ship_date) = 12;