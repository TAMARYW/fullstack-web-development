SELECT * FROM ['Olympic'];
--1
-- Aggregate
SELECT sex, AVG(height) AS avg_height
FROM ['Olympic']
GROUP BY sex;

-- Analytic
SELECT DISTINCT sex, AVG(height) OVER (PARTITION BY sex) AS avg_height
FROM ['Olympic'];

--2
-- Aggregate 
SELECT a.sex, AVG(a.height) AS avg_by_sex, t.avg_overall
FROM ['Olympic'] a
CROSS JOIN (SELECT AVG(height) AS avg_overall FROM ['Olympic']) t
GROUP BY a.sex, t.avg_overall;

-- Analytic
SELECT DISTINCT sex,
       AVG(height) OVER (PARTITION BY sex) AS avg_by_sex,
       AVG(height) OVER ()                 AS avg_overall
FROM ['Olympic'];

--3
-- Aggregate
SELECT noc, COUNT(DISTINCT id) AS players
FROM ['Olympic']
GROUP BY noc;

-- Analytic
SELECT DISTINCT noc,
       SUM(CASE WHEN rn = 1 THEN 1 ELSE 0 END) OVER (PARTITION BY noc) AS players
FROM (
    SELECT noc, id,
           ROW_NUMBER() OVER (PARTITION BY noc, id ORDER BY (SELECT NULL)) AS rn
    FROM ['Olympic']
) t;

--4
-- Aggregate
SELECT noc, MIN(year) AS first_year
FROM ['Olympic']
GROUP BY noc
HAVING MIN(year) > 2000;

-- Analytic
SELECT noc, first_year
FROM (SELECT DISTINCT noc, MIN(year) OVER (PARTITION BY noc) AS first_year
      FROM ['Olympic']) t
WHERE first_year > 2000;

--5
-- Aggregate
SELECT team, COUNT(*) AS gold_cnt,
       (SELECT COUNT(*) FROM ['Olympic'] WHERE medal = 'Gold') AS total_gold
FROM ['Olympic']
WHERE medal = 'Gold'
GROUP BY team;

-- Analytic
SELECT DISTINCT team,
       COUNT(*) OVER (PARTITION BY team) AS gold_cnt,
       COUNT(*) OVER () AS total_gold
FROM ['Olympic']
WHERE medal = 'Gold';

--6
SELECT ID,
COUNT (*) OVER (PARTITION BY ID) AS gold_per_id,
COUNT(*) OVER() AS total_gold
FROM ['Olympic']
WHERE medal='Gold';