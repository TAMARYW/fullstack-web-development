--Ds three

--1
SELECT * 
FROM DsThree_store_customer_ids ids
FULL OUTER JOIN DsThree_store_customer_sales sales 
ON ids.[Client ID] = sales.[Client ID];

--1.a
--There were complete NULL rows that were populated with NULL values ​​after the JOIN.

--1.b
SELECT DISTINCT ids.Country
FROM DsThree_store_customer_ids ids
INNER JOIN DsThree_store_customer_sales sales 
    ON ids.[Client ID] = sales.[Client ID]
WHERE sales.[Product 1] LIKE '%Microw%';

--1.c
SELECT 
    ids.Country,
    COUNT(DISTINCT ids.[Client ID]) AS Microwave_Customers_Count
FROM DsThree_store_customer_ids ids
INNER JOIN DsThree_store_customer_sales sales 
    ON ids.[Client ID] = sales.[Client ID]
WHERE sales.[Product 1] LIKE '%Microw%'
GROUP BY ids.Country;

--2
SELECT COUNT( DISTINCT ids.[client ID]) AS cus_count
FROM DsThree_store_customer_ids ids
INNER JOIN DsThree_store_customer_sales sales
ON ids.[Client ID] = sales.[Client ID]
WHERE sales.[Price] >= 100 AND ids.Country = 'Australia';

--3
SELECT DISTINCT ids.[Client ID],ids.Client
FROM DsThree_store_customer_ids ids
INNER JOIN DsThree_store_customer_sales sales
ON ids.[Client ID] = sales.[Client ID]
WHERE sales.[Product 1] LIKE '%TV%';

--4
SELECT *
FROM DsThree_store_customer_ids ids
LEFT JOIN DsThree_store_customer_contact contact
    ON ids.[Client ID] = contact.[Client ID];

--5
SELECT *
FROM DsThree_store_customer_contact AS contact
CROSS JOIN DsThree_store_customer_sales AS sales;

--Cartesian Product: A CROSS JOIN pairs every single row from the contact table with every row from the sales table.

--No Matching Condition: Without an ON clause, client IDs are not matched, creating mostly unrelated row combinations.

--Total Row Count: The total number of returned rows equals the number of contact rows multiplied by the number of sales rows 
--N×M

--Ds one

--1
SELECT 
r.[order_id]
FROM DsOne_returns AS r
LEFT JOIN DsOne_orders AS o
ON o.[order_id] = r.[order_id]
WHERE o.[order_id] IS NULL;

--2
SELECT DISTINCT
    o.[Order ID],
    o.[Product Name],
    o.[Sub-Category],
    r.[Return Date]
FROM Orders o
INNER JOIN Returns r
    ON o.[Order ID] = r.[Order ID]
WHERE o.[Sub-Category] = 'Phones';

--3
SELECT 
    o.[Order ID],
    o.[Product Name],
    o.Sales,
    r.[Return Date]
FROM Orders o
INNER JOIN Returns r
    ON o.[Order ID] = r.[Order ID]
WHERE MONTH(r.[Return Date]) = 4;

