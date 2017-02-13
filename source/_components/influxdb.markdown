---
layout: page
title: "InfluxDB"
description: "Record events in InfluxDB."
date: 2015-12-06 13:08
sidebar: true
comments: false
sharing: true
footer: true
logo: influxdb.png
ha_category: History
ha_release: 0.9
---

The `influxdb` component makes it possible to transfer all state changes to an external [InfluxDB](https://influxdb.com/) database. For more details, [see the blog post on InfluxDB](/blog/2015/12/07/influxdb-and-grafana/).

## {% linkable_title Configuration %}

The default InfluxDB configuration doesn't enforce authentication. If you have installed InfluxDB on the same host where Home Assistant is running and haven't made any configuration changes, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
influxdb:
```

You will still need to create a database named `home_assistant` via InfluxDB's web interface or command line. For instructions how to create a database check the [InfluxDB documentation](https://docs.influxdata.com/influxdb/v1.0/introduction/getting_started/#creating-a-database) relevant to the version you have installed.

Configuration variables:

- **host** (*Optional*): IP address of your database host, eg. 192.168.1.10. Defaults to `localhost`.
- **port** (*Optional*): Port to use. Defaults to 8086.
- **username** (*Optional*): The username of the database user.
- **password** (*Optional*): The password for the database user account.
- **database** (*Optional*): Name of the database to use. Defaults to `home_assistant`. The database must already exist.
- **ssl** (*Optional*): Use https instead of http to connect. Defaults to false.
- **verify_ssl** (*Optional*): Verify SSL certificate for https request. Defaults to false.
- **default_measurement** (*Optional*): Measurement name to use when an entity doesn't have a unit. Defaults to entity id.
- **override_measurement** (*Optional*): Measurement name to use instead of unit or default measurement. This will store all data points in the singel same measurement.
- **blacklist** (*Optional*): List of entities not logged to InfluxDB.
- **whitelist** (*Optional*): List of the entities (only) that will be logged to InfluxDB. If not set, all entities will be logged. Values set by the **blacklist** option will prevail.
- **tags** (*Optional*): Tags to mark the data.

## {% linkable_title Data migration %}

Starting with 0.36 the InfluxDB component has a new schema to store values in the InfluxDB databases.

- There will not be any tags/fields named time anymore.
- All numeric fields (int/float/bool) will be stored as float inside InfluxDB database.
- All string fields corresponding to state attributes will be renamed as `FIELDNAME_str`, where `FIELDNAME` is the state attribute, to avoid type conflicts.
- All string fields corresponding to a state will be renamed as state (former value).
- Fields named value will always be stored as float.
- Fields named state will always be stored as string.

### {% linkable_title Migration script %}

If you need to migrate your database, you may require to run the `influxdb_migrator` script. Run the script after upgrade to 0.36 but before first regular start of `hass` version 0.36.

These are the steps the script will perform:
1. Create a new database (called `DBNAME__old`) to store old data.
2. Copy data from `DBNAME` database to `DBNAME__old` database.
3. Empty `DBNAME` database (using `drop` then `create`). `DBNAME` database is now considered as the new database.
4. For each measurement of `DBNAME__old` database:
  1. Read all points from the current measuremnt (by group of `1000` points by default) and convert them.
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
- You should be able to omit username and password, if InfluxDB authentication is disabled, which it is by default.
- The step option defaults to `1000`.


## {% linkable_title Examples %}


### {% linkable_title Full configuration %}

```yaml
influxdb:
  host: 192.168.1.190
  port: 20000
  database: DB_TO_STORE_EVENTS
  username: MY_USERNAME
  password: MY_PASSWORD
  ssl: true
  verify_ssl: true
  default_measurement: state
  blacklist:
     - entity.id1
     - entity.id2
  whitelist:
     - entity.id3
     - entity.id4
  tags:
    instance: prod
    source: hass
```
