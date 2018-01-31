---
layout: page
title: "influxdb_migrator"
description: "Script to convert an old-structure Influx database to a new one."
release_date: 2017-02-23 11:00:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /components/influxdb/#data-import-script
---

Script to convert an old-structure Influx database to a new one.

Example to run the script:

```bash
$ hass --script influxdb_migrator -H IP_INFLUXDB_HOST \
    -u INFLUXDB_USERNAME -p INFLUXDB_PASSWORD \
    --dbname INFLUXDB_DB_NAME
```
Script arguments:

```
optional arguments:
  -h, --help            show this help message and exit
  -d dbname, --dbname dbname
                        InfluxDB database name
  -H host, --host host  InfluxDB host address
  -P port, --port port  InfluxDB host port
  -u username, --username username
                        InfluxDB username
  -p password, --password password
                        InfluxDB password
  -s step, --step step  How many points to migrate at the same time
  -o override_measurement, --override-measurement override_measurement
                        Store all your points in the same measurement
  -D, --delete          Delete old database
```

