---
layout: page
title: "influxdb_import"
description: "Script to import data into an InfluxDB database"
release_date: 2017-02-23 11:00:00
sidebar: true
comments: false
sharing: true
footer: true
---

If you want to import all the recorded data from your recorder database you can use the data import script. It will read all your state_change events from the database and add them as data-points to the InfluxDB. You can specify the source database either by pointing the `--config` option to the config directory which includes the default SQLite database or by giving a sqlalchemy connection URI with `--uri`.

The writing to InfluxDB is done in batches that can be changed with `--step`.

You can control, which data is imported by using the command line options `--exclude_entities` and `--exclude_domains`. Both get a comma separated list of either entity-ids or domain names that are excluded from the import.

To test what gets imported you can use the `--simulate` option, which disables the actual write to the InfluxDB instance. This only writes the statistics how much points would be imported from which entity.

Example to run the script:

```bash
$ hass --script influxdb_import --config CONFIG_DIR \
    -H IP_INFLUXDB_HOST -u INFLUXDB_USERNAME -p INFLUXDB_PASSWORD \
    --dbname INFLUXDB_DB_NAME --exclude_domains automation,configurator
```
Script arguments:

```
required arguments:
  -d dbname, --dbname dbname
                        InfluxDB database name

optional arguments:
  -h, --help            show this help message and exit
  -c path_to_config_dir, --config path_to_config_dir
                        Directory that contains the Home Assistant
                        configuration
  --uri URI             Connect to URI and import (if other than default
                        sqlite) eg: mysql://localhost/homeassistant

  -H host, --host host  InfluxDB host address
  -P port, --port port  InfluxDB host port
  -u username, --username username
                        InfluxDB username
  -p password, --password password
                        InfluxDB password
  -s step, --step step  How many points to import at the same time
  -t tags, --tags tags  Comma separated list of tags (key:value) for all
                        points
  -D default_measurement, --default-measurement default_measurement
                        Store all your points in the same measurement
  -o override_measurement, --override-measurement override_measurement
                        Store all your points in the same measurement
  -e exclude_entities, --exclude_entities exclude_entities
                        Comma separated list of excluded entities
  -E exclude_domains, --exclude_domains exclude_domains
                        Comma separated list of excluded domains
  -S, --simulate        Do not write points but simulate preprocessing
                        and print statistics
```


