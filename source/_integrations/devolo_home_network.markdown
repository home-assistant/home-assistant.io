---
title: devolo Home Network
description: Instructions on how to integrate devolo Home Network devices with Home Assistant.
ha_category:
  - Binary Sensor
  - Presence Detection
  - Sensor
  - Switch
ha_release: '2021.12'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@2Fake'
  - '@Shutgun'
ha_domain: devolo_home_network
ha_quality_scale: platinum
ha_platforms:
  - binary_sensor
  - device_tracker
  - diagnostics
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: device
---

The devolo Home Network integration allows you to monitor your PLC network.

{% include integrations/config_flow.md %}

## Device Types

Currently the following device types within Home Assistant are supported.

### Binary Sensors

* Device attached to the router
  * Updates every 5 minutes
  * Is disabled by default because it typically rarely changes

### Presence Detection

* Detect presence of devices connected to the main or the guest wifi
  * Updates every 10 seconds
  * Automatically adds new devices as disabled entities unless disabled via system option

### Sensors

* Number of connected wifi clients
  * Updates every 10 seconds
  * Is enabled by default
* Number of neighbored wifi networks
  * Updates every 5 minutes
  * Is disabled by default because it runs quite long
* Number of PLC devices in the same PLC network
  * Updates every 5 minutes
  * Is disabled by default because it typically rarely changes

### Switch

* Turn on/off guest wifi
  * Is enabled by default
* Turn on/off the device LEDs
  * Is enabled by default

## Supported devolo Devices

The list of supported devolo devices depends on the device firmware and the device features. The following devices were tested running firmware 5.6.0:

* Magic 2 WiFi 6
* Magic 2 WiFi next
* Magic 2 WiFi 2-1
* Magic 1 WiFi mini
* Magic 1 WiFi 2-1
* WiFi 6 Repeater 5400
* WiFi 6 Repeater 3000
* WiFi Repeater+ ac
* dLAN 1200+ WiFi ac
* dLAN 550+ Wifi
* dLAN 550 WiFi

Since firmware 7.10 also the following device without Wifi can be used as long as the corresponding entities are supported:

* Magic 2 LAN triple
* Magic 2 DinRail
* Magic 2 LAN 1-1
* Magic 1 LAN 1-1
