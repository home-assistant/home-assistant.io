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
ha_category: Utility
ha_release: 0.63
---

The `sql` sensor platform enables you to use values from an [SQL](https://en.wikipedia.org/wiki/SQL) database supported by the [sqlalchemy](https://www.sqlalchemy.org) library, to populate a sensor state (and attributes).
This can be used to present statistics about Home Assistant sensors if used with the `recorder` component database. It can also be used with an external data source.

## {% linkable_title Configuration %}

To configure this sensor, you need to define the sensor connection variables and a list of queries to your `configuration.yaml` file. A sensor will be created for each query:

To enable it, add the following lines to your `configuration.yaml`:

{% raw %}
```yaml
# Example configuration.yaml
sensor:
  - platform: sql
    queries:
      - name: Sun state
        query: "SELECT * FROM states WHERE entity_id = 'sun.sun' ORDER BY state_id DESC LIMIT 1;"
        column: 'state'
```
{% endraw %}

{% configuration %}
db_url:
  description: The URL which points to your database. See [supported engines](/components/recorder/#custom-database-engines).
  required: false
  default: "Defaults to the default recorder `db_url` (not the current `db_url` of recorder)."
  type: string
queries:
  description: List of your queries.
  required: true
  type: map
  keys:
    name:
      description: The name of the sensor.
      required: true
      type: string
    query:
      description: An SQL QUERY string, should return 1 result at most.
      required: true
      type: string
    column:
      description: The field name to select.
      required: true
      type: string
    unit_of_measurement:
      description: Defines the units of measurement of the sensor, if any.
      required: false
      type: string
    value_template:
      description: Defines a template to extract a value from the payload.
      required: false
      type: template
{% endconfiguration %}

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this sensor.

### {% linkable_title Current state of an entity %}

This example shows the previously *recorded* state of the sensor `sensor.temperature_in`.

```yaml
sensor:
  - platform: random
    name: Temperature in
    unit_of_measurement: '°C'
```

The query will look like this: 

```sql
SELECT * FROM states WHERE entity_id = 'sensor.temperature_in' ORDER BY state_id DESC LIMIT 1;
```

{% raw %}
```yaml
# Example configuration.yaml
sensor:
  - platform: sql
    queries:
      - name: Temperature in
        query: "SELECT * FROM states WHERE entity_id = 'sensor.temperature_in' ORDER BY state_id DESC LIMIT 1;"
        column: 'state'
```
{% endraw %}


Note that the SQL sensor state corresponds to the last row of the SQL result set.

### {% linkable_title Previous state of an entity %}

This example only works with *binary_sensors*:

```sql
SELECT * FROM states WHERE entity_id = 'binary_sensor.xyz789' GROUP BY state ORDER BY last_changed DESC LIMIT 1;
```

### {% linkable_title Database size %}

#### {% linkable_title Database size in Postgres %}

{% raw %}
```yaml
sensor:
  - platform: sql
    db_url: postgresql://user:password@host/dbname
    queries:
      - name: DB size
        query: "SELECT (pg_database_size('dsmrreader')/1024/1024) as db_size;"
        column: "db_size"
        unit_of_measurement: MB 
```
{% endraw %}

#### {% linkable_title MariaDB/MySQL %}

{% raw %}
```yaml
sensor:
  - platform: sql
    db_url: mysql://user:password@localhost/hass
    queries:
      - name: DB size
        query: 'SELECT table_schema "database", Round(Sum(data_length + index_length) / 1024, 1) "value" FROM information_schema.tables WHERE table_schema="hass" GROUP BY table_schema;'
        column: 'value'
        unit_of_measurement: kB
```
{% endraw %}
