---
title: SQL
description: Instructions how to integrate SQL sensors into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_release: 0.63
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
  - '@dougiteixeira'
ha_domain: sql
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `sql` sensor {% term integration %} enables you to use values from an [SQL](https://en.wikipedia.org/wiki/SQL) database supported by the [sqlalchemy](https://www.sqlalchemy.org) library, to populate a sensor state (and attributes).
This can be used to present statistics about Home Assistant sensors if used with the `recorder` integration database. It can also be used with an external data source.

**This integration can be configured using both config flow and by YAML.**

{% include integrations/config_flow.md %}

## Configuration by YAML

To configure this sensor, define the sensor connection variables and a list of queries to your {% term "`configuration.yaml`" %} file. A sensor will be created for each query.

To enable it, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

{% raw %}
```yaml
# Example configuration.yaml
sql:
  - name: Sun state
    query: >
      SELECT
        states.state
      FROM
        states
        LEFT JOIN state_attributes ON (
          states.attributes_id = state_attributes.attributes_id
        )
      WHERE
        metadata_id = (
          SELECT
            metadata_id
          FROM
            states_meta
          where
            entity_id = 'sun.sun'
        )
      ORDER BY
        state_id DESC
      LIMIT
        1;
    column: "state"
```
{% endraw %}

{% configuration %}
sql:
  description: Integration.
  required: true
  type: map
  keys:
    db_url:
      description: The URL which points to your database. See [supported engines](/integrations/recorder/#custom-database-engines).
      required: false
      default: "Defaults to the recorder `db_url`."
      type: string
    name:
      description: The name of the sensor.
      required: true
      type: template
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
    unique_id:
      description: Provide a unique id for this sensor.
      required: false
      type: string
    device_class:
      description: "Provide [device class](/integrations/sensor#device-class) for this sensor."
      required: false
      type: string
    state_class:
      description: "Provide [state class](https://developers.home-assistant.io/docs/core/entity/sensor/#available-state-classes) for this sensor."
      required: false
      type: string
    icon:
      description: "Defines a template for the icon of the entity."
      required: false
      type: template
    picture:
      description: "Defines a template for the entity picture of the entity."
      required: false
      type: template
    availability:
      description: "Defines a template if the entity state is available or not."
      required: false
      type: template
{% endconfiguration %}

## Information

See [supported engines](/integrations/recorder/#custom-database-engines) for which you can connect with this integration.

The SQL integration will connect to the Home Assistant Recorder database if "Database URL" has not been specified.

There is no explicit configuration required for attributes. The integration will set all columns returned by the query as attributes.

Note that in all cases only the first row returned will be used.

{% include integrations/using_templates.md %}

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
SELECT
  states.state
FROM
  states
WHERE
  metadata_id = (
    SELECT
      metadata_id
    FROM
      states_meta
    WHERE
      entity_id = 'sensor.temperature_in'
  )
ORDER BY
  state_id DESC
LIMIT
  1;
```

Use `state` as column for value.

### Previous state of an entity

Based on previous example with temperature, the query to get the former state is :
```sql
SELECT
  states.state
FROM
  states
WHERE
  state_id = (
    SELECT
      states.old_state_id
    FROM
      states
    WHERE
      metadata_id = (
        SELECT
          metadata_id
        FROM
          states_meta
        WHERE
          entity_id = 'sensor.temperature_in'
      )
      AND old_state_id IS NOT NULL
    ORDER BY
      last_updated_ts DESC
    LIMIT
      1
  );
```
Use `state` as column for value.

### State of an entity x time ago

If you want to extract the state of an entity from a day, hour, or minute ago, the query is:

```sql
SELECT 
  states.state
FROM 
  states 
  INNER JOIN states_meta ON 
    states.metadata_id = states_meta.metadata_id
WHERE 
  states_meta.entity_id = 'sensor.temperature_in' 
  AND last_updated_ts <= strftime('%s', 'now', '-1 day')
ORDER BY 
  last_updated_ts DESC 
LIMIT
  1;
```

Replace `-1 day` with the target offset, for example, `-1 hour`.
Use `state` as column for value.

Keep in mind that, depending on the update frequency of your sensor and other factors, this may not be a 100% accurate reflection of the actual situation you are measuring. Since your database won’t necessarily have a value saved exactly 24 hours ago, use “>=” or “<=” to get one of the closest values.

#### MariaDB

On MariaDB the following where clause can be used to compare the timestamp:

```sql
...
  AND last_updated_ts <= UNIX_TIMESTAMP(NOW() - INTERVAL 1 DAY)
...
```

Replace `- INTERVAL 1 DAY` with the target offset, for example, `- INTERVAL 1 HOUR`.

### Database size

#### Postgres

```sql
SELECT pg_database_size('dsmrreader')/1024/1024 as db_size;
```
Use `db_size` as column for value.
Replace `dsmrreader` with the correct name of your database.

{% tip %}
The unit of measurement returned by the above query is `MiB`, please configure this correctly.

Set the device class to `Data size` so you can use UI unit conversion.
{% endtip %}

#### MariaDB/MySQL

Change `table_schema="homeassistant"` to the name that you use as the database name, to ensure that your sensor will work properly.

```sql
SELECT table_schema "database", Round(Sum(data_length + index_length) / POWER(1024,2), 1) "value" FROM information_schema.tables WHERE table_schema="homeassistant" GROUP BY table_schema;
```
Use `value` as column for value.

{% tip %}
The unit of measurement returned by the above query is `MiB`, please configure this correctly.

Set the device class to `Data size` so you can use UI unit conversion.
{% endtip %}

#### SQLite

If you are using the `recorder` integration then you don't need to specify the location of the database. For all other cases, add `sqlite:////path/to/database.db` as Database URL.

```sql
SELECT ROUND(page_count * page_size / 1024 / 1024, 1) as size FROM pragma_page_count(), pragma_page_size();
```
Use `size` as column for value.

{% tip %}
The unit of measurement returned by the above query is `MiB`, please configure this correctly.

Set the device class to `Data size` so you can use UI unit conversion.
{% endtip %}

#### MS SQL

Use the same Database URL as for the `recorder` integration. Change `DB_NAME` to the name that you use as the database name, to ensure that your sensor will work properly. Be sure `username` has enough rights to access the sys tables.

Example Database URL: `"mssql+pyodbc://username:password@SERVER_IP:1433/DB_NAME?charset=utf8&driver=FreeTDS"`

{% note %}
Connecting with MSSQL requires "pyodbc" to be installed on your system, which can only be done on systems using the Home Assistant Core installation type to be able to install the necessary dependencies.
  
"pyodbc" has special requirements which need to be pre-installed before installation, see the ["pyodbc" wiki](https://github.com/mkleehammer/pyodbc/wiki/Install) for installation instructions
{% endnote %}

```sql
SELECT TOP 1 SUM(m.size) * 8 / 1024 as size FROM sys.master_files m INNER JOIN sys.databases d ON d.database_id=m.database_id WHERE d.name='DB_NAME';
```
Use `size` as column for value.

{% tip %}
The unit of measurement returned by the above query is `MiB`, please configure this correctly.

Set the device class to `Data size` so you can use UI unit conversion.
{% endtip %}
