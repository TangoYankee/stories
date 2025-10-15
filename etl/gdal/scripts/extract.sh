#! /bin/sh

ogr2ogr -f GeoJSON data/subway_ada_fill.geojson PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" -sql "SELECT * FROM subway_ada"
ogr2ogr -f GeoJSON data/city_council_district_fill.geojson PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" -sql "SELECT id, fill FROM city_council_district"
ogr2ogr -f GeoJSON data/city_council_district_label.geojson PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" -sql "SELECT id, label FROM city_council_district"
