--1
SELECT * FROM DsTwo_Ads_revenue1
UNION ALL
SELECT * FROM DsTwo_Ads_revenue2;

--2
SELECT * FROM DsTwo_Ads_revenue1
UNION
SELECT * FROM DsTwo_Ads_revenue2;

--3
SELECT * FROM DsTwo_Ads_revenue1
INTERSECT
SELECT * FROM DsTwo_Ads_revenue2;

--4
SELECT Date, [Ad Type] 
FROM DsTwo_Ads_revenue1 
WHERE InventoryType = 'Format3'
EXCEPT
SELECT Date, [Ad Type] 
FROM DsTwo_Ads_revenue2;

--5
SELECT Date, [Ad Type] 
FROM DsTwo_Ads_revenue1 
WHERE InventoryType = 'Format3' 
  AND [Campaign ID] IN (SELECT [Campaign ID] FROM DsTwo_Ads_revenue2);

--6
SELECT * FROM DsTwo_Ads_revenue1 
WHERE Matched_Queries > 800000
UNION
SELECT * FROM DsTwo_Ads_revenue2 
WHERE Matched_Queries > 800000;