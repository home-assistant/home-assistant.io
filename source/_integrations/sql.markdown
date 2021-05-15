---
title: SQL
description: Instructions how to integrate SQL sensors into Home Assistant.
ha_category:
  - Utility
  - Sensor
ha_release: 0.63
ha_iot_class: Local Polling
ha_codeowners:
  - '@dgomes'
ha_domain: sql
ha_platforms:
  - sensor
---

The `sql` sensor platform enables you to use values from an [SQL](https://en.wikipedia.org/wiki/SQL) database supported by the [sqlalchemy](https://www.sqlalchemy.org) library, to populate a sensor state (and attributes).
This can be used to present statistics about Home Assistant sensors if used with the `recorder` integration database. It can also be used with an external data source.

## Configuration

To configure this sensor, you need to define the sensor connection variables and a list of queries to your `configuration.yaml` file. A sensor will be created for each query:

To enable it, add the following lines to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml
sensor:
  - platform: sql
    queries:
      - name: Sun state
        query: "SELECT * FROM states WHERE entity_id = 'sun.sun' ORDER BY state_id DESC LIMIT 1;"
        column: "state"
```
{% endraw %}

{% configuration %}
db_url:
  description: The URL which points to your database. See [supported engines](/integrations/recorder/#custom-database-engines).
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

There is no explicit configuration required for attributes. The integration will set all additional columns returned by the query as attributes. 

Note that in all cases only the first row returned will be used.

## Examples

In this section, you find some real-life examples of how to use this sensor.

### Current state of an entity

This example shows the previously *recorded* state of the sensor `sensor.temperature_in`.

```yaml
sensor:
  - platform: random
    name: Temperature in
    unit_of_measurement: "°C"
```

The query will look like this:

```sql
SELECT * FROM states WHERE entity_id = 'sensor.temperature_in' ORDER BY state_id DESC LIMIT 1;
```

```yaml
# Example configuration.yaml
sensor:
  - platform: sql
    queries:
      - name: Temperature in
        query: "SELECT * FROM states WHERE entity_id = 'sensor.temperature_in' ORDER BY state_id DESC LIMIT 1;"
        column: "state"
```

Note that the SQL sensor state corresponds to the last row of the SQL result set.

### Previous state of an entity

This example only works with *binary_sensors*:

```sql
SELECT * FROM states WHERE entity_id = 'binary_sensor.xyz789' GROUP BY state ORDER BY last_changed DESC LIMIT 1;
```

### Database size

#### Postgres

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

#### MariaDB/MySQL

Change `table_schema="hass"` to the name that you use as the database name, to ensure that your sensor will work properly.

{% raw %}

```yaml
sensor:
  - platform: sql
    db_url: mysql://user:password@localhost/hass
    queries:
      - name: DB size
        query: 'SELECT table_schema "database", Round(Sum(data_length + index_length) / 1024, 1) "value" FROM information_schema.tables WHERE table_schema="hass" GROUP BY table_schema;'
        column: "value"
        unit_of_measurement: kB
```

{% endraw %}

#### SQLite

If you are using the `recorder` integration then you don't need to specify the location of the database. For all other cases, add `db_url: sqlite:////path/to/database.db`.

{% raw %}

```yaml
sensor:
  - platform: sql
    queries:
      - name: DB Size
        query: 'SELECT ROUND(page_count * page_size / 1024 / 1024, 1) as size FROM pragma_page_count(), pragma_page_size();'
        column: "size"
        unit_of_measurement: "MiB"
```

{% endraw %}

#### MS SQL

Use the same `db_url` as for the `recorder` integration. Change `DB_NAME` to the name that you use as the database name, to ensure that your sensor will work properly. Be sure `username` has enough rights to access the sys tables.

{% raw %}
```yaml
sensor:
  - platform: sql
    db_url: "mssql+pyodbc://username:password@SERVER_IP/DB_NAME?charset=utf8;DRIVER={FreeTDS};Port=1433;"
    queries:
      - name: DB size
        query: "SELECT TOP 1 SUM(m.size) * 8 / 1024 as size FROM sys.master_files m INNER JOIN sys.databases d ON d.database_id=m.database_id WHERE d.name='DB_NAME';"
        column: "size"
        unit_of_measurement: MiB
```
{% endraw %}
