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

## Overview

This integration allows [ESPHome](https://esphome.io) devices to connect directly to Home Assistant with the [native ESPHome API](https://esphome.io/components/api.html).

ESPHome is a firmware generator and configuration system that enables the transformation of microcontrollers into fully customizable smart home devices. Using a simple YAML configuration file, ESPHome allows users to define hardware components like sensors, actuators, and peripherals. These configurations are then compiled into custom firmware that can be flashed onto the target device.

### Key Features:
- **YAML Configuration**: Specify hardware components, sensors, actuators, and integrations using a clean and straightforward YAML syntax.
- **Custom Firmware Generation**: ESPHome compiles the provided configuration into a highly optimized, device-specific firmware image that is ready to be flashed onto microcontrollers.
- **Seamless Integration**: After flashing, ESPHome devices can integrate seamlessly with platforms like Home Assistant using the ESPHome native API. This documentation page focuses on the **native API integration**, which allows devices to communicate directly with Home Assistant for real-time automation and monitoring. For other integrations, such as MQTT or HTTP, please refer to the relevant sections of the [ESPHome documentation](https://esphome.io/).

ESPHome supports a variety of microcontrollers beyond just the ESP family. These include:

- **ESP32**: A powerful microcontroller with Wi-Fi and Bluetooth capabilities.
- **ESP8266**: A low-cost microcontroller with Wi-Fi support.
- **BK72xx**: A series of microcontrollers from Beken, commonly used in smart home applications.
- **RP2040**: A microcontroller developed by Raspberry Pi, known for its flexibility and cost-effectiveness.
- **RTL87xx**: A series of microcontrollers from Realtek, supporting various wireless communication protocols.

For a list of officially supported microcontrollers and devices, refer to the [ESPHome device database](https://devices.esphome.io/). Keep in mind that this database represents only a portion of the ecosystem—many other devices and peripherals are supported but may not appear in the database. For detailed information on configuring unsupported or custom devices, consult the official [ESPHome documentation](https://esphome.io/), which provides in-depth guides on expanding and customizing your setup beyond the pre-configured devices.

{% include integrations/config_flow.md %}

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}

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
