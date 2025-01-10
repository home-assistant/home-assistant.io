---
title: ESPHome
description: Support for ESPHome devices using the native ESPHome API.
featured: true
ha_category:
  - Alarm
  - DIY
  - Update
ha_release: 0.85
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@OttoWinter'
  - '@jesserockz'
  - '@kbx81'
  - '@bdraco'
ha_domain: esphome
ha_zeroconf: true
ha_platforms:
  - alarm_control_panel
  - assist_satellite
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - date
  - datetime
  - diagnostics
  - event
  - fan
  - light
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - text
  - time
  - update
  - valve
ha_integration_type: device
ha_dhcp: true
works_with:
  - local
---

This integration allows [ESPHome](https://esphome.io) devices to connect directly to Home Assistant with the [native ESPHome API](https://esphome.io/components/api.html).

{% include integrations/config_flow.md %}

## Home Assistant actions

ESPHome devices can perform actions to any [Home Assistant action](https://esphome.io/components/api.html#homeassistant-service-action). This functionality is not enabled by default for newly configured device, but can be turned on the options flow on a per device basis.

{% include integrations/option_flow.md %}

## Entity naming and IDs

ESPHome uses different naming and entity ID rules based on the configuration of the ESPHome device. It is recommended to set a `friendly_name` in the ESPHome {% term "`configuration.yaml`" %} to take advantage of the newer naming structure, which is consistent with Home Assistant naming standards and makes it much easier to tell similar devices apart. The legacy naming rules apply when the `friendly_name` is not set in the {% term "`configuration.yaml`" %}.

### Friendly naming

- Entity name is a combination of the friendly name and component name
- Entity ID is derived from the entity name with the device name prepended

Example:

```yaml
esphome:
   name: "livingroomdesk"
   friendly_name: "Living room desk"

sensor:
   name: "Temperature"
```

The entity will be named `Living room desk Temperature` and will default to having an entity ID of `sensor.livingroomdesk_temperature`.

### Legacy naming

- Entity name is the component name
- Device name is not prepended to the entity name
- Entity ID is derived solely from the entity name

Example:

```yaml
esphome:
   name: "livingroomdesk"

sensor:
   name: "Temperature"
```

The entity will be named `Temperature` and will default to having an entity_id of `sensor.temperature`.
