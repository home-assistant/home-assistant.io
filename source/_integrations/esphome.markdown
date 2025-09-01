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
ha_quality_scale: platinum
---

## Overview

The **ESPHome** {% term integration %} allows [ESPHome](https://esphome.io) devices to connect directly to Home Assistant with the [native ESPHome API](https://esphome.io/components/api.html).

ESPHome is a firmware generator and configuration system that enables the transformation of microcontrollers into fully customizable smart home devices. Using a simple YAML configuration file, ESPHome allows users to define hardware components like sensors, actuators, and peripherals. These configurations are then compiled into custom firmware that can be flashed onto the target device.

### Key features

- **YAML Configuration**: Specify hardware components, sensors, actuators, and integrations using a clean and straightforward YAML syntax.
- **Custom Firmware Generation**: ESPHome compiles the provided configuration into a highly optimized, device-specific firmware image that is ready to be flashed onto microcontrollers.
- **Seamless Integration**: After flashing, ESPHome devices can integrate seamlessly with Home Assistant using the ESPHome native API. This documentation page focuses on the [native API](https://esphome.io/components/api.html), which allows devices to communicate directly with Home Assistant for real-time automation and monitoring. For other integrations, such as MQTT or HTTP, please refer to the relevant sections of the [ESPHome documentation](https://esphome.io/).

ESPHome supports a variety of microcontrollers beyond just the ESP family. These include:

- **ESP32**: A powerful microcontroller with Wi-Fi and Bluetooth capabilities.
- **ESP8266**: A low-cost microcontroller with Wi-Fi support.
- **BK72xx**: A series of microcontrollers from Beken, commonly used in smart home applications.
- **RP2040**: A microcontroller developed by Raspberry Pi, known for its flexibility and cost-effectiveness.
- **RTL87xx**: A series of microcontrollers from Realtek, supporting various wireless communication protocols.

For a list of officially supported microcontrollers and devices, refer to the [ESPHome device database](https://devices.esphome.io/). Keep in mind that this database represents only a portion of the ecosystem—many other devices and peripherals are supported but may not appear in the database.

For inspiration and examples of complete, ready-to-use configurations, check out the [ESPHome ready-made projects](https://esphome.io/projects/index.html). These include setups like [Bluetooth proxies](https://esphome.io/components/bluetooth_proxy.html), which can extend the [Bluetooth](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) range of Home Assistant.

If you're looking for pre-built solutions, the [Voice PE](https://www.home-assistant.io/voice-pe/) is an excellent example. It's a pre-built voice assistant device powered by ESPHome, offering an easy way to integrate voice control into your Home Assistant system. Many pre-built solutions, like the Voice PE, are open-source and can be customized, giving you flexibility to adapt them to your needs.

For detailed information on configuring unsupported or custom devices, consult the official [ESPHome documentation](https://esphome.io/), which provides in-depth guides on expanding and customizing your setup beyond the pre-configured devices.

{% include integrations/config_flow.md %}

### Required manual input

To configure an ESPHome device, enter the following information:

{% configuration_basic %}

host:
  description: "IP address or hostname of the ESPHome device. <br> This will be pre-filled if the device was auto-discovered."
port:
  description: "Port used by the ESPHome native API (default: 6053). <br> This will be pre-filled if the device was auto-discovered."
noise_psk:
  description: "The pre-shared key used for encryption. <br> This is a 32‑byte base64‑encoded string. Leave blank if native encryption is not enabled."
password:
  description: "Device password (deprecated). <br> Use a Noise PSK (encryption key) instead – password support will be removed in a future release."

{% endconfiguration_basic %}

For more information, see the [ESPHome Native API Component documentation](https://esphome.io/components/api.html).

{% include integrations/option_flow.md %}

These options are disabled by default and not required—only set them if specifically needed.

{% configuration_basic %}
Allow the device to perform Home Assistant actions:
  description: "No/Yes <br> When enabled, ESPHome devices can perform Home Assistant actions, such as calling services or sending events. Only enable this if you trust the device."
Subscribe to logs from the device:
  description: "No/Yes <br> When enabled, the device will send logs to Home Assistant and you can view them in the logs panel."
{% endconfiguration_basic %}

## Supported devices

The ESPHome {% term integration %} works with devices that run ESPHome firmware and expose their functionality through the [native ESPHome API](https://esphome.io/components/api.html). This API is designed for tight, efficient integration with Home Assistant, enabling ESPHome devices to push updates directly to Home Assistant in **near real time**.

## Updating data

Rather than polling for sensor values or device states, Home Assistant maintains a persistent connection to each ESPHome device using the native API. This allows state changes—such as a temperature sensor update, a button press, or a binary sensor trigger—to be sent immediately as they happen, reducing latency and improving responsiveness in automations.

### Additional technical details

- **Efficient Communication Protocol**: ESPHome uses a lightweight, bi-directional protocol over TCP, optimized for microcontrollers. This protocol is implemented in [aioesphomeapi](https://github.com/esphome/aioesphomeapi), the async Python library used by Home Assistant to handle real-time communication with ESPHome devices. It enables low-latency updates and near instant command execution.
- **Automatic Reconnection**: Home Assistant maintains a persistent connection to each ESPHome device and will automatically attempt to reconnect if the connection is lost. This includes support for "sleepy" or battery-powered devices that periodically wake from deep sleep. When such a device comes online, Home Assistant quickly re-establishes the connection—especially when **mDNS** (Multicast DNS) is available—allowing the device to be discovered and connected without requiring static IPs or manual configuration.

This real-time behavior enables fast, reactive automations and a smooth user experience compared to traditional polling-based integrations.

## Supported functionality

### Entities

The available entities depend on the components defined in the ESPHome YAML configuration for each device. These entities are exposed through the [Native API Component](https://esphome.io/components/api.html).

### Firing events on the Home Assistant event bus

When using the native API with Home Assistant, you can trigger events on the Home Assistant event bus directly from ESPHome. For more details, see the [homeassistant.event Action](https://esphome.io/components/api.html#homeassistant-event-action).

### Actions

Each device can define Home Assistant Actions based on its ESPHome YAML configuration. For more information, refer to the [Actions](https://esphome.io/components/api.html#actions) section in the [Native API Component](https://esphome.io/components/api.html) documentation.

### Retrieving data from Home Assistant

ESPHome can retrieve the state of Home Assistant entities using the [Native API](https://esphome.io/components/api.html) with [User-Defined Actions](https://esphome.io/components/api.html#user-defined-actions).

### Home Assistant actions

ESPHome devices can call any [Home Assistant Action](https://esphome.io/components/api.html#homeassistant-service-action). This feature is not enabled by default for newly added devices but can be enabled through the options flow on a per-device basis.

### Tag scanning support

The [Native API Component](https://esphome.io/components/api.html) also supports sending tag scan events to Home Assistant. See the [homeassistant.tag_scanned Action](https://esphome.io/components/api.html#homeassistant-tag-scanned-action) for more information.

## Entity naming and IDs

- Entity name is a combination of the friendly name (or name if unset) and component name
- Entity ID is derived from the entity name with the device name prepended
- Unicode characters in names are transliterated to their closest ASCII equivalents for compatibility

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

Example with Unicode characters:

```yaml
esphome:
   name: "haloszoba-klima"
   friendly_name: "Hálószoba klíma"

sensor:
   name: "Árvíztűrő tükörfúrógép"
```

The entity will be named `Hálószoba klíma Árvíztűrő tükörfúrógép` and will default to having an entity ID of `sensor.haloszoba_klima_arvizturo_tukorfurogep`. Note how the Unicode characters are transliterated rather than replaced with underscores.

## Troubleshooting

### Viewing live logs

To troubleshoot your ESPHome devices, you can easily view live logs, whether you're using the [**ESPHome Device Builder Add-on**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon) or the **ESPHome CLI**. The logs contain detailed information such as Wi-Fi connection status, errors, and debug messages, which can help you identify and resolve issues with your device.

#### Using the [**ESPHome Device Builder Add-on**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon)

1. In the [**ESPHome Device Builder Add-on**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon) add-on, find the device you're working with.
2. Click the **LOGS** button to open the log view.

#### Using the **ESPHome CLI**

If you're using the **ESPHome CLI**, follow the instructions for the [logs Command](https://esphome.io/guides/cli.html#logs-command) to access the logs.

### Obtaining logs from the device

If you want the device to send logs without requiring you to be actively monitoring, follow these steps:

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

### Name conflict resolution

If Home Assistant detects multiple devices with the same [**name**](https://esphome.io/components/esphome.html#configuration-variables), it will automatically initiate **Name Conflict Resolution**. This process is designed to help you seamlessly replace a failed or retired device with new hardware, while preserving your existing configuration if desired.

This process gives you two options:

- **Migrate**: Transfers the existing entity configuration to the new device. This preserves all your settings, entity names, and history. Use this when you're replacing the hardware but keeping the same YAML configuration.
- **Overwrite**: Replaces the existing configuration with the new device.
  **Caution:** This will **erase all existing settings** for the old device including entity names, customizations, and history will be lost. Use this only if the new device is completely different and you don’t need anything from the previous setup.

{% tip %}
If you’re using the same YAML file on the new device, choose **Migrate**. If it’s a totally different device (even if it shares the same name), **Overwrite** is the safer option.
{% endtip %}

---

### Requirements for name conflict resolution

To trigger Name Conflict Resolution, all of the following must be true:

- The new device must be running **ESPHome 2025.4.0 or later**.
- The new device must use the same [**name**](https://esphome.io/components/esphome.html#configuration-variables) (not just the friendly name).
- The original (old) device must be **offline**.

---

### How to trigger name conflict resolution

You can trigger Name Conflict Resolution in several ways:

- Connecting a new device with the same name and a **static IP address** will automatically launch a repair flow.
- Using the **Reconfigure** option in the UI to point to a different IP that hosts a device with the same name.
- Configuring a **newly discovered device** that uses the same name.
- **Manually adding** a device with the same name via the integration setup.

## Known limitations

Each ESPHome device must have a **unique name**. This name is important for mDNS announcements, ensuring that the device can be properly discovered, quickly reconnected when it comes online or wakes from deep sleep (for devices that support deep sleep), and correctly linked to the [**ESPHome Device Builder Add-on**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon). It's also crucial for **DHCP discovery** if mDNS is not available.

Using duplicate names can lead to connection issues, failed discovery, and unexpected behavior with both the integration and the add-on.

## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}
