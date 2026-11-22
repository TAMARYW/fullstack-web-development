--1

SELECT SUM(Revenue) AS total_revenue
FROM data_auto_November dan 
WHERE Advertiser = 'Ferrari' 
  AND [Day of Week] = 'Sunday';

--2
SELECT * FROM data_auto_November dan
UNION ALL
SELECT * FROM data_auto_October dao;

SELECT * FROM data_auto_November dan
UNION
SELECT * FROM data_auto_October dao;

--No changes between union or union all.

--3
SELECT * FROM data_auto_November dan
INTERSECT
SELECT * FROM data_auto_October dao;

--give a empty table. the tabels don't have a common rows.

