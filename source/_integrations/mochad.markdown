---
title: Mochad
description: Instructions on how to integrate Mochad into Home Assistant.
ha_category:
  - Hub
  - Light
  - Switch
ha_iot_class: Local Polling
ha_release: 0.32
ha_domain: mochad
ha_platforms:
  - light
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `mochad` {% term integration %} is the main integration to integrate all X10 platforms being controlled by [mochad](https://sourceforge.net/projects/mochad/). Besides this integration you will have to setup your X10 devices separately.

There is currently support for the following device types within Home Assistant:

- [Light](#light)
- [Switch](#switch)

## Configuration

To integrate your Mochad units with Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
mochad:
```

{% configuration %}
host:
  description: The host that mochad is running on.
  required: false
  type: string
  default: localhost
port:
  description: The port that mochad is running on.
  required: false
  type: integer
  default: 1099
{% endconfiguration %}

## Example

A full configuration sample could look like the one below:

```yaml
# Example configuration.yaml entry
mochad:
  host: localhost
  port: 1099
```

## Light

The `mochad` light platform lets you control an X10 enabled dimmer/light device.

To enable this sensor, you first have to set up the [mochad integration](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mochad
    devices:
      - address: a1
      - address: a5
```

{% configuration %}
address:
  description: The X10 address of the light.
  required: true
  type: string
name:
  description: The name of the light.
  required: false
  default: x10_light_dev_address
  type: string
comm_type:
  description: pl (powerline) or rf (radio frequency).
  required: false
  default: pl
  type: string
brightness_levels:
  description: The number of brightness levels the X10 light device supports. This can either be 32, 64, or 256 (note that the max value sent to the device will be n-1 because it starts at 0).
  required: false
  default: 32
  type: integer
{% endconfiguration %}

## Switch

The `mochad` switch platform lets you control an X10 enabled switch device.

To enable this sensor, you first have to set up the [mochad integration](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mochad
    devices:
      - address: a1
      - address: a5
```

{% configuration %}
address:
  description: The X10 address of the switch.
  required: true
  type: string
name:
  description: The name of the switch.
  required: false
  default: x10_switch_dev_*address*
  type: string
comm_type:
  description: pl (powerline) or rf (radio frequency).
  required: false
  default: pl
  type: string
{% endconfiguration %}
