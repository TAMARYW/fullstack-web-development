--1
SELECT * FROM DsOne_orders doo
SELECT AVG(days_to_ship) AS avg_days
FROM DsOne_orders
WHERE category = 'Office Supplies' AND YEAR(ship_date) = '2019';

--2
SELECT AVG(CAST(LEN(product_name) AS FLOAT)) AS avg_name_length
FROM DsOne_orders
WHERE order_weekday = 'Monday';

--3
SELECT TOP 1 state, city, SUM(sales) AS sum_sales
FROM DsOne_orders
GROUP BY state, city
ORDER BY sum_sales DESC;

----4
SELECT DISTINCT 
    state, 
    city,
    COUNT(customer_id) OVER (PARTITION BY city) AS cust_count_with_c_in_city
FROM DsOne_orders
WHERE customer_name LIKE '%C%' 
  AND state = (
      SELECT TOP 1 state
      FROM DsOne_orders
      WHERE customer_name LIKE '%C%'
      GROUP BY state
      ORDER BY COUNT(customer_id) DESC
  );
