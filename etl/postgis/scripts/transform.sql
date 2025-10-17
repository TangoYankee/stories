DROP TABLE IF EXISTS
    subway_ada,
    city_council_district;

CREATE TABLE IF NOT EXISTS subway_ada (
    id smallint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    stop_name text,
    daytime_routes text,
    ada char(1) CHECK (ada IN ('0', '1', '2')),
    fill geography(Point, 4326)
);

INSERT INTO subway_ada (
	stop_name,
	daytime_routes,
	ada,
	fill
)
SELECT
	stop_name,
	daytime_routes,
	ada,
	wkb_geometry
FROM source_subway_ada
ORDER BY ogc_fid;

CREATE TABLE IF NOT EXISTS city_council_district(
    id smallint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	district char(2),
	fill geography(MultiPolygon, 4326),
	label geography(Point, 4326)
);

INSERT INTO city_council_district (district, fill, label)
SELECT
	LPAD(coundist::text, 2, '0'),
	ST_MakeValid(wkb_geometry),
	(ST_MaximumInscribedCircle(wkb_geometry)).center
FROM source_city_council_district
ORDER BY coundist;
