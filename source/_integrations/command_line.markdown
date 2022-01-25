---
title: Command Line
description: Instructions on how to integrate Command line platform within Home Assistant.
ha_category:
  - Utility
ha_release: 0.12
ha_iot_class: Local Polling
ha_domain: command_line
ha_platforms:
  - binary_sensor
  - cover
  - notify
  - sensor
  - switch
---

The `command_line` domain issues specific commands to get data or set data.

## Configuration

To use the command line platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
command_line:
  - sensor:
    - name: cat ip forward
      command: "cat /proc/sys/net/ipv4/ip_forward"
  - switch:
    - name: Kitchen Light:
      command_on: switch_command on kitchen
      command_off: switch_command off kitchen
```

## Platforms

- [Binary Sensor](/integrations/command_line.binary_sensor/)
- [Cover](/integrations/command_line.cover/)
- [Notify](/integrations/notify.command_line/)
- [Sensor](/integrations/command_line.sensor/)
- [Switch](/integrations/command_line.switch/)

## Services

Available services: `reload`.

### Service `command_line.reload`

Reload all `command_line` entities.

This service takes no service data attributes.

## Legacy Platform Config
- [Legacy Binary Sensor](/integrations/binary_sensor.command_line/)
- [Legacy Cover](/integrations/cover.command_line/)
- [Legacy Sensor](/integrations/sensor.command_line/)
- [Legacy Switch](/integrations/switch.command_line/)
