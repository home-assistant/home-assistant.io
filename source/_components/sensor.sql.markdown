---
layout: page
title: "SQL Sensor"
description: "Instructions how to integrate SQL sensors into Home Assistant."
date: 2018-02-03 00:22
sidebar: true
comments: false
sharing: true
footer: true
logo: sql.png
ha_category: Sensor
ha_release: 0.64
---


The `SQL` sensor platform enables you to use values from an [SQL](https://en.wikipedia.org/wiki/SQL) database supported by the [sqlalchemy](https://www.sqlalchemy.org) library, to populate a sensor state (and attributes).
This can be use to present statistic about home_assistant sensors if used with the recorder component database. It can also be used with an external data source.

To configure this sensor, you need to define the sensor connection variables and a list of queries to  your `configuration.yaml` file. A sensor will be created for each query:

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry to monitor hass database size
sensor:
  - platform: sql
    db_url: mysql://user:password@localhost/hass
    queries:
      - name: HASS DB size
        query: 'SELECT table_schema "database", Round(Sum(data_length + index_length) / 1024, 1) "value" FROM information_schema.tables WHERE table_schema="hass" GROUP BY table_schema;'
        column: 'value'
        unit_of_measurement: kB
```

Configuration variables:

- **db_url** (*Required*): The URL which points to your database. See [supported engines](/components/recorder/#custom-database-engines).
- **queries** array (*Required*): List of queries
  - **name** (*Required*): The name of the sensor.
  - **query** (*Required*): An SQL QUERY string, should return 1 result at most.
  - **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.
  - **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
  - **column** (*Optional*): The field name to select. Defaults to value.

