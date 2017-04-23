---
layout: page
title: "InfluxDB"
description: "Record events in InfluxDB."
date: 2017-03-13 22:09
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

You will still need to create a database named `home_assistant` via InfluxDB's web interface or command line. For instructions how to create a database check the [InfluxDB documentation](https://docs.influxdata.com/influxdb/latest/introduction/getting_started/#creating-a-database) relevant to the version you have installed.

Configuration variables:

- **host** (*Optional*): IP address of your database host, e.g. 192.168.1.10. Defaults to `localhost`.
- **port** (*Optional*): Port to use. Defaults to 8086.
- **username** (*Optional*): The username of the database user. The user needs read/write privileges on the database.
- **password** (*Optional*): The password for the database user account.
- **database** (*Optional*): Name of the database to use. Defaults to `home_assistant`. The database must already exist.
- **ssl** (*Optional*): Use https instead of http to connect. Defaults to false.
- **verify_ssl** (*Optional*): Verify SSL certificate for https request. Defaults to false.
- **max_retries** (*Optional*): Allow the component to retry if there was a network error when transmitting data
- **default_measurement** (*Optional*): Measurement name to use when an entity doesn't have a unit. Defaults to entity id.
- **override_measurement** (*Optional*): Measurement name to use instead of unit or default measurement. This will store all data points in a single measurement.
- **component_config**, **component_config_domain**, **component_config_glob** (*Optional*): These attributes contains component-specific override values. See [Customizing devices and services](https://home-assistant.io/getting-started/customizing-devices/) for format.
  - **override_measurement** (*Optional*): Measurement name to use for this component, takes precedence over the global 'override_measurement' and component-specific 'unit_of_measurement' attribute.
- **exclude** (*Optional*): Configure which components should be excluded from recording to InfluxDB.
  - **entities** (*Optional*): The list of entity ids to be excluded from recording to InfluxDB.
  - **domains** (*Optional*): The list of domains to be excluded from recording to InfluxDB.
- **include** (*Optional*): Configure which components should be included in recordings to InfluxDB. If set, all other entities will not be recorded to InfluxDB. Values set by the **blacklist** option will prevail.
  - **entities** (*Optional*): The list of entity ids to be included from recordings to InfluxDB.
  - **domains** (*Optional*): The list of domains to be included from recordings to InfluxDB.
- **tags** (*Optional*): Tags to mark the data.
- **tags_attributes** (*Optional*): The list of attribute names which should be reported as tags and not fields to InfluxDB. For example, if set to `friendly_name`, it will be possible to group by entities' friendly names as well, in addition to their ids.

## {% linkable_title Data migration %}

Starting with 0.36 the InfluxDB component has a new schema to store values in the InfluxDB databases.

- There will no longer be any tags/fields named `time`.
- All numeric fields (int/float/bool) will be stored as float inside InfluxDB database.
- All string fields corresponding to state attributes will be renamed as `FIELDNAME_str`, where `FIELDNAME` is the state attribute, to avoid type conflicts.
- All string fields corresponding to a state will be renamed as `state` (former value).
- Fields named `value` will always be stored as float.
- Fields named `state` will always be stored as string.

### {% linkable_title Migration script %}

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


## {% linkable_title Data import script %}

If you want to import all the recorded data from your recorder database you can use the data import script.
It will read all your state_change events from the database and add them as data-points to the InfluxDB.
You can specify the source database either by pointing the `--config` option to the config directory which includes the default SQLite database or by giving a sqlalchemy connection URI with `--uri`.
The writing to InfluxDB is done in batches that can be changed with `--step`.

You can control, which data is imported by using the command line options `--exclude_entities` and `--exclude_domains`.
Both get a comma separated list of either entity-ids or domain names that are excluded from the import.

To test what gets imported you can use the `--simulate` option, which disables the actual write to the InfluxDB instance.
This only writes the statistics how much points would be imported from which entity.

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
  max_retries: 3
  default_measurement: state
  exclude:
    entities:
       - entity.id1
       - entity.id2
    domains:
       - automation
  include:
    entities:
       - entity.id3
       - entity.id4
  tags:
    instance: prod
    source: hass
```
