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

## {% linkable_title Helper scripts %}

- [Helper script `influxdb_import`](/docs/tools/influxdb_import/)
- [Helper script `db_migrator`](/docs/tools/db_migrator/) (only used for [Home Assistant 0.36](/blog/2017/01/14/iss-usps-images-packages/#influxdb-export))

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
