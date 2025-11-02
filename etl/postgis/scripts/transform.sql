DROP TABLE IF EXISTS
    subway_ada,
    source_subway_station_combined,
    subway_line,
    city_council_district;

-- Subway stations
CREATE TABLE IF NOT EXISTS source_subway_station_combined (
	gtfs_stop_id text,
    stop_name text,
    daytime_routes text,
	ada_2023_oct_24 char(1) CHECK (ada_2023_oct_24 IN ('0', '1', '2')),
	ada_2024_jan_12 char(1) CHECK (ada_2024_jan_12 IN ('0', '1', '2')),
	ada_2024_apr_17 char(1) CHECK (ada_2024_apr_17 IN ('0', '1', '2')),
	ada_2025_feb_18 char(1) CHECK (ada_2025_feb_18 IN ('0', '1', '2')),
	ada_2025_oct_15 char(1) CHECK (ada_2025_oct_15 IN ('0', '1', '2')),
    fill geography(Point, 4326)
);

INSERT INTO source_subway_station_combined (
	gtfs_stop_id,
	stop_name,
	daytime_routes,
	ada_2023_oct_24,
	ada_2024_jan_12,
	ada_2024_apr_17,
	ada_2025_feb_18,
	ada_2025_oct_15,
	fill
)
SELECT
	source_subway_station_2025_oct_15.gtfs_stop_id,
	source_subway_station_2025_oct_15.stop_name,
	source_subway_station_2025_oct_15.daytime_routes,
	source_subway_station_2023_oct_24.ada,
	source_subway_station_2024_jan_12.ada,
	source_subway_station_2024_apr_17.ada,
	source_subway_station_2025_feb_18.ada,
	source_subway_station_2025_oct_15.ada,
	ST_POINT(
	    source_subway_station_2025_oct_15.gtfs_longitude::decimal,
		source_subway_station_2025_oct_15.gtfs_latitude::decimal
	)::geography as fill
FROM source_subway_station_2025_oct_15
LEFT JOIN source_subway_station_2025_feb_18
	ON source_subway_station_2025_feb_18.gtfs_stop_id = source_subway_station_2025_oct_15.gtfs_stop_id
LEFT JOIN source_subway_station_2024_apr_17
	ON source_subway_station_2024_apr_17.gtfs_stop_id = source_subway_station_2025_oct_15.gtfs_stop_id
LEFT JOIN source_subway_station_2024_jan_12
	ON source_subway_station_2024_jan_12.gtfs_stop_id = source_subway_station_2025_oct_15.gtfs_stop_id
LEFT JOIN source_subway_station_2023_oct_24
	ON source_subway_station_2023_oct_24.gtfs_stop_id = source_subway_station_2025_oct_15.gtfs_stop_id;

CREATE TABLE IF NOT EXISTS subway_ada (
	id smallint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    stop_name text NOT NULL,
    daytime_routes text NOT NULL,
	fully_accessible date,
	partially_accessible date,
	not_accessible date,
    fill geography(Point, 4326) NOT NULL
);

INSERT INTO subway_ada (
	stop_name,
    daytime_routes,
	fully_accessible,
	partially_accessible,
	not_accessible,
    fill
)
SELECT
	stop_name,
	daytime_routes,
	CASE
		WHEN ada_2023_oct_24 = '1' THEN date('2023_oct_24')
		WHEN ada_2024_jan_12 = '1' THEN date('2024_jan_12')
		WHEN ada_2024_apr_17 = '1' THEN date('2024_apr_17')
		WHEN ada_2025_feb_18 = '1' THEN date('2025_feb_18')
		WHEN ada_2025_oct_15 = '1' THEN date('2025_oct_15')
	END,
	CASE
		WHEN ada_2023_oct_24 = '2' THEN date('2023_oct_24')
		WHEN ada_2024_jan_12 = '2' THEN date('2024_jan_12')
		WHEN ada_2024_apr_17 = '2' THEN date('2024_apr_17')
		WHEN ada_2025_feb_18 = '2' THEN date('2025_feb_18')
		WHEN ada_2025_oct_15 = '2' THEN date('2025_oct_15')
	END,
		CASE
		WHEN ada_2023_oct_24 = '0' THEN date('2023_oct_24')
		WHEN ada_2024_jan_12 = '0' THEN date('2024_jan_12')
		WHEN ada_2024_apr_17 = '0' THEN date('2024_apr_17')
		WHEN ada_2025_feb_18 = '0' THEN date('2025_feb_18')
		WHEN ada_2025_oct_15 = '0' THEN date('2025_oct_15')
	END,
	fill
FROM source_subway_station_combined
ORDER BY gtfs_stop_id;

-- Subway lines
CREATE TABLE IF NOT EXISTS subway_line (
	id smallint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	service text,
	fill geography(MultiLineString, 4326)
);

INSERT INTO subway_line(
	service,
	fill
)
SELECT
	service,
	wkb_geometry
FROM source_subway_line
ORDER BY service;

-- City Council Districts
CREATE TABLE IF NOT EXISTS city_council_district(
    id smallint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	district char(2),
	fill geography(MultiPolygon, 4326),
	label geography(Point, 4326)
);

ALTER TABLE source_city_council_district
	ADD COLUMN IF NOT EXISTS wkb_geometry_valid geometry(MultiPolygon, 4326);

UPDATE source_city_council_district
	SET wkb_geometry_valid = ST_MakeValid(wkb_geometry);

INSERT INTO city_council_district (district, fill, label)
SELECT
	LPAD(coundist::text, 2, '0'),
	wkb_geometry_valid,
	(ST_MaximumInscribedCircle(wkb_geometry_valid)).center
FROM source_city_council_district
ORDER BY coundist;
