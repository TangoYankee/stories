#! /bin/sh

ogr2ogr -nln source_subway_ada PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2025_nov_01_nyc_subway_stations.geojson -overwrite
ogr2ogr -nln source_city_council_district PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/source_city_council_districts.geojson -overwrite
