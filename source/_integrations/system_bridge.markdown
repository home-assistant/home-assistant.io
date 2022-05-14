---
title: System Bridge
description: How to integrate the System Bridge integration into Home Assistant.
ha_category:
  - Sensor
  - System Monitor
ha_release: 2021.6
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: system_bridge
ha_quality_scale: silver
ha_platforms:
  - binary_sensor
  - sensor
ha_zeroconf: true
ha_integration_type: integration
---

[System Bridge](https://system-bridge.timmo.dev) is an application that runs on your local machine to share system information via its API/WebSocket. You can also send commands to be to the device such as opening a file or sending keyboard keypresses.

## Prerequisites

### Version

This integration requires System Bridge 3.0.0 and above. Any older version will not work.

### API Key

You will need your API key. This can be found following the documentation [here](https://system-bridge.timmo.dev/docs/running).

{% include integrations/config_flow.md %}

## Binary Sensors

This integration provides the following binary sensors:

| Name                  | Description                        |
| --------------------- | ---------------------------------- |
| Battery Is Charging   | Whether the battery is charging    |
| New Version Available | Whether a new version is available |

## Sensors

This integration provides the following sensors:

| Name                   | Description                                         |
| ---------------------- | --------------------------------------------------- |
| Battery                | Battery level of the device                         |
| CPU Speed              | The current CPU speed                               |
| Displays Connected     | Number of displays connected                        |
| Display Resolution X   | Display resolution (across)                         |
| Display Resolution Y   | Display resolution (down)                           |
| Display Refresh Rate   | Display refresh rate                                |
| Filesystem(s)          | Space used for each drive letter / filesystem mount |
| GPU Memory Free        | GPU memory free in GB                               |
| GPU Usage %            | GPU usage percentage                                |
| Kernel                 | Version information of the Kernel                   |
| Latest Version         | System Bridge Latest Version                        |
| Load                   | System load percentage                              |
| Memory Free            | Memory (RAM) free in GB                             |
| Memory Used            | Memory (RAM) used in GB                             |
| Memory Used %          | Memory (RAM) % used                                 |
| Operating System       | Version information of the Operating System         |
| Version                | System Bridge Version                               |

These sensors are also available, but are not enabled by default:

| Name                   | Description                              |
| ---------------------- | ---------------------------------------- |
| CPU Temperature        | The current temperature of the CPU       |
| CPU Voltage            | The current voltage of the CPU           |
| GPU Core Clock Speed   | GPU core clock speed in MHz              |
| GPU Memory Clock Speed | GPU memory clock speed in MHz            |
| GPU Fan Speed          | GPU fan speed percentage                 |
| GPU Memory Used        | GPU memory used in GB                    |
| GPU Memory Used %      | GPU memory used percentage               |
| GPU Power Usage        | GPU power usage                          |
| GPU Temperature        | The current temperature of the GPU       |

## Services

### Service `system_bridge.open_path`

Open a URL or file on the server using the default application.

{% my developer_call_service service="system_bridge.open" title="Open your Home Assistant instance and show your service developer tools with a specific service selected." %}

#### Examples

```yaml
service: system_bridge.open_path
data:
  bridge: "deviceid"
  path: "C:\\image.jpg"
```

### Service `system_bridge.open_url`

Open a URL or file on the server using the default application.

{% my developer_call_service service="system_bridge.open" title="Open your Home Assistant instance and show your service developer tools with a specific service selected." %}

#### Examples

```yaml
service: system_bridge.open_url
data:
  bridge: "deviceid"
  url: "https://home-assistant.io"
```

### Service `system_bridge.send_keypress`

Send a keypress to the server.

```yaml
service: system_bridge.send_keypress
data:
  bridge: "deviceid"
  key: "a"
```

### Service `system_bridge.send_text`

Sends text for the server to type.

```yaml
service: system_bridge.send_text
data:
  bridge: "deviceid"
  text: "Hello"
```
