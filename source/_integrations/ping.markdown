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

## Binary Sensor

The `ping` binary sensor platform allows you to use `ping` to send ICMP echo requests. This way you can check if a given host is online and determine the round trip times from your Home Assistant instance to that system.

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ping
    host: 192.168.0.1
```

{% configuration %}
host:
  description: The IP address or hostname of the system you want to track.
  required: true
  type: string
count:
  description: Number of packages to be sent up to a maximum of 100.
  required: false
  type: integer
  default: 5
name:
  description: Let you overwrite the name of the device.
  required: false
  type: string
  default: Ping [hostname]
{% endconfiguration %}

The sensor exposes the different round trip times values measured by `ping` as attributes:

- `round_trip_time_mdev`
- `round_trip_time_avg`
- `round_trip_time_min`
- `round_trip_time_max`

The default polling interval is 5 minutes. As many integrations [based on the entity class](/docs/configuration/platform_options), it is possible to overwrite this scan interval by specifying a `scan_interval` configuration key (value in seconds). In the example below we setup the `ping` binary sensor to poll the device every 30 seconds.

```yaml
# Example configuration.yaml entry to ping host 192.168.0.1 with 2 packets every 30 seconds.
binary_sensor:
  - platform: ping
    host: 192.168.0.1
    name: "device name"
    count: 2
    scan_interval: 30
```

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
device_tracker:
  - platform: ping
    hosts:
      device_name_1: 192.168.2.10
```

{% configuration %}
hosts:
  description: Map of device names and their corresponding IP address or hostname. Device names must conform to the standard requirements of lower case, numbers and underscore only - see [entity names](/docs/configuration/troubleshooting/#entity-names).
  required: true
  type: map
count:
  description: Number of packet used for each device (avoid false detection).
  required: false
  type: integer
{% endconfiguration %}

See the [person integration page](/integrations/person/) for instructions on how to configure the people to be tracked.
