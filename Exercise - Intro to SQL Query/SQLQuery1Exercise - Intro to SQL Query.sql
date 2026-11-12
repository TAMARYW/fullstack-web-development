-- ==========================================
-- 1. For the table "pokemon"
-- ==========================================

-- 1.1 Present the table
SELECT * 
FROM pokemon;


-- 1.2 Present column name
SELECT name 
FROM pokemon;


-- 1.3 Present column name and give the column a nickname
SELECT name AS pokemon_name 
FROM pokemon;


-- 1.4 Present only the columns: name, abilities, speed, height, weight
SELECT name, abilities, speed, height, weight 
FROM pokemon;


/* 1.5 What is the data type of each of the columns?
   - name: VARCHAR
   - abilities: VARCHAR
   - speed: INT
   - height: INT
   - weight: INT
*/


-- 1.6 Present the columns you presented in part c, this time without duplicate values
SELECT DISTINCT name AS pokemon_name 
FROM pokemon;

-- ==========================================
-- 2. For the table "disney_plus_titles"
-- ==========================================

-- 2.1 Present the table
SELECT * 
FROM disney_plus_titles;


-- 2.2 Give the table a nickname (Alias)
SELECT * 
FROM disney_plus_titles AS d;


-- 2.3 Present only the columns: show_id, title, type
SELECT show_id, title, type 
FROM disney_plus_titles;


/* 2.4 What is the data type of each of the columns?
   - show_id: VARCHAR / NVARCHAR
   - title: VARCHAR / NVARCHAR
   - type: VARCHAR / NVARCHAR
*/


/* 2.5 What is the primary key in the table?
   - show_id 
*/


-- 2.6 Present the columns you presented in part c, this time without duplicate values
SELECT DISTINCT show_id, title, type 
FROM disney_plus_titles;

