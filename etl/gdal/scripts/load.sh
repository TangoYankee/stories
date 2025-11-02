#! /bin/sh

ogr2ogr -nln source_subway_station_2023_oct_24 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2023_oct_24_nyc_subway_stations.csv -overwrite
ogr2ogr -nln source_subway_station_2024_jan_12 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2024_jan_12_nyc_subway_stations.csv -overwrite
ogr2ogr -nln source_subway_station_2024_apr_17 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2024_apr_17_nyc_subway_stations.csv -overwrite
ogr2ogr -nln source_subway_station_2024_jul_02 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2024_jul_02_nyc_subway_stations.csv -overwrite
ogr2ogr -nln source_subway_station_2024_aug_22 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2024_aug_22_nyc_subway_stations.csv -overwrite
ogr2ogr -nln source_subway_station_2025_feb_18 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2025_feb_18_nyc_subway_stations.csv -overwrite
ogr2ogr -nln source_subway_station_2025_apr_15 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2025_apr_15_nyc_subway_stations.csv -overwrite
ogr2ogr -nln source_subway_station_2025_jul_15 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2025_jul_15_nyc_subway_stations.csv -overwrite
ogr2ogr -nln source_subway_station_2025_oct_15 PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/2025_oct_15_nyc_subway_stations.csv -overwrite

ogr2ogr -nln source_subway_line PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/nyc_subway_lines.geojson -overwrite

ogr2ogr -nln source_city_council_district PG:"dbname=$POSTGRES_DB host=etl-postgis-1 user=$POSTGRES_USER port=5432" data/source_city_council_districts.geojson -overwrite
