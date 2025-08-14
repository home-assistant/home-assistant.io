---
title: NETGEAR
description: Instructions on how to integrate NETGEAR routers into Home Assistant.
ha_category:
  - Presence detection
  - Update
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_domain: netgear
ha_platforms:
  - button
  - device_tracker
  - sensor
  - switch
  - update
ha_config_flow: true
ha_codeowners:
  - '@hacf-fr'
  - '@Quentame'
  - '@starkillerOG'
ha_ssdp: true
ha_integration_type: integration
---

This platform allows you to detect presence by looking at connected devices to a [NETGEAR](https://www.netgear.com/) device and control the NETGEAR device.
Both routers and access points can be used with this integration. Some access points will not be automatically discovered and need to be set up manually.
Attached devices are only tracked on NETGEAR devices set to the router mode, otherwise, duplicate entities will occur from access points that also report the same devices.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Consider_home:
  description: "The consider home time is the number of seconds to wait till marking someone as not home after not being seen. This parameter is most useful for households with Apple iOS devices that go into sleep mode while still at home to conserve battery life. iPhones will occasionally drop off the network and then re-appear. This option helps prevent false alarms in presence detection."
{% endconfiguration_basic %}

## Router entities

The NETGEAR router will have the following entities.

Note that not all routers support all features, if a router does not support a feature, the corresponding entity will have the unavailable status even when the entity is disabled.

You might also see the following error in the log `404 service '...', method '...' not found`, to prevent these errors, keep the unsupported entities disabled.

All possibly unsupported entities are disabled by default.

### Reboot button

Button entity to restart the router.

### Update entity

Update entity to view current and latest firmware version, and install the latest firmware of the router.

### Traffic meter data

The total and average amount of downloaded/uploaded data through the router can be tracked per day/week/month.
In order for these entities to display the data (instead of 0), the "Traffic Meter" should be enabled in the router settings.
Enable the `Traffic Meter` switch entity and turn it on.

### Router feature switches

The following router features can be turned on/off, and the status can be read:

- Access Control
- Traffic Meter
- Parental Control
- Quality of Service
- 2.4G Guest Wifi
- 5G Guest Wifi
- Smart Connect

### Speed test data

The "Average Ping", "Downlink Bandwidth," and "Uplink Bandwidth" can be tracked by performing a speed test every 2 hours.
If these sensor entities are enabled, they will first show previous results on integration load. The first new speed tests happens 2 hours after the integration loads.
The speed test interval is chosen to be 2 hours not to put unnecessary load on the network and reduce data usage.
When one or more of the three sensors is enabled, the speed tests will be performed. Note that this can cause high data usage depending on your internet connection speed which might be relevant when using metered/limited networks.

### Ethernet link status

The Ethernet link status sensor indicates if the router is currently able to connect to the internet.

### Utilization sensors

CPU and memory utilization sensors in percentage of available resources of the router.

## Connected device entities

For each device connected to the NETGEAR router the following entities will be available:

### Device tracker

Displays if the device is currently connected to the router (Home) or not (Away).

### Allowed on Network

Switch that lets you Allow or Block a device on the Network.
For this entity to actually Block the device, "Access Control" needs to be turned on in the Router settings.
Enable the `Access Control` switch entity and turn it on.

### Signal strength

Displays the wifi signal strength of the device.

### Link rate

Displays the current link rate of the device indicating the maximum possible data speed with the current connection.

### Link type

Displays the current link type: wired, 2.4GHz or 5GHz.

## Troubleshooting

- If you get a "Connection or login error" when trying to setup the NETGEAR integration, please try using the IP address of the router (often "192.168.1.1") as host instead of the default "routerlogin.net".
