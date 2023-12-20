# Vue SQL Dashboard
The purpose of this Dashoboard is to display data received from a local db file with customizable SQL.

On the left side a table can be picked. On this table then different SQL queries gets run which are shown in bar diagrams on the right side.
The SQL queries can be defined per container and the containers can be resized, renamed and moved.

# Picture of the Dashboard
![2023-12-19 23_19_32-](https://github.com/nilhom/vue-sql-dashboard/assets/106468650/4fed6877-0054-4006-905f-d5dbc24a3acd)

Try it out in codesandbox : [![Edit nilhom/vue-sql-dashboard/codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/nilhom/vue-sql-dashboard/codesandbox?embed=1)

# Example Dataset

The example is played songs on radio stations (mostly german) from about 2021 to 2023.

https://www.phind.com/search?cache=gdgv68qpuucwcu3chn3cnjkn

## SQL queries in example

### Most played Artists

```SQL
SELECT artist, COUNT(*) AS entry_count
FROM {{TABLE_NAME}}
GROUP BY artist
ORDER BY entry_count DESC
LIMIT 10;
```

Random Artists

```SQL
SELECT *
FROM (
	SELECT *
	FROM (
		SELECT artist, COUNT(*) AS entry_count
		FROM {{TABLE_NAME}}
		GROUP BY artist
	) AS random_artists
	ORDER BY Random()
	LIMIT 10
)
ORDER BY entry_count DESC;
```

### Most played Songs 

```SQL
SELECT artist || ' - ' || song_name AS combined, COUNT(*) AS entry_count
FROM {{TABLE_NAME}}
GROUP BY combined
ORDER BY entry_count DESC
LIMIT 10;
```

### Random Songs

```SQL
SELECT *
FROM (
	SELECT *
	FROM (
		SELECT artist || ' - ' || song_name AS combined, COUNT(*) AS entry_count
		FROM {{TABLE_NAME}}
		GROUP BY combined
	) AS random_songs
	ORDER BY Random()
	LIMIT 10
)
ORDER BY entry_count DESC;
```
