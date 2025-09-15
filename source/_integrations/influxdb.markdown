---
title: InfluxDB
description: Record events in InfluxDB.
ha_category:
  - History
  - Sensor
ha_release: 0.9
ha_iot_class: Local Push
ha_codeowners:
  - '@mdegat01'
ha_domain: influxdb
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `influxdb` {% term integration %} makes it possible to transfer all state changes to an external [InfluxDB](https://influxdb.com/) database. See the [official installation documentation](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) for how to set up an InfluxDB database.

Additionally, you can now make use of an InfluxDB 2.0 installation with this {% term integration %}. See the [official installation instructions](https://v2.docs.influxdata.com/v2.0/) for how to set up an InfluxDB 2.0 database. Or you can sign up for their [cloud service](https://cloud2.influxdata.com/signup) and connect Home Assistant to that. Note that the configuration is significantly different for a 2.xx installation, the documentation below will note when fields or defaults apply to only a 1.xx installation or a 2.xx installation.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

{% note %}
The `influxdb` database integration runs parallel to the Home Assistant database. It does not replace it.
{% endnote %}

## Configuration

The default InfluxDB configuration doesn't enforce authentication. If you have installed InfluxDB on the same host where Home Assistant is running and haven't made any configuration changes, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
influxdb:
```

You will still need (not for version 2) to create a database named `home_assistant` via InfluxDB's command-line interface. For instructions on how to create a database check the [InfluxDB documentation](https://docs.influxdata.com/influxdb/latest/introduction/getting_started/#creating-a-database) relevant to the version you have installed.

{% configuration %}
api_version:
  type: string
  description: API version to use. Valid values are `1` or `2`.
  default: "1"
ssl:
  type: boolean
  description: Use HTTPS instead of HTTP to connect. 2.xx - Defaults to `true` for 2.xx, false otherwise `false`.
  required: false
  default: false
host:
  type: string
  description: IP address or domain of your database host, e.g., 192.168.1.10. 2.xx - Defaults to 'us-west-2-1.aws.cloud2.influxdata.com' for 2.xx, not 'localhost'.
  required: false
  default: localhost
port:
  type: integer
  description: Port to use. 2.xx - Must specify port for 2.xx, otherwise 8086.
  required: false
  default: 8086
path:
  type: string
  description: Path to use if your InfluxDB is running behind a reverse proxy.
  required: false
username:
  type: string
  description: 1.xx only - The username of the database user. The user needs read/write privileges on the database.
  required: inclusive
password:
  type: string
  description: 1.xx only - The password for the database user account. Needed with `username` configuration variable.
  required: inclusive
database:
  type: string
  description: 1.xx only - Name of the database to use. The database must already exist.
  required: false
  default: home_assistant
verify_ssl:
  type: boolean
  description: Verify SSL certificate for HTTPS request. This can take on boolean values `false` or `true`.
  required: false
  default: true
ssl_ca_cert:
  type: string
  description: Optional path of a CA certificate to be used during SSL verification.
  required: false
  default: None
token:
  type: string
  description: 2.xx only - Auth token with WRITE access to your chosen Organization and Bucket. Needed with `organization` configuration variable.
  required: inclusive
organization:
  type: string
  description: "2.xx only - Organization ID to write to. To obtain this, open the UI of your 2.xx installation, the URL at the top will have it after `/orgs`. For example, in InfluxDB Cloud it looks like this: https://us-west-2-1.aws.cloud2.influxdata.com/orgs/{OrganizationID}. Needed with `token` configuration variable."
  required: inclusive
bucket:
  type: string
  description: 2.xx only - Name of the bucket (not the generated bucket ID) within your Organization to write to.
  required: false
  default: Home Assistant
max_retries:
  type: integer
  description: Set this to allow the integration to retry if there was a network error when transmitting data.
  required: false
  default: 0
precision:
  type: string
  description: Set this to specify the time precision sent to influxdb. Setting a coarser precision allows InfluxDb to compress your data better. If not set, defaults to ns.
  required: false
  default: ns
measurement_attr:
  type: string
  description: "State object attribute(s) to use as measurement name. Possible values: `unit_of_measurement`, `domain__device_class` or `entity_id`."
  required: false
  default: unit_of_measurement
default_measurement:
  type: string
  description: Measurement name to use when the measurement_attr state attribute does not exist, e.g. when an entity doesn't have a unit. 
  required: false
  default: uses the entity id of the entity
override_measurement:
  type: string
  description: Measurement name to use instead of measurement_attr or default measurement. This will store all data points in a single measurement.
  required: false
exclude:
  type: list
  description: Configure which integrations should be excluded from recording to InfluxDB. ([Configure Filter](#configure-filter))
  required: false
  keys:
    entities:
      type: [string, list]
      description: The list of entity ids to be excluded from recording to InfluxDB.
      required: false
    entity_globs:
      type: [string, list]
      description: Exclude all entities matching a listed pattern.
      required: false
    domains:
      type: [string, list]
      description: The list of domains to be excluded from recording to InfluxDB.
      required: false
include:
  type: list
  description: Configure which integrations should be included in recordings to InfluxDB. If set, all other entities will not be recorded to InfluxDB. ([Configure Filter](#configure-filter))
  required: false
  keys:
    entities:
      type: [string, list]
      description: The list of entity ids to be included in recording to InfluxDB.
      required: false
    entity_globs:
      type: [string, list]
      description: Include all entities matching a listed pattern.
      required: false
    domains:
      type: [string, list]
      description: The list of domains to be included in recording to InfluxDB.
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
ignore_attributes:
  type: [string, list]
  description: The list of attribute names to ignore when reporting to InfluxDB. This can be used to filter out attributes that either don't change or don't matter to you in order to reduce the amount of data stored in InfluxDB. Please be aware of the underlying InfluxDB mechanism that converts non-string attributes to strings and adds a `_str` suffix to the attribute name in this case. It means that when you want to ignore, for example, the `icon_str` attribute that shows in your InfluxDB instance, you need to provide `icon` to `ignore_attributes`.
  required: false
component_config:
  type: string
  required: false
  description: This attribute contains integration-specific override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description: Measurement name to use instead of a unit or default measurement. This will store all data points in a single measurement.
      required: false
    ignore_attributes:
      type: [string, list]
      description: The list of attribute names to ignore when reporting to InfluxDB. Will be merged with the default `ignore_attributes` list when processing a state change event for a particular entity.
      required: false
component_config_domain:
  type: string
  required: false
  description: This attribute contains domain-specific integration override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description: Measurement name to use instead of a unit or default measurement. This will store all data points in a single measurement.
      required: false
    ignore_attributes:
      type: [string, list]
      description: The list of attribute names to ignore when reporting to InfluxDB. Will be merged with the default `ignore_attributes` list when processing a state change event for a particular entity.
      required: false
component_config_glob: 
  type: string
  required: false
  description: This attribute contains integration-specific override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description: Measurement name to use instead of unit or default measurement. This will store all data points in a single measurement.
      required: false
    ignore_attributes:
      type: [string, list]
      description: The list of attribute names to ignore when reporting to InfluxDB. Will be merged with the default `ignore_attributes` list when processing a state change event for a particular entity.
      required: false
{% endconfiguration %}

## Configure filter

By default, no entity will be excluded. To limit which entities are being exposed to `InfluxDB`, you can use the `include` and `exclude` parameters.

```yaml
# Example filter to include specified domains and exclude specified entities
influxdb:
  include:
    domains:
      - alarm_control_panel
      - light
    entity_globs:
      - binary_sensor.*_occupancy
  exclude:
    entities:
      - light.kitchen_light
```

{% include common-tasks/filters.md %}

## Examples

### Full configuration for 1.xx installations

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

### Full configuration for 2.xx installations

```yaml
influxdb:
  api_version: 2
  ssl: false
  host: localhost
  port: 9999
  token: GENERATED_AUTH_TOKEN
  organization: RANDOM_16_DIGIT_HEX_ID
  bucket: BUCKET_NAME
  tags:
    source: HA
  tags_attributes:
    - friendly_name
  default_measurement: units
  exclude:
    entities:
      - zone.home
    domains:
      - persistent_notification
      - person
  include:
    domains:
      - sensor
      - binary_sensor
      - sun
    entities:
      - weather.home
```

## Sensor

The `influxdb` sensor allows you to use values from an [InfluxDB](https://influxdb.com/) database to populate a sensor state. This can be used to present statistics as Home Assistant sensors, if used with the `influxdb` history integration. It can also be used with an external data source.

{% important %}

  You must configure the `influxdb` history integration in order to create `influxdb` sensors. If you just want to create sensors for an external InfluxDB database and you don't want Home Assistant to write any data to it you can exclude all entities like this:

```yaml
influxdb:
  exclude:
    entity_globs: "*"
```

{% endimportant %}

### Configuration

To configure this sensor, you need to define the sensor connection variables and a list of queries to your {% term "`configuration.yaml`" %} file. A sensor will be created for each query:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: influxdb
    queries:
      - name: mean value of foo
        where: '"name" = ''foo'''
        measurement: '"°C"'
```

Note that 2.xx installations of InfluxDB only support queries in their Flux language. While this language was available in 1.xx installations, it was not the default and not used in the API so you may not be aware of it. You can learn more about it from their [documentation](https://v2.docs.influxdata.com/v2.0/reference/flux/) or by using the query builder in the UI. 

You will need to construct your queries in this language in sensors for 2.xx installations, it looks like this:

```yaml
# Example configuration.yaml entry
sensor: 
  - platform: influxdb
    api_version: 2
    organization: RANDOM_16_DIGIT_HEX_ID
    token: GENERATED_AUTH_TOKEN
    queries_flux: 
      - group_function: mean
        imports: 
          - strings
        name: "Mean humidity reported from past day"
        query: >
          filter(fn: (r) => r._field == "value" and r.domain == "sensor" and strings.containsStr(v: r.entity_id, substr: "humidity"))
          |> keep(columns: ["_value"])
        range_start: "-1d"
```

{% configuration %}
api_version:
  type: string
  description: API version to use. Valid values are `1` or `2`.
  default: "1"
ssl:
  type: boolean
  description: Use HTTPS instead of HTTP to connect. 2.xx - Defaults to `true` for 2.xx, otherwise `false`.
  required: false
  default: false
host:
  type: string
  description: IP address or domain of your database host, e.g., 192.168.1.10. 2.xx - Defaults to 'us-west-2-1.aws.cloud2.influxdata.com' for 2.xx, not 'localhost'.
  required: false
  default: localhost
port:
  type: integer
  description: Port to use. 2.xx - No default port for 2.xx, otherwise 8086.
  required: false
  default: 8086
path:
  type: string
  description: Path to use if your InfluxDB is running behind a reverse proxy.
  required: false
username:
  type: string
  description: 1.xx only - The username of the database user. The user needs read/write privileges on the database.
  required: inclusive
password:
  type: string
  description: 1.xx only - The password for the database user account. Needed with `username` configuration variable.
  required: inclusive
database:
  type: string
  description: 1.xx only - Name of the database to use. The database must already exist. Sets the default database for sensors, individual sensors can also read from a different database.
  required: false
  default: home_assistant
verify_ssl:
  type: boolean
  description: 1.xx only - Verify SSL certificate for HTTPS request. For 2.xx SSL verification is required, library provides no way to disable it.
  required: false
  default: true
token:
  type: string
  description: 2.xx only - Auth token with READ access to your chosen Organization and Bucket. Needed with `organization` configuration variable.
  required: inclusive
organization:
  type: string
  description: "2.xx only - Organization ID to read from. To obtain this, open the UI of your 2.xx installation, the URL at the top will have it after `/orgs`. For example, in InfluxDB Cloud it looks like this: https://us-west-2-1.aws.cloud2.influxdata.com/orgs/{OrganizationID}. Needed with `token` configuration variable."
  required: inclusive
bucket:
  type: string
  description: 2.xx only - Name of the bucket (not the generated bucket ID) within your Organization to read from. This sets the default bucket for sensors, individual sensors can also read from a different bucket.
  required: false
  default: Home Assistant
queries:
  type: list
  description: 1.xx only - List of sensors to expose in Home Assistant. Each sensor's state is set by configuring an InfluxQL query.
  required: true
  keys:
    name:
      type: string
      description: The name of the sensor.
      required: true
    unique_id:
      type: string
      description: The unique ID for this query. This allows changing the name, icon and entity_id from the web interface.
      required: false
    unit_of_measurement:
      type: string
      description: Defines the units of measurement of the sensor, if any.
      required: false
    measurement:
      type: string
      description: Defines the measurement name in InfluxDB (the FROM clause of the query).
      required: true
    where:
      type: template
      description: Defines the data selection clause (the where clause of the query). This supports [templates](/docs/configuration/templating/#building-templates).
      required: true
    value_template:
      type: template
      description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
      required: false
    database:
      type: string
      description: Name of the database to use.
      required: false
      default: home_assistant
    group_function:
      type: string
      description: The group function to be used.
      required: false
      default: mean
    field:
      type: string
      description: The field name to select.
      required: true
      default: value
queries_flux:
  type: list
  description: 2.xx only - List of sensors to expose in Home Assistant. Each sensor's state is set by configuring a Flux query.
  required: true
  keys:
    name:
      type: string
      description: The name of the sensor.
      required: true
    unique_id:
      type: string
      description: The unique ID for this query. This allows changing the name, icon and entity_id from the web interface.
      required: false
    unit_of_measurement:
      type: string
      description: Defines the units of measurement of the sensor, if any.
      required: false
    range_start:
      type: string
      description: "Duration or time value to start range from. All Flux queries require a `range` filter, one is automatically added to the beginning of your Flux query in the form of `range(start: {range_start}, stop: {range_stop})`."
      required: false
      default: -15m
    range_stop:
      type: string
      description: Duration or time value to stop range at. See `range_start` above for how this is used in query.
      required: false
      default: now()
    query:
      type: template
      description: "One or more flux filters used to get to the data you want. These should limit resultset to one table, or any beyond the first will be ignored. Your query should not begin or end with a pipe (`|>`). This supports [templates](/docs/configuration/templating/#building-templates)."
      required: true
    group_function:
      type: string
      description: "The group function to be used. If provided, this will add a filter to the end of your query like this `{group_function}(column: \"_value\")`. Note that unlike the 1.xx queries, this **does not** default to mean. You can omit if you wish to use your own aggregator, which takes additional/different parameters or want to act on a different column. If omitted, then a filter of `limit(n: 1)` will be added to the end instead to restrict to one result per table."
      required: false
    value_template:
      type: template
      description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload. Note that `value` will be set to the value of the `_value` field in your query output.
      required: false
    bucket:
      type: string
      description: Name of the bucket within your Organization to read from.
      required: false
      default: Home Assistant
    imports:
      type: [string, list]
      description: Libraries to import in order to execute your query. Ex. `strings`, `date`, `experimental/query`, etc.
      required: false
{% endconfiguration %}

## Examples

### Full configuration for 1.xx installations

The example configuration entry below create two request to your local InfluxDB instance, one to the database `db1`, the other to `db2`:

- `select last(value) as value from "°C" where "name" = "foo"`
- `select min(tmp) as value from "%" where "entity_id" = ''salon'' and time > now() - 1h`

{% raw %}

```yaml
sensor:
  - platform: influxdb
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
      - name: Min for last hour
        unit_of_measurement: "%"
        value_template: '{{ value | round(1) }}'
        group_function: min
        where: '"entity_id" = ''salon'' and time > now() - 1h'
        measurement: '"%"'
        field: tmp
        database: db2
```

{% endraw %}

### Full configuration for 2.xx installations

{% raw %}

```yaml
sensor:
  - platform: influxdb
    api_version: 2
    token: GENERATED_AUTH_TOKEN
    organization: RANDOM_16_DIGIT_HEX_ID
    bucket: BUCKET_NAME
    queries_flux:
      - range_start: "-1d"
        name: "How long have I been here"
        query: >
          filter(fn: (r) => r._domain == "person" and r._entity_id == "me" and r._value != "{{ states('person.me') }}")
          |> map(fn: (r) => ({ _value: r._time }))
        value_template: "{{ relative_time(strptime(value, '%Y-%m-%d %H:%M:%S %Z')) }}"
      - range_start: "-1d"
        name: "Cost of my house today across all power sensor"
        query: >
          filter(fn: (r) => r.domain == "sensor" and r._field == "value" and regexp.matchRegexpString(r: /_power$/, v: r.entity_id))
          |> keep(columns: ["_value", "_time"])
          |> sort(columns: ["_time"], desc: false)
          |> integral(unit: 5s, column: "_value")
        imports: regexp
        value_template: "{{ value|float / 24.0 / 1000.0 * states('sensor.current_cost_per_kwh')|float }}"
      - range_start: "-1d"
        bucket: Glances Bucket
        name: "Average CPU temp today"
        query: "filter(fn: (r) => r._field == \"value\" and r.entity_id == \"glances_cpu_temperature\")"
        group_function: mean
```

{% endraw %}

Note that when working with Flux queries, the resultset is broken into tables, you can see how this works in the Data Explorer of the UI. If you are operating on data created by the InfluxDB history integration, this means by default, you will have a table for each entity and each attribute of each entity (other then `unit_of_measurement` and any others you promoted to tags).

This is a lot more tables compared to 1.xx queries, where you essentially had one table per `unit_of_measurement` across all entities. You can still create aggregate metrics across multiple sensors though. As you can see in the example above, a good way to do this is with the [keep](https://v2.docs.influxdata.com/v2.0/reference/flux/stdlib/built-in/transformations/keep/) or [drop](https://v2.docs.influxdata.com/v2.0/reference/flux/stdlib/built-in/transformations/drop/) filters. When you remove key columns Influx merges tables, allowing you to make many tables that share a schema for `_value` into one.

## Querying your data in Influx

### Sensors

For sensors with a unit of measurement defined the unit of measurement is used as the measurement name and entries are tagged with the second part of the `entity_id`. Therefore you need to add a WHERE clause to the query to filter out values. 

For example a query on a `%` battery for `sensor.multi_sensor_battery_level`:

```sql
SELECT * FROM "%" WHERE time > now() - 12h AND "entity_id" = 'multi_sensor_battery_level';
```

Or for temperatures represented in `°C`:

```sql
SELECT * FROM "°C" WHERE time > now() - 1h;
```

### Everything else

Everything else can be queried using the `entity_id` as its measurement name.

```sql
SELECT * FROM "binary_sensor.front_doorbell" WHERE time > now() - 24h;
```

```sql
SELECT "temperature" FROM "climate.kitchen" WHERE time > now() - 24h;
```
