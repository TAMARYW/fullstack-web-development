select * from DsOne_returns;

--1
SELECT category ,COUNT(DISTINCT order_id) AS number_of_orders
FROM DsOne_orders 
GROUP BY category;

--2
SELECT order_month,AVG(days_to_ship) AS avg_days_to_ship 
FROM DsOne_orders 
GROUP BY order_month
ORDER BY avg_days_to_ship DESC;

--3
SELECT product_name, unit_cost
FROM Dsone_orders
WHERE order_month ='October' AND
unit_cost = (SELECT MAX(unit_cost) FROM DsOne_orders WHERE order_month ='October');

--4
select city,MAX(order_date) AS last_order
FROM DsOne_orders 
WHERE state = 'Illinois' AND YEAR(order_date) = 2019
GROUP BY city
ORDER BY last_order DESC;

--5
SELECT customer_id, COUNT (DISTINCT product_id) AS prod_count
FROM DsOne_orders
WHERE product_name LIKE 'M%' 
GROUP BY customer_id
HAVING COUNT(DISTINCT product_id) >1
ORDER BY prod_count DESC;

--6
SELECT category, MIN(unit_cost) AS min_cost
FROM DsOne_orders
GROUP BY category
HAVING MIN(unit_cost)<1;

--7
SELECT order_month,AVG(sales) AS avg_sales
FROM DsOne_orders 
WHERE state = 'Texas'
GROUP BY order_month
ORDER BY MIN(MONTH(order_date));

--8
SELECT states,COUNT(DISTINCT order_id) AS orders_count
FROM DsOne_returns
GROUP BY states
HAVING COUNT(DISTINCT order_id) >10;

--9
SELECT category,COUNT(DISTINCT order_id) AS orders_count
FROM DsOne_returns
WHERE states = 'Indiana'
GROUP BY category
ORDER BY orders_count DESC;