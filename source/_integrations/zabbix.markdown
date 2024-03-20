---
title: Zabbix
description: Instructions on how to integrate Zabbix into Home Assistant.
ha_category:
  - System monitor
ha_release: 0.37
ha_iot_class: Local Polling
ha_domain: zabbix
ha_platforms:
ha_integration_type: integration
---

The **Zabbix** {% term integration %} is the main {% term integration %} to publish Home Assistant state changes to [Zabbix](https://www.zabbix.com/).

In Zabbix a host has to be created which will contain the Home Assistant states as individual items. These items are automatically created using Zabbix Low-Level Discovery (LLD). In order to make setup in Zabbix easy, you can use this [template](/assets/integrations/zabbix/zbx_template_home_assistant.xml) for the host.

## Configuration

To set the Zabbix {% term integration %} up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
zabbix:
  host: IP_ADDRESS
  publish_states_host: NAME_OF_HOST_IN_ZABBIX
```

{% configuration %}
host:
  description: Your Zabbix server.
  required: true
  type: string
port:
  description: Port number of Zabbix server trapper running on the Zabbix server
  required: false
  type: integer
  default: 10051
publish_states_host:
  description: The name of the host in Zabbix that will receive the state changes from Home Assistant. It needs to be manually created in Zabbix first and have the template associated with it (see above).
  required: true
  type: string
exclude:
  type: list
  description: Configure which integrations should be excluded from being published to Zabbix. ([Configure Filter](#configure-filter))
  required: false
  keys:
    entities:
      type: [string, list]
      description: The list of entity ids to be excluded from being published to Zabbix.
      required: false
    entity_globs:
      type: [string, list]
      description: Exclude all entities matching a listed pattern.
      required: false
    domains:
      type: [string, list]
      description: The list of domains to be excluded from being published to Zabbix.
      required: false
include:
  type: list
  description: Configure which integrations should be included in being published to Zabbix. If set, all other entities will not be published to Zabbix. ([Configure Filter](#configure-filter))
  required: false
  keys:
    entities:
      type: [string, list]
      description: The list of entity ids to be included in being published to Zabbix.
      required: false
    entity_globs:
      type: [string, list]
      description: Include all entities matching a listed pattern.
      required: false
    domains:
      type: [string, list]
      description: The list of domains to be included in being published to Zabbix.
      required: false
{% endconfiguration %}

### Full configuration

```yaml
# Example configuration.yaml entry
zabbix:
  host: ZABBIX_HOST
  publish_states_host: homeassistant
  exclude:
    domains:
      - device_tracker
    entities:
      - sun.sun
      - sensor.time
```

## Configure filter

By default, no entity will be excluded. To limit which entities are being published to Zabbix, you can use the `include` and `exclude` parameters.

{% raw %}

```yaml
# Example filter to include specified domains and exclude specified entities
zabbix:
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

{% endraw %}

{% include common-tasks/filters.md %}
