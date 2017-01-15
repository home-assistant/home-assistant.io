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
- **blacklist** (*Optional*): List of entities not logged to InfluxDB.
- **whitelist** (*Optional*): List of the entities (only) that will be logged to InfluxDB. If not set, all entities will be logged. Values set by the **blacklist** option will prevail.
- **tags** (*Optional*): Tags to mark the data.


Starting with 0.36 the InfluxDB component has a new schema to store values in the InfluxDB databases.

- There will not be any tags/fields named time anymore.
- All numeric fields (int/float/bool) will be stored as float inside InfluxDB database.
- All string fields corresponding to state attributes will be renamed as `FIELDNAME_str`, where `FIELDNAME` is the state attribute, to avoid type conflicts.
- All string fields corresponding to a state will be renamed as state (former value).
- Fields named value will always be stored as float.
- Fields named state will always be stored as string.

If you need to migrate your database, you may require to run the `influxdb_migrator` script.

```bash
$ hass --script influxdb_migrator \
    -H IP_INFLUXDB_HOST -u INFLUXDB_USERNAME -p INFLUXDB_PASSWORD \
    -o test_series -d INFLUXDB_DB_NAME
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
