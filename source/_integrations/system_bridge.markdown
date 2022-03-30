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

[System Bridge](https://system-bridge.timmo.dev) is an application that runs on your local machine to share system information via its API as well as allowing commands to be sent to the device.

## Prerequisites

You will need your API key. This can be found and configured in the application's settings.

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
| Displays Connected     | Number of displays connected                        |
| Display Resolution X   | Display resolution (across)                         |
| Display Resolution Y   | Display resolution (down)                           |
| Display Refresh Rate   | Display refresh rate                                |
| CPU Speed              | The current CPU speed                               |
| Filesystem(s)          | Space used for each drive letter / filesystem mount |
| GPU Memory Free        | GPU memory free in GB                               |
| GPU Usage %            | GPU usage percentage                                |
| Kernel                 | Version information of the Kernel                   |
| Memory Free            | Memory (RAM) free in GB                             |
| Memory Used            | Memory (RAM) used in GB                             |
| Memory Used %          | Memory (RAM) % used                                 |
| Operating System       | Version information of the Operating System         |
| Version                | System Bridge Version                               |
| Latest Version         | System Bridge Latest Version                        |

These sensors are also available, but are not enabled by default:

| Name                   | Description                              |
| ---------------------- | ---------------------------------------- |
| BIOS Version           | Version of your system's BIOS            |
| CPU Temperature        | The current temperature of the CPU       |
| CPU Voltage            | The current voltage of the CPU           |
| GPU Core Clock Speed   | GPU core clock speed in MHz              |
| GPU Memory Clock Speed | GPU memory clock speed in MHz            |
| GPU Fan Speed          | GPU fan speed percentage                 |
| GPU Memory Used        | GPU memory used in GB                    |
| GPU Memory Used %      | GPU memory used percentage               |
| GPU Power Usage        | GPU power usage                          |
| GPU Temperature        | The current temperature of the GPU       |
| Idle Load              | System idle load percentage              |
| System Load            | System load percentage                   |
| User Load              | System user load percentage              |
| Idle Load (Per CPU)    | System idle load percentage for each CPU |
| System Load (Per CPU)  | System load percentage for each CPU      |
| User Load (Per CPU)    | System user load percentage for each CPU |

## Services

### Service `system_bridge.send_command`

Sends a command to the server to run.

{% my developer_call_service service="system_bridge.send_command" title="Open your Home Assistant instance and show your service developer tools with a specific service selected." %}

#### Examples

```yaml
service: system_bridge.send_command
data:
  bridge: device
  command: code
  arguments: /home/user/file.txt
```

```yaml
service: system_bridge.send_command
data:
  bridge: device
  command: python
  arguments: '-V'
```

### Service `system_bridge.open`

Open a URL or file on the server using the default application.

{% my developer_call_service service="system_bridge.open" title="Open your Home Assistant instance and show your service developer tools with a specific service selected." %}

#### Examples

```yaml
service: system_bridge.open
data:
  bridge: "device"
  path: "C:\\image.jpg"
```

```yaml
service: system_bridge.open
data:
  bridge: "device"
  path: "https://home-assistant.io"
```

```yaml
service: system_bridge.open
data:
  bridge: "device"
  path: "steam://rungameid/814380"
```

### Service `system_bridge.send_keypress`

Send a keypress to the server.

```yaml
service: system_bridge.send_keypress
data:
  bridge: "device"
  key: "a"
```

### Service `system_bridge.send_text`

Sends text for the server to type.

```yaml
service: system_bridge.send_text
data:
  bridge: "device"
  text: "Hello"
```
