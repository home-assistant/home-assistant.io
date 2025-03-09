---
title: Monoprice Blackbird Matrix Switch
description: Instructions on how to integrate Monoprice Blackbird 4k 8x8 HDBaseT Matrix Switch into Home Assistant.
ha_category:
  - Media player
ha_release: 0.68
ha_iot_class: Local Polling
ha_domain: blackbird
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `blackbird` platform allows you to control [Monoprice Blackbird Matrix Switch](https://www.monoprice.com/product?p_id=21819) (8x8) using a serial or IP connection, this integration does not support the 4x4 matrix switch.

To add a Blackbird 8x8 device to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: blackbird
    port: /dev/ttyUSB0
    zones:
      1:
        name: Living Room
    sources:
      3:
        name: BluRay
```

{% configuration %}
port:
  description: The serial port to which Blackbird matrix switch is connected. [`port`](#port) and [`host`](#host) cannot be specified concurrently.
  required: exclusive
  type: string
host:
  description: The IP address of the Blackbird matrix switch. [`port`](#port) and [`host`](#host) cannot be specified concurrently.
  required: exclusive
  type: string
zones:
  description: This is the list of zones available. Valid zones are 1, 2, 3, 4, 5, 6, 7, 8. Each zone must have a name assigned to it.
  required: true
  type: map
  keys:
    ZONE_NUMBER:
      description: The name of the zone.
      type: string
sources:
  description: The list of sources available. Valid source numbers are 1, 2, 3, 4, 5, 6, 7, 8. Each source number corresponds to the input number on the Blackbird matrix switch. Similar to zones, each source must have a name assigned to it.
  required: true
  type: map
  keys:
    ZONE_NUMBER:
      description: The name of the source.
      type: string
{% endconfiguration %}

### Action `blackbird.set_all_zones`

Set all zones to the same input source. This action allows you to immediately synchronize all the TVs in your home. Regardless of `entity_id` provided, all zones will be updated.

| Data attribute | Optional | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| `entity_id`            | yes      | String that points at an `entity_id` of a zone. |
| `source`               | no       | String of source name to activate.              |
