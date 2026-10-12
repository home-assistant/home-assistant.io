---
title: Ping (ICMP)
description: Instructions on how to use ICMP ping checks in Home Assistant.
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
ha_integration_type: service
ha_config_flow: true
ha_codeowners:
  - '@jpbede'
---

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensors](#sensors)
- [Presence detection](#presence-detection)

{% include integrations/config_flow.md %}

The setup dialog asks for the following information:

{% configuration_basic %}
Host:
  description: The hostname or IP address of the device you want Home Assistant to ping.
{% endconfiguration_basic %}

## Adding a device to the integration

Before you add a device, give it a stable network address. Use a static IP address or a DHCP reservation in your router for the device you want to ping. If the address changes, Home Assistant keeps checking the old address.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Add integration**.
2. Search for and select **Ping**.
3. Select **Add service**.
4. In **Host**, enter the hostname or IP address of the device.
5. Select **Submit**.
6. Optional: Change the default device name or add the device to an area.
7. Select **Finish**.

## Polling interval

By default, the integration will ping the device every 30 seconds.
If you wish to do a ping at a different interval, you can disable the automatic refresh in the integration's system options (Enable polling for updates) and create your own automation with your desired frequency.

For more detailed steps on how to define a custom interval, follow the procedure below.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Host:
  description: The hostname or IP address of the device you want Home Assistant to ping.
Ping count:
  description: The number of echo requests to send to the target. The default is 5.
Consider home:
  description: The number of seconds that must elapse before considering a disconnected device "not at home". The default is 180 seconds (3 minutes).
{% endconfiguration_basic %}

## Binary sensor

The binary sensor sends ICMP echo requests so you can check whether a device (or host at a specific IP address) is reachable and determine the round trip times from your Home Assistant instance to that host.
This sensor is enabled by default. The default polling interval is 30 seconds.

## Sensors

The integration exposes the different round trip times milliseconds as entities:

- `Round Trip Time Mean Deviation` - the standard deviation
- `Round Trip Time Average` - the average round trip time
- `Round Trip Time Minimum` - the shortest round trip time
- `Round Trip Time Maximum` - the longest round trip time
- `Jitter` - the variation in round trip times
- `Packet loss` - the percentage of missed ICMP replies

**These entities are disabled by default and can be enabled in the UI if needed.**

## Presence detection

Use ping presence detection to check whether a device can be reached on your network and use that as a presence signal (for example, `home` or `not_home`). This can help when you want presence detection for a phone, tablet, or other device connected to your home network.

When you add a device or address to the integration, Home Assistant creates different entities for different uses:

- The binary sensor is enabled by default and shows whether the device or address is reachable.
- The device tracker is disabled by default and provides the presence state, such as `home` or `not_home`.

To use ping for presence detection, enable the device tracker entity:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Ping** integration.
2. Select the device or address you want to track.
3. To see all entities, under **Diagnostic** select **N disabled entities**.
4. Select the entity with the person icon {% icon "mdi:account" %}, select the cogwheel {% icon "mdi:cog-outline" %}, then turn on **Enable**.
5. Select **Update**.

The device trackers are [connection trackers](/integrations/device_tracker/#connection-trackers). They have the `tracking_type` state attribute set to `connection` and report whether a device is connected to the associated zone, which is the home zone by default. They do not provide latitude or longitude attributes. For a simple home presence check in an automation, use a state condition that checks whether the tracker is `home`.

{% note %}
Phones may turn off Wi-Fi when they are idle. A single ping tracker may not be reliable on its own.
{% endnote %}

For person-based presence detection, add the ping device tracker to a [person](/integrations/person/) entity. You can combine it with other trackers for the same person, such as a tracker from the Home Assistant Companion app or a router integration. This lets Home Assistant use more than one signal to decide whether the person is home.

If you only need one on/off presence signal from multiple ping devices or addresses and do not use person entities, create a [binary sensor group](/integrations/group/#binary-sensor-light-and-switch-groups) {% term helper %} from the ping binary sensor entities. By default, the group is `on` when at least one grouped device is reachable.

### How ping presence detection works

The integration checks presence by sending ICMP echo requests to the configured hostname or IP address. It can work for devices that block UDP or TCP packets but still answer ICMP requests, such as some Android phones.

Because ping uses the configured address, it does not need the device MAC address. This can help with devices on another subnet, where methods that depend on ARP, such as some network scans, do not work.
