--a
SELECT * 
FROM ['Olympic'] 
WHERE Age = 18;

--b
SELECT * 
FROM ['Olympic'] 
WHERE Weight > 50;

--c
SELECT * 
FROM ['Olympic'] 
WHERE Games LIKE '%Summer%' 
ORDER BY Age;

--d
SELECT * 
FROM ['Olympic'] 
WHERE Sex = 'F' AND Team = 'Mexico' 
ORDER BY Year;

--e
SELECT name, abilities 
FROM ['Pokemon'] 
WHERE abilities LIKE '%Solar Power%';

--f
SELECT * 
FROM ['Pokemon'] 
WHERE female_rate > 0.2 
ORDER BY name DESC;

--g
SELECT name, primary_color, speed 
FROM ['Pokemon'] 
WHERE (primary_color = 'green' OR primary_color = 'red') 
  AND name LIKE 'C%' 
ORDER BY speed;

--h
SELECT name, shape, height, weight 
FROM ['Pokemon'] 
WHERE shape = 'wings' 
  AND height > 10 
ORDER BY weight;


