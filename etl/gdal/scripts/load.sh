#! /bin/sh

ogr2ogr -nln subway_ada PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2024_aug_22_nyc_subway_stations.geojson
