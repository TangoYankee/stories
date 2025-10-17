#! /bin/sh

tippecanoe \
    -B4 \
    -z7 \
    --projection=EPSG:4326 \
    -o \
    data/ada-subway-stations.pmtiles \
    -l fill data/subway_ada_fill.geojson \
    --force

tippecanoe \
    -z13 \
    --projection=EPSG:4326 \
    -o data/city-council-district-fill.pmtiles \
    -l fill data/city_council_district_fill.geojson \
    --force

tippecanoe \
    -B4 \
    -z13 \
    --projection=EPSG:4326 \
    -o data/city-council-district-label.pmtiles \
    -l label data/city_council_district_label.geojson \
    --force

tile-join \
    -o data/city-council-districts.pmtiles \
    data/city-council-district-fill.pmtiles \
    data/city-council-district-label.pmtiles \
    --force
