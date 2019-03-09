---
layout: page
title: "InfluxDB Sensor"
description: "Instructions on how to integrate InfluxDB sensors within Home Assistant."
date: 2016-10-26 23:15
sidebar: true
comments: false
sharing: true
footer: true
logo: influxdb.png
ha_category: Sensor
ha_release: 0.32
ha_iot_class: "depends"
---

The `influxdb` sensor allows you to use values from an [InfluxDB](https://influxdb.com/) database to populate a sensor state. This can be use to present statistic about home_assistant sensors if used with the `influxdb` history component. It can also be used with an external data source.

To configure this sensor, you need to define the sensor connection variables and a list of queries to  your `configuration.yaml` file. A sensor will be created for each query:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: influxdb
    queries:
      - name: mean value of foo
        where: '"name" = ''foo'''
        measurement: '"°C"'
```

{% configuration %}
host:
  description: IP address of your database host, e.g. 192.168.1.10.
  required: false
  default: localhost
  type: string
port:
  description: Port to use. 
  required: false
  default: 8086
  type: string
username:
  description: The username of the database user.
  required: false
  type: string
password:
  description: The password for the database user account.
  required: false
  type: string
ssl:
  description: Use https instead of http to connect. 
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Verify SSL certificate for https request. 
  required: false
  default: false
  type: boolean
queries:
  description: List of queries.
  required: true
  type: list
  keys:
    name:
      description: The name of the sensor.
      required: true
      type: string
    unit_of_measurement:
      description: Defines the units of measurement of the sensor, if any.
      required: false
      type: string
    measurement:
      description: Defines the measurement name in InfluxDB (the FROM clause of the query).
      required: true
      type: string
    where:
      description: Defines the data selection clause (the where clause of the query).
      required: true
      type: string
    value_template:
      description: Defines a [template](/docs/configuration/templating/#processing incoming data) to extract a value from the payload.
      required: false
      type: template
    database:
      description: Name of the database to use.
      required: false
      default: home_assistant
      type: string
    group_function:
      description: The group function to be used.
      required: false
      default: mean
      type: string
    field:
      description: The field name to select.
      required: true
      type: string
      default: value
{% endconfiguration %}


## {% linkable_title Examples %}

### {% linkable_title Full configuration %}

The example configuration entry below create two request to your local InfluxDB instance, one to the database `db1`, the other to `db2`:

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
      value_template: '{% raw %}{{ value | round(1) }}{% endraw %}'
      group_function: last
      where: '"name" = ''foo'''
      measurement: '"°C"'
      field: value
      database: db1
    -  name: Min for last hour
      unit_of_measurement: '%'
      value_template: '{% raw %}{{ value | round(1) }}{% endraw %}'
      group_function: min
      where: '"entity_id" = ''salon'' and time > now() - 1h'
      measurement: '"%"'
      field: tmp
      database: db2
```
