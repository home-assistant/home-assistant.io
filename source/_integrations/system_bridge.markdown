---
title: System Bridge
description: How to integrate the System Bridge integration into Home Assistant.
ha_category:
  - Sensor
  - System Monitor
ha_release: 2021.4
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: system_bridge
ha_quality_scale: silver
ha_platforms:
  - sensor
---

[System Bridge](https://system-bridge.timmo.dev) is an application that runs on your local machine to share system information via its API as well as allowing commands to be sent to the device.

## Prerequisites

You will need your API key. This can be found and configured in the application's settings.

{% include integrations/config_flow.md %}

## Sensors

This integration provides the following sensors:

| Name             | Description                                         |
| ---------------- | --------------------------------------------------- |
| Battery          | Battery level of the device                         |
| CPU Speed        | The current CPU speed                               |
| CPU Temperature  | The current temperature of the device               |
| Filesystem(s)    | Space used for each drive letter / filesystem mount |
| Operating System | Version information of the Operating System         |
| Load             | System load percentage                              |

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
  path: "C:\image.jpg"
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
