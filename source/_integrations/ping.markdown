---
title: Ping (ICMP)
description: Instructions on how to integrate Ping (ICMP)-based into Home Assistant.
ha_category:
  - Binary Sensor
  - Network
  - Presence Detection
ha_release: 0.43
ha_iot_class: Local Polling
ha_quality_scale: internal
ha_domain: ping
ha_platforms:
  - binary_sensor
  - device_tracker
ha_integration_type: integration
---

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Presence Detection](#presence-detection)

{% configuration %}
ping:
  description: The platforms to use for you command_line integration.
  required: true
  type: list
  keys:
    host:
      description: Host to use as binary sensor or device tracker.
      required: true
      type: string
    binary_sensor:
      description: Binary sensor platform.
      required: false
      type: map
      keys:
        name:
          description: Let you overwrite the name of the device.
          required: true
          type: string
        count:
          description: Number of packets to be sent up to a maximum of 100.
          required: false
          type: integer
          default: 5
    device_tracker:
      description: Device tracker platform.
      required: false
      type: map
      keys:
        name:
          description: Let you overwrite the name of the device.
          required: true
          type: string
        count:
          description: Number of packet used for each device (avoid false detection).
          required: false
          type: integer
          default: 5
{% endconfiguration %}

## Binary Sensor

The `ping` binary sensor platform allows you to use `ping` to send ICMP echo requests. This way you can check if a given host is online and determine the round trip times from your Home Assistant instance to that system.

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ping:
  - host: "127.0.0.1"
    binary_sensor:
      name: "Presence 127.0.0.1"
```

The sensor exposes the different round trip times in milliseconds measured by `ping` as attributes:

- `round_trip_time_mdev`
- `round_trip_time_avg`
- `round_trip_time_min`
- `round_trip_time_max`

<div class='note'>
When run on Windows systems, the round trip time attributes are rounded to the nearest millisecond and the mdev value is unavailable.
</div>

## Presence Detection

The `ping` device tracker platform offers presence detection by using `ping` to send ICMP echo requests. This can be useful when devices are running a firewall and are blocking UDP or TCP packets but responding to ICMP requests (like Android phones). This tracker doesn't need to know the MAC address since the host can be on a different subnet. This makes this an option to detect hosts on a different subnet when `nmap` or other solutions don't work since `arp` doesn't work.

<div class='note'>
  Please keep in mind that modern smart phones will usually turn off WiFi when they are idle. Simple trackers like this may not be reliable on their own.
</div>

### Configuration

To use this presence detection in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ping:
  - host: "127.0.0.1"
    device_tracker:
      name: "Tracker 127.0.0.1"
```

See the [person integration page](/integrations/person/) for instructions on how to configure the people to be tracked.

## Services

Available services: `reload`.

### Service `ping.reload`

Reload all `ping` entities.

This service takes no service data attributes.

<div class='note'>
  Device tracker is a legacy entity which does not support reloading. To reconfigure device tracker Home Assistant needs to be restarted.
</div>

