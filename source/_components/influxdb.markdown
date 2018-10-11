---
layout: page
title: "InfluxDB"
description: "Record events in InfluxDB."
date: 2017-03-13 22:09
sidebar: true
comments: false
sharing: true
footer: true
logo: influxdb.png
ha_category: History
ha_release: 0.9
---

The `influxdb` component makes it possible to transfer all state changes to an external [InfluxDB](https://influxdb.com/) database. See the [official installation documentation](https://docs.influxdata.com/influxdb/v1.6/introduction/installation/) for how to set up an InfluxDB database, or if you're using Hass.io, [there is a community add-on](https://community.home-assistant.io/t/community-hass-io-add-on-influxdb/54491) available.

## {% linkable_title Configuration %}

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
  description: Use https instead of http to connect.
  required: false
  default: false
verify_ssl:
  type: boolean
  description: Verify SSL certificate for https request.
  required: false
  default: true
max_retries:
  type: integer
  description: Set this to allow the component to retry if there was a network error when transmitting data.
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
  description:  Configure which components should be excluded from recording to InfluxDB.
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
  description:  Configure which components should be included in recordings to InfluxDB. If set, all other entities will not be recorded to InfluxDB. Values set by the **exclude** lists will take precedence.
  required: false
  keys:
    entities:
      type: string, list
      description:  The list of entity ids to be included in recording to InfluxDB.
      required: false    
    domains:
      type: string, list
      description:  The list of domains to be included in recording to InfluxDB.
      required: false
tags:
  type: string, list
  description: Tags to mark the data.
  default: 0
tags_attributes:
  type: string, list
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
  description: This attribute contains domain-specific component override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
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

## {% linkable_title Helper scripts %}

- [Helper script `influxdb_import`](/docs/tools/influxdb_import/)
- [Helper script `db_migrator`](/docs/tools/db_migrator/) (only used for [Home Assistant 0.36](/blog/2017/01/14/iss-usps-images-packages/#influxdb-export))

## {% linkable_title Examples %}

### {% linkable_title Full configuration %}

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
