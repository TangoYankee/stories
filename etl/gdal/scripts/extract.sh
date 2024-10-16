#! /bin/sh

ogr2ogr -f GeoJSON data/subway_ada.json PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" -sql "SELECT * FROM subway"
