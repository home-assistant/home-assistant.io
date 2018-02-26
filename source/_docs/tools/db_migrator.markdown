---
layout: page
title: "db_migrator"
description: "Script to migrate data in an InfluxDB database"
release_date: 2017-02-23 11:00:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /components/influxdb/#data-migration
---

<p class='note warning'>
This script was only use for 0.36 release cycle!
</p>

Starting with 0.36 the [InfluxDB](omponents/influxdb/) component has a new schema to store values in the InfluxDB databases.

- There will no longer be any tags/fields named `time`.
- All numeric fields (int/float/bool) will be stored as float inside InfluxDB database.
- All string fields corresponding to state attributes will be renamed as `FIELDNAME_str`, where `FIELDNAME` is the state attribute, to avoid type conflicts.
- All string fields corresponding to a state will be renamed as `state` (former value).
- Fields named `value` will always be stored as float.
- Fields named `state` will always be stored as string.

## {% linkable_title Migration script %}

If you need to migrate your database, you may require to run the `influxdb_migrator` script. Run the script after upgrade to 0.36 but before the first regular start of `hass` version 0.36.

These are the steps the script will perform:

1. Create a new database (called `DBNAME__old`) to store old data.
2. Copy data from `DBNAME` database to `DBNAME__old` database.
3. Empty `DBNAME` database (using `drop` then `create`). `DBNAME` database is now considered as the new database.
4. For each measurement of `DBNAME__old` database:
  1. Read all points from the current measurement (in groups of 1000 points by default) and convert them.
  2. Send group of points to `DBNAME` database.
5. Delete the `DBNAME__old` database if needed.

Example to run the script:

```bash
$ hass --script influxdb_migrator \
    -H IP_INFLUXDB_HOST -u INFLUXDB_USERNAME -p INFLUXDB_PASSWORD \
    -d INFLUXDB_DB_NAME
```
Script arguments:

```
required arguments:
  -d dbname, --dbname dbname  InfluxDB database name

optional arguments:
  -h, --help            show this help message and exit
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

- If you run the script with only the `-h` option, you will get a help printout with a short explanation of the different options.
- The host option defaults to `'127.0.0.1'`.
- The port option defaults to `8086`.
- You should be able to omit username and password if InfluxDB authentication is disabled, which it is by default.
- The step option defaults to `1000`.

