---
title: Ping (ICMP)
description: Instructions on how to integrate Ping (ICMP)-based into Home Assistant.
ha_category:
  - Binary sensor
  - Network
  - Presence detection
ha_release: 0.43
ha_iot_class: Local Polling
ha_quality_scale: internal
ha_domain: ping
ha_platforms:
  - binary_sensor
  - device_tracker
  - sensor
ha_integration_type: integration
ha_config_flow: true
ha_codeowners:
  - '@jpbede'
---

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensors](#sensors)
- [Presence detection](#presence-detection)

{% include integrations/config_flow.md %}

## Polling interval

By default, the integration will ping the device every 30 seconds. 
If you wish to do a ping at a different interval, you can disable the automatic refresh in the integration's system options (Enable polling for updates) and create your own automation with your desired frequency.

For more detailed steps on how to define a custom interval, follow the procedure below.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Integration options

It is possible to change some behaviors through the integration options.
To change the settings, go to {% my integrations title="**Settings** > **Devices & services**" %}. Select the **Ping** integration, then select **Configure**.

- **Ping count**: Number of echo requests to send to the target. The default is 5.
- **Consider home**: Number of seconds that must elapse before considering a disconnected device "not at home". The default is 180 seconds (3 minutes).

## Binary sensor

The `ping` binary sensor platform allows you to use `ping` to send ICMP echo requests. This way you can check if a given host is online and determine the round trip times from your Home Assistant instance to that system.
This sensor is enabled by default. The default polling interval is 30 seconds.

## Sensors

The integration exposes the different round trip times milliseconds as entities:

- `Round Trip Time Mean Deviation` - the standard deviation
- `Round Trip Time Average` - the average round trip time
- `Round Trip Time Minimum` - the shortest round trip time
- `Round Trip Time Maximum` - the longest round trip time

**These entities are disabled by default and can be enabled in the UI if needed.**

{% note %}
When run on Windows systems, the round trip time attributes are rounded to the nearest millisecond and the mdev value is unavailable.
{% endnote %}

## Presence detection

The `ping` device tracker platform offers presence detection by using `ping` to send ICMP echo requests. This can be useful when devices are running a firewall and are blocking UDP or TCP packets but responding to ICMP requests (like Android phones). This tracker doesn't need to know the MAC address since the host can be on a different subnet. This makes this an option to detect hosts on a different subnet when `nmap` or other solutions don't work since `arp` doesn't work.

The device tracker is disabled by default and can be enabled in the UI.

{% note %}
Please keep in mind that modern smart phones will usually turn off WiFi when they are idle. Simple trackers like this may not be reliable on their own.
{% endnote %}

See the [person integration page](/integrations/person/) for instructions on how to configure the people to be tracked.
