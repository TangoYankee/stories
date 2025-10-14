#! /bin/sh

tippecanoe \
    -z7 \
    --projection=EPSG:4326 \
    -o \
    data/2024_aug_22_subway_ada.pmtiles \
    -l subway_station data/subway_ada.json \
    --force

tippecanoe \
    -z13 \
    --projection=EPSG:4326 \
    -o data/city-council-district-fill.pmtiles \
    -l fill data/city_council_district_fill.geojson \
    --force

tippecanoe \
    -z13 \
    --projection=EPSG:4326 \
    -o data/city-council-district-label.pmtiles \
    -l label data/city_council_district_label.geojson \
    --force

tile-join \
    -o data/city-council-district.pmtiles \
    data/city-council-district-fill.pmtiles \
    data/city-council-district-label.pmtiles \
    --force
