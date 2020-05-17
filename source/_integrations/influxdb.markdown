---
title: InfluxDB
description: Record events in InfluxDB.
ha_category:
  - History
  - Sensor
ha_release: 0.9
ha_iot_class: Configurable
ha_codeowners:
  - '@fabaff'
ha_domain: influxdb
---

The `influxdb` integration makes it possible to transfer all state changes to an external [InfluxDB](https://influxdb.com/) database. See the [official installation documentation](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) for how to set up an InfluxDB database, or [there is a community add-on](https://community.home-assistant.io/t/community-hass-io-add-on-influxdb/54491) available.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

<div class='note'>

The `influxdb` database integration runs parallel to the Home Assistant database. It does not replace it.

</div>

## Configuration

The default InfluxDB configuration doesn't enforce authentication. If you have installed InfluxDB on the same host where Home Assistant is running and haven't made any configuration changes, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
influxdb:
```

You will still need to create a database named `home_assistant` via InfluxDB's command line interface. For instructions on how to create a database check the [InfluxDB documentation](https://docs.influxdata.com/influxdb/latest/introduction/getting_started/#creating-a-database) relevant to the version you have installed.

{% configuration %}
host:
  type: string
  description: IP address of your database host, e.g., 192.168.1.10
  required: false
  default: localhost
port:
  type: integer
  description: Port to use
  required: false
  default: 8086
username:
  type: string
  description: The username of the database user. The user needs read/write privileges on the database
  required: false
password:
  type: string
  description: The password for the database user account.
  required: false
database:
  type: string
  description: Name of the database to use. The database must already exist.
  required: false
  default: home_assistant
ssl:
  type: boolean
  description: Use HTTPS instead of HTTP to connect.
  required: false
  default: false
verify_ssl:
  type: boolean
  description: Verify SSL certificate for HTTPS request.
  required: false
  default: true
path:
  type: string
  description: Path to use if your InfuxDB is running behind an reverse proxy.
  required: false
max_retries:
  type: integer
  description: Set this to allow the integration to retry if there was a network error when transmitting data.
  required: false
  default: 0
default_measurement:
  type: string
  description: Measurement name to use when an entity doesn't have a unit. 
  required: false
  default: uses the entity id of the entity
override_measurement:
  type: string
  description:  Measurement name to use instead of unit or default measurement. This will store all data points in a single measurement.
  required: false
exclude:
  type: list
  description:  Configure which integrations should be excluded from recording to InfluxDB.
  required: false
  keys:
    entities:
      type: list
      description:  The list of entity ids to be excluded from recording to InfluxDB.
      required: false    
    domains:
      type: list
      description:  The list of domains to be excluded from recording to InfluxDB.
      required: false
include:
  type: list
  description:  Configure which integrations should be included in recordings to InfluxDB. If set, all other entities will not be recorded to InfluxDB. Values set by the **exclude** lists will take precedence.
  required: false
  keys:
    entities:
      type: [string, list]
      description:  The list of entity ids to be included in recording to InfluxDB.
      required: false    
    domains:
      type: [string, list]
      description:  The list of domains to be included in recording to InfluxDB.
      required: false
tags:
  type: [string, list]
  description: Tags to mark the data.
  default: 0
tags_attributes:
  type: [string, list]
  description: The list of attribute names which should be reported as tags and not fields to InfluxDB. For example, if set to `friendly_name`, it will be possible to group by entities' friendly names as well, in addition to their ids.
  required: false
  default: 0
component_config:
  type: string
  required: false
  description: This attribute contains component-specific override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description:  Measurement name to use instead of unit or default measurement. This will store all data points in a single measurement.
      required: false
component_config_domain:
  type: string
  required: false
  description: This attribute contains domain-specific integration override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description:  Measurement name to use instead of unit or default measurement. This will store all data points in a single measurement.
      required: false
component_config_glob: 
  type: string
  required: false
  description: This attribute contains component-specific override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description:  Measurement name to use instead of unit or default measurement. This will store all data points in a single measurement.
      required: false
{% endconfiguration %}

## Examples

### Full configuration

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

## Sensor

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
  description: IP address of your database host, e.g.,  192.168.1.10.
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
  description: Use HTTPS instead of HTTP to connect.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Verify SSL certificate for HTTP request.
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
      description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
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

## Examples

### Full configuration

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
    - name: Min for last hour
      unit_of_measurement: '%'
      value_template: '{% raw %}{{ value | round(1) }}{% endraw %}'
      group_function: min
      where: '"entity_id" = ''salon'' and time > now() - 1h'
      measurement: '"%"'
      field: tmp
      database: db2
```
