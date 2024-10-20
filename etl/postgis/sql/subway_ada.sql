BEGIN;
DROP TABLE IF EXISTS subway;
CREATE TABLE subway AS
    SELECT 
        station_id, 
        stop_name, 
        daytime_routes,
        ada,
        wkb_geometry 
    FROM subway_ada;
COMMIT;