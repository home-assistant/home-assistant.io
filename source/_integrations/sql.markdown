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
  - '@dgomes'
  - '@gjohansson-ST'
ha_domain: sql
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `sql` sensor platform enables you to use values from an [SQL](https://en.wikipedia.org/wiki/SQL) database supported by the [sqlalchemy](https://www.sqlalchemy.org) library, to populate a sensor state (and attributes).
This can be used to present statistics about Home Assistant sensors if used with the `recorder` integration database. It can also be used with an external data source.

{% include integrations/config_flow.md %}

## Information

See [supported engines](/integrations/recorder/#custom-database-engines) for which you can connect with this integration.

The SQL integration will connect to the default SQLite if "Database URL" has not been specified. If you use a different database recorder (eg MariaDB or others), you will have to specify the "Database URL" manually during integration setup.

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

Use `state` as column for value.

### Previous state of an entity

Based on previous example with temperature, the query to get the former state is :
```sql
SELECT * FROM (SELECT * FROM states WHERE entity_id = 'sensor.temperature_in' ORDER BY state_id DESC LIMIT 2) two_entity ORDER BY state_id ASC LIMIT 1;
```
Use `state` as column for value.

### Database size

#### Postgres

```sql
SELECT (pg_database_size('dsmrreader')/1024/1024) as db_size;
```
Use `db_size` as column for value.

#### MariaDB/MySQL

Change `table_schema="hass"` to the name that you use as the database name, to ensure that your sensor will work properly.

```sql
SELECT table_schema "database", Round(Sum(data_length + index_length) / 1024, 1) "value" FROM information_schema.tables WHERE table_schema="hass" GROUP BY table_schema;
```
Use `value` as column for value.

#### SQLite

If you are using the `recorder` integration then you don't need to specify the location of the database. For all other cases, add `sqlite:////path/to/database.db` as Database URL.

```sql
SELECT ROUND(page_count * page_size / 1024 / 1024, 1) as size FROM pragma_page_count(), pragma_page_size();
```
Use `size` as column for value.

#### MS SQL

Use the same Database URL as for the `recorder` integration. Change `DB_NAME` to the name that you use as the database name, to ensure that your sensor will work properly. Be sure `username` has enough rights to access the sys tables.

Example Database URL: `"mssql+pyodbc://username:password@SERVER_IP:1433/DB_NAME?charset=utf8&driver=FreeTDS"`

```sql
SELECT TOP 1 SUM(m.size) * 8 / 1024 as size FROM sys.master_files m INNER JOIN sys.databases d ON d.database_id=m.database_id WHERE d.name='DB_NAME';
```
Use `size` as column for value.
