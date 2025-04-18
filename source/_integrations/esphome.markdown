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

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}

## Supported devices

The ESPHome integration works with devices that run ESPHome firmware and expose their functionality through the [native ESPHome API](https://esphome.io/components/api.html). This API is designed for tight, efficient integration with Home Assistant, enabling ESPHome devices to push updates directly to Home Assistant in **near real time**.

## Updating data

Rather than polling for sensor values or device states, Home Assistant maintains a persistent connection to each ESPHome device using the native API. This allows state changes—such as a temperature sensor update, a button press, or a binary sensor trigger—to be sent immediately as they happen, reducing latency and improving responsiveness in automations.

Additional technical details:
- **The connection is established over TCP using a lightweight protocol optimized for microcontrollers**. This protocol is implemented in [aioesphomeapi](https://github.com/esphome/aioesphomeapi), an async Python library used by Home Assistant to manage communication with ESPHome devices. It supports efficient, bi-directional messaging that minimizes latency and overhead, making it well-suited for constrained hardware environments.
- **Home Assistant automatically reconnects to ESPHome devices if the connection is dropped**. This includes support for "sleepy" or battery-powered devices that spend most of their time in deep sleep to conserve energy. When a device wakes up, it becomes available on the network, and Home Assistant attempts to reconnect to it using the native API. If **mDNS** (Multicast DNS) is available, Home Assistant can rapidly discover the device and re-establish the connection without requiring static IP addresses or manual DNS configuration. This ensures that devices like battery-powered sensors report their state changes quickly and reliably as soon as they come online.
- The API supports bi-directional communication, so Home Assistant can also push commands instantly to the device (e.g., toggling switches or changing light states).

This real-time behavior enables fast, reactive automations and a smooth user experience compared to traditional polling-based integrations.

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
