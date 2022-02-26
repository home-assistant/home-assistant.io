---
title: ebusd
description: The ebusd integration allows the integration between eBUS heating systems and Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.88
ha_domain: ebusd
ha_platforms:
  - sensor
---

Integration between [ebusd](https://github.com/john30/ebusd/) daemon for communication with eBUS heating systems and Home Assistant using sensor component.

{% include integrations/config_flow.md %}

### Integration Options

**Name**: The name to use when displaying this instance.

**Host**: The IP address of your ebus daemon, e.g., `127.0.0.1`.

**Port**: The port your ebus daemon uses.

**Circuit**: The heating circuit name to monitor, '700', 'ehp' and 'bai' supported.

**Cache max age (seconds)**: The lifetime in seconds of cached circuit values returned by ebus daemon without accessing physical bus (0 to 86400).

**Monitored conditions**: The circuit dependent list of conditions to monitor.

## Sensors

Sensors are created based on a list of monitored conditions.

## Services

### Service `ebusd_write`

Write message to eBUS via ebus daemon.

| Service data attribute | Optional | Description                      |
| ---------------------- | -------- | ---------------------------------|
| `name`                 | No       | The name of the message to send. |
| `value`                | No       | The value of the message.        |
