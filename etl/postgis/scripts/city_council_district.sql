BEGIN;
DROP TABLE IF EXISTS city_council_district;
CREATE TABLE IF NOT EXISTS city_council_district(
	id char(2) PRIMARY KEY,
	fill geometry(MultiPolygon, 4326),
	label geometry(Point, 4326)
);

INSERT INTO city_council_district (id, fill, label)
SELECT
	LPAD(coundist::text, 2, '0')::char(2),
	wkb_geometry,
	(ST_MaximumInscribedCircle(wkb_geometry)).center
FROM source_city_council_districts;
COMMIT;
