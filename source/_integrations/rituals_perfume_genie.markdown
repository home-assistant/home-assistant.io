---
title: Rituals Perfume Genie
description: Instructions on how to integrate Rituals Perfume Genie diffusers within Home Assistant.
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2021.3
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
ha_codeowners:
  - '@milanmeu'
  - '@frenck'
  - '@quebulm'
ha_domain: rituals_perfume_genie
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The [Rituals Perfume Genie](https://www.rituals.com/perfume-genie-b2b.html) {% term integration %} allows you to control and monitor your Rituals perfume diffusers connected to your Rituals account.

## Use cases

- Monitor current device state.
- Control fragrance diffusion and amount.
- Expose cartridge level, type and room configuration.

## Supported devices

- Rituals Perfume Genie
- Rituals Perfume Genie 2nd Generation
- Rituals Perfume Genie 3rd Generation

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address used to register your Rituals Perfume Genie."
Password:
  description: "The password used to register your Rituals Perfume Genie."
{% endconfiguration_basic %}

## Supported functionality

The integration will fetch data from each device.
Below is a complete overview of the entities this integration provides.

{% important %}
Some entities are only available on the battery powered model.
{% endimportant %}

### Binary Sensor

- Charging state

### Number

- Perfume amount

### Select

- Room size

### Sensor

- Battery percentage
- Fill level
- Perfume label
- WiFi signal

### Switch

- Fan

## Examples

The following examples show how to use the Rituals Perfume Genie integration in Home Assistant automations.
These examples are just a starting point, and you can use them as inspiration to create your own automations.

### Turn the Perfume Genie on at a specific time

The following example will turn on the Perfume Genie at 18:00.

{% raw %}

```yaml
automation:
  - alias: "Start fragrance in evening"
    triggers:
      - trigger: time
        at: "18:00:00"

    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.rituals_perfume_genie_diffuser
```

{% endraw %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
