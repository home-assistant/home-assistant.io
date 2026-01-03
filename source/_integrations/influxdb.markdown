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

The **InfluxDB** {% term integration %} lets you transfer all state changes to an external [InfluxDB](https://influxdata.com/) database. This integration supports:

- [InfluxDB 3 Core](https://docs.influxdata.com/influxdb3/core/) and [InfluxDB 3 Enterprise](https://docs.influxdata.com/influxdb3/enterprise/) – The latest InfluxDB with v1 and v2 write API compatibility. Sensors query using InfluxQL. Use external tools for SQL.
- [InfluxDB 2.x](https://docs.influxdata.com/influxdb/v2/) – Including [InfluxDB Cloud](https://cloud2.influxdata.com/signup). Sensors query using Flux.
- [InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/) – Sensors query using InfluxQL.

The configuration differs between versions. The documentation below notes when fields apply to specific versions.

### InfluxDB 3 (Core and Enterprise)

See how to get started using InfluxDB 3:

- **[InfluxDB 3 Core](https://docs.influxdata.com/influxdb3/core/get-started/)**: Free, open-source, optimized for recent data queries.
- **[InfluxDB 3 Enterprise](https://docs.influxdata.com/influxdb3/enterprise/get-started/)**: Adds compaction for historical queries. Includes a free [At-Home license](https://docs.influxdata.com/influxdb3/enterprise/admin/license/) for non-commercial use.

#### Write API compatibility

InfluxDB 3 Core and Enterprise provide [InfluxDB v1 and v2 write API compatibility](https://docs.influxdata.com/influxdb3/core/write-data/http-api/compatibility-apis/), allowing you to write data using `api_version: 2`.

#### Query API compatibility

InfluxDB 3 supports the [v1 query API](https://docs.influxdata.com/influxdb3/core/query-data/execute-queries/influxdb-v1-api/) (InfluxQL) and [v3 query API](https://docs.influxdata.com/influxdb3/core/query-data/execute-queries/influxdb-v3-api/) (SQL and InfluxQL). The v2 query API (Flux) is not supported.

{% note %}
**Tools for querying:** Query InfluxDB 3 using SQL or InfluxQL with external tools such as [InfluxDB 3 Explorer](https://docs.influxdata.com/influxdb3/explorer/get-started/) or [Grafana](https://docs.influxdata.com/influxdb3/core/visualize-data/grafana/).
{% endnote %}

#### Example configuration for InfluxDB 3

```yaml
influxdb:
  api_version: 2
  ssl: false
  host: 192.168.6.193
  # InfluxDB 3 default (v1/v2 use 8086)
  port: 8181
  token: apiv3_YOUR_DATABASE_TOKEN
  # Required, but not validated
  organization: d1c92e4eef98a5b6
  # Maps to InfluxDB 3 database name
  bucket: gf_ha
  measurement_attr: entity_id
```

Generate tokens using the [`influxdb3` CLI](https://docs.influxdata.com/influxdb3/core/admin/tokens/create/) or [InfluxDB 3 Explorer](https://docs.influxdata.com/influxdb3/explorer/).

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

{% note %}
The `influxdb` database integration runs parallel to the Home Assistant database. It does not replace it.
{% endnote %}

## Configuration

Authentication requirements vary by version:

- **InfluxDB 3**: Authentication optional (enabled by default). Use `api_version: 2` with a `token`. See [example above](#example-configuration-for-influxdb-3).
- **InfluxDB 2.x**: Requires authentication. Use `api_version: 2` with a `token` and `organization`.
- **InfluxDB 1.x**: Authentication optional (disabled by default). If running on the same host with default settings, no configuration is needed.

{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Minimal configuration for InfluxDB 1.x with authentication disabled
influxdb:
```

For InfluxDB 1.x, you must first [create a database](https://docs.influxdata.com/influxdb/v1/introduction/get-started/#creating-a-database) named `home_assistant`. InfluxDB 2.x and 3.x create buckets/databases automatically.

{% configuration %}
api_version:
  type: string
  description: API version to use. Valid values are `1` or `2`.
  default: "1"
ssl:
  type: boolean
  description: Use HTTPS instead of HTTP. Defaults to `true` for 2.x, `false` for 1.x.
  required: false
  default: false
host:
  type: string
  description: IP address or domain of your database host. For InfluxDB Cloud, defaults to `us-west-2-1.aws.cloud2.influxdata.com`.
  required: false
  default: localhost
port:
  type: integer
  description: Port to use. InfluxDB 3 defaults to 8181; v1 and v2 default to 8086.
  required: false
  default: 8086
path:
  type: string
  description: Path to use if InfluxDB is behind a reverse proxy.
  required: false
username:
  type: string
  description: 1.x only - Database username with read/write privileges.
  required: inclusive
password:
  type: string
  description: 1.x - Password for the database user. 2.x and 3.x - Auth token with write access. Required with `username`.
  required: inclusive
database:
  type: string
  description: 1.x and 3.x - Database name. For 1.x, you must create the database before you can write to it.
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
  description: 2.x and 3.x - Auth token with write access. For InfluxDB 3, generate using the `influxdb3` CLI or Explorer UI.
  required: inclusive
organization:
  type: string
  description: "2.x and 3.x - Organization ID. For InfluxDB 2.x, find this in your installation URL after `/orgs`. For InfluxDB 3, this value is required but not validated—use any value."
  required: inclusive
bucket:
  type: string
  description: 2.x and 3.x - For InfluxDB 2.x, the bucket name. For InfluxDB 3, this maps to the database name.
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

### Full configuration for InfluxDB 1.x

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

### Full configuration for InfluxDB 2.x

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

The `influxdb` sensor lets you query values from an InfluxDB database to populate a sensor state. Use this to present statistics as Home Assistant sensors from the `influxdb` history integration or an external data source.

{% note %}
**InfluxDB 3 sensor support:** InfluxDB 3 supports the [v1 query API](https://docs.influxdata.com/influxdb3/core/query-data/execute-queries/influxdb-v1-api/) (InfluxQL), so 1.x sensors using `queries:` may work. The v2 query API (Flux) is not supported—`queries_flux:` sensors don't work with InfluxDB 3.

**Tools for querying:** Query InfluxDB 3 using SQL or InfluxQL with external tools such as [InfluxDB 3 Explorer](https://docs.influxdata.com/influxdb3/explorer/get-started/) or [Grafana](https://docs.influxdata.com/influxdb3/core/visualize-data/grafana/).
{% endnote %}

{% important %}
You must configure the `influxdb` history integration to create `influxdb` sensors. To create sensors for an external InfluxDB database without writing data to it, exclude all entities:

```yaml
influxdb:
  exclude:
    entity_globs: "*"
```

{% endimportant %}

### Sensor configuration

Define the sensor connection variables and queries in your {% term "`configuration.yaml`" %} file. A sensor is created for each query.

#### InfluxDB 1.x sensors (InfluxQL)

```yaml
sensor:
  - platform: influxdb
    queries:
      - name: mean value of foo
        where: '"name" = ''foo'''
        measurement: '"°C"'
```

#### InfluxDB 2.x sensors (Flux)

InfluxDB 2.x requires queries in [Flux](https://docs.influxdata.com/flux/v0/). Use the query builder in the InfluxDB UI to construct queries:

```yaml
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

### Sensor configuration variables

{% configuration %}
api_version:
  type: string
  description: API version to use. Valid values are `1` or `2`.
  default: "1"
ssl:
  type: boolean
  description: Use HTTPS instead of HTTP. Defaults to `true` for 2.x, `false` for 1.x.
  required: false
  default: false
host:
  type: string
  description: IP address or domain of your database host. For InfluxDB Cloud, defaults to `us-west-2-1.aws.cloud2.influxdata.com`.
  required: false
  default: localhost
port:
  type: integer
  description: Port to use.
  required: false
  default: 8086
path:
  type: string
  description: Path to use if InfluxDB is behind a reverse proxy.
  required: false
username:
  type: string
  description: 1.x only - Database username with read privileges.
  required: inclusive
password:
  type: string
  description: 1.x only - Password for the database user. Required with `username`.
  required: inclusive
database:
  type: string
  description: 1.x only - Database name. Individual sensors can override this.
  required: false
  default: home_assistant
verify_ssl:
  type: boolean
  description: 1.x only - Verify SSL certificate. For 2.x, SSL verification is always enabled.
  required: false
  default: true
token:
  type: string
  description: 2.x only - Auth token with read access to your Organization and Bucket.
  required: inclusive
organization:
  type: string
  description: 2.x only - Organization ID. Find this in your InfluxDB URL after `/orgs`.
  required: inclusive
bucket:
  type: string
  description: 2.x only - Bucket name. Individual sensors can override this.
  required: false
  default: Home Assistant
queries:
  type: list
  description: 1.x only - List of sensors using InfluxQL queries.
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
  description: 2.x only - List of sensors using Flux queries.
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
      description: "The group function to be used. If provided, adds `{group_function}(column: \"_value\")` to your query. Unlike 1.x queries, this does not default to mean. If omitted, `limit(n: 1)` is added instead."
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

### Full configuration for InfluxDB 1.x

The example configuration entry below creates two requests to your local InfluxDB instance, one to the database `db1`, the other to `db2`:

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

### Full configuration for InfluxDB 2.x

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

Note that when working with Flux queries, the resultset is broken into tables, you can see how this works in the Data Explorer of the UI. If you are operating on data created by the InfluxDB history integration, this means by default, you will have a table for each entity and each attribute of each entity (other than `unit_of_measurement` and any others you promoted to tags).

This is more tables compared to 1.x queries, where you have one table per `unit_of_measurement` across all entities. You can still create aggregate metrics across multiple sensors. As shown above, use the [keep](https://docs.influxdata.com/flux/v0/stdlib/universe/keep/) or [drop](https://docs.influxdata.com/flux/v0/stdlib/universe/drop/) filters. When you remove key columns, InfluxDB merges tables that share a schema for `_value` into one.

## Querying your data in Influx

### Sensors

For sensors with a unit of measurement defined, the unit of measurement is used as the measurement name and entries are tagged with the second part of the `entity_id`. Therefore you need to add a WHERE clause to the query to filter out values. 

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
