“Pokemon” table:
Present all the pokemons with the letter R in their name.
Order all the pokemons by their weight in descending order.
Present the pokemons’ names in lowercase.
Count the number of pokemons that are taller than 70. 

--Pokemon Table.

SELECT * FROM pokemon;

--1

SELECT * FROM pokemon

WHERE name LIKE 'R%';



--2

SELECT * FROM pokemon

ORDER BY weight DESC;



--3

SELECT name, UPPER(name) AS upper_names

FROM pokemon;



--4

SELECT COUNT (name) AS count_of_pokemons

FROM pokemon

WHERE height>70;

