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

- Entity name is a combination of the friendly name (or name if unset) and component name
- Entity ID is derived from the entity name with the device name prepended

Example with `friendly_name` set:

```yaml
esphome:
   name: "livingroomdesk"
   friendly_name: "Living room desk"

sensor:
   name: "Temperature"
```

The entity will be named `Living room desk Temperature` and will default to having an entity ID of `sensor.livingroomdesk_temperature`.

Example without `friendly_name` set:

```yaml
esphome:
   name: "livingroomdesk"

sensor:
   name: "Temperature"
```

The entity will be named `livingroomdesk Temperature` and will default to having an entity ID of `sensor.livingroomdesk_temperature`.

## Obtaining logs from the device

1. To have the device send logs to Home Assistant, in the [options flow](#options), enable `Subscribe to logs from the device`. 
   - They are logged under the `homeassistant.components.esphome` logger at the equivalent level.

2. To adjust the logging level, there are two options:
    - enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics),
    - or use the [Developer Tools](/docs/tools/dev-tools/#actions-tab) to call the [`logger.set_level`](/integrations/logger/#action-set_level) action to specify the desired level:

      ```yaml
      action: logger.set_level
      data:
        homeassistant.components.esphome: debug
      ```

## Reconfiguration and Device Replacement

This integration supports reconfiguration, allowing you to make changes—such as updating the IP address—even after a device has already been set up.

### Name Conflict Resolution

If Home Assistant detects multiple devices with the same [**name**](https://esphome.io/components/esphome.html#configuration-variables), it will automatically initiate **Name Conflict Resolution**. This process is designed to help you seamlessly replace a failed or retired device with new hardware, while preserving your existing configuration if desired.

This process gives you two options:

- **Migrate**: Transfers the existing entity configuration to the new device. This preserves all your settings, entity names, and history. Use this when you're replacing the hardware but keeping the same YAML configuration.
- **Overwrite**: Replaces the existing configuration with the new device.
  **Caution:** This will **erase all existing settings** for the old device including entity names, customizations, and history will be lost. Use this only if the new device is completely different and you don’t need anything from the previous setup.

{% tip %}
If you’re using the same YAML file on the new device, choose **Migrate**. If it’s a totally different device (even if it shares the same name), **Overwrite** is the safer option.
{% endtip %}

---

### Requirements for Name Conflict Resolution

To trigger Name Conflict Resolution, all of the following must be true:

- The new device must be running **ESPHome 2025.4.0 or later**.
- The new device must use the same [**name**](https://esphome.io/components/esphome.html#configuration-variables) (not just the friendly name).
- The original (old) device must be **offline**.

---

### How to Trigger Name Conflict Resolution

You can trigger Name Conflict Resolution in several ways:

- Connecting a new device with the same name and a **static IP address** will automatically launch a repair flow.
- Using the **Reconfigure** option in the UI to point to a different IP that hosts a device with the same name.
- Configuring a **newly discovered device** that uses the same name.
- **Manually adding** a device with the same name via the integration setup.
