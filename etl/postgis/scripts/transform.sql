DROP TABLE IF EXISTS
    subway_ada,
    city_council_district;

CREATE TABLE IF NOT EXISTS subway_ada (
    ogc_fid char(3) PRIMARY KEY,
    stop_name text,
    daytime_routes text,
    ada char(1) CHECK (ada IN ('0', '1', '2')),
    fill geography(Point, 4326)
);

INSERT INTO subway_ada (
	ogc_fid,
	stop_name,
	daytime_routes,
	ada,
	fill
)
SELECT
	LPAD(ogc_fid::text, 3, '0'),
	stop_name,
	daytime_routes,
	ada,
	wkb_geometry
FROM source_subway_ada;

CREATE TABLE IF NOT EXISTS city_council_district(
	id char(2) PRIMARY KEY,
	fill geography(MultiPolygon, 4326),
	label geography(Point, 4326)
);

INSERT INTO city_council_district (id, fill, label)
SELECT
	LPAD(coundist::text, 2, '0')::char(2),
	wkb_geometry,
	(ST_MaximumInscribedCircle(wkb_geometry)).center
FROM source_city_council_district;
