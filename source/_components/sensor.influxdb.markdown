---
layout: page
title: "InfluxDB Sensor"
description: "Instructions how to integrate InfluxDB sensors within Home Assistant."
date: 2016-10-26 23:15
sidebar: true
comments: false
sharing: true
footer: true
logo: influxdb.png
ha_category: Sensor
ha_release: 0.32
---

The `InfluxDB` sensor allows you to use values from an InfluxDB database to populate a sensor state.

To configure this sensor, you need to define the sensor connection variables and a list of queries. A sensor will be created for each query.

Configuration variables for the server:

- **host** (*Optional*): IP address of your database host, eg. 192.168.1.10. Defaults to `localhost`.
- **port** (*Optional*): Port to use. Defaults to 8086.
- **username** (*Optional*): The username of the database user.
- **password** (*Optional*): The password for the database user account.
- **ssl** (*Optional*): Use https instead of http to connect. Defaults to false.
- **verify_ssl** (*Optional*): Verify SSL certificate for https request. Defaults to false.
- **queries** (*Required*): List of queries

Configuration variables for the queries:
- **name** (*Required*): The name of the sensor,
- **unit_of_measurement** (*Required*): Defines the units of measurement of the sensor,
- **measurement** (*Required*):  Defines the measurement name in InfluxDB (the from clause of the query),
- **where** (*Required*): Defines the data selection clause (the where clause of the query),
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the payload.
- **database** (*Optional*): Name of the database to use. Defaults to `home_assistant`,
- **group_function** (*Optional*): The group function to be used, default to `mean`
- **field** (*Optional*): The field name to select, default to value.

## {% linkable_title Examples %}
### {% linkable_title Minimal configuration %}
The example configuration below will create a request to influx db to the default database (`home_assistant`) to get the mean value of `foo` in measurement `°C`
 
```yaml
sensor:
  - platform: influxdb
    queries:
      - name: mean value of foo
        unit_of_measurement: °C
        where: '"name" = ''foo'''
        measurement: '"°C"'
```

### {% linkable_title Full configuration %}
The example configuration entry bellow create two request to influx db, one to the database db1, the other to db2 :

- `select last(value) as value from "°C" where "name" = "foo"`
- `select min(tmp) as value from "%" where "entity_id" = ''salon'' and time > now() - 1h`

```yaml
sensor:
  platform: influxdb
  host: localhost
  username: home-assistant
  password: password
  queries:
    - name: last value of foo
      unit_of_measurement: °C
      value_template: '{{ value | round(1) }}'
      group_function: last
      where: '"name" = ''foo'''
      measurement: '"°C"'
      field: value
      database: db1
    -  name: Min for last hour
      unit_of_measurement: '%'
      value_template: '{{ value | round(1) }}'
      group_function: min
      where: '"entity_id" = ''salon'' and time > now() - 1h'
      measurement: '"%"'
      field: tmp
      database: db2
```