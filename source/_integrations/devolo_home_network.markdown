---
title: devolo Home Network
description: Instructions on how to integrate devolo Home Network devices with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Image
  - Presence detection
  - Sensor
  - Switch
  - Update
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
  - button
  - device_tracker
  - diagnostics
  - image
  - sensor
  - switch
  - update
ha_zeroconf: true
ha_integration_type: device
---

The devolo Home Network integration allows you to monitor your PLC network.

{% include integrations/config_flow.md %}

## Device types

Currently the following device types within Home Assistant are supported.

### Binary sensors

- Device attached to the router
  - Updates every 5 minutes
  - Is disabled by default because it typically rarely changes

### Buttons

- Identify a PLC device by making its LED blink for 2 minutes
- Start pairing on a PLC device
- Restart the device
- Start WPS

### Images

- QR code of your guest Wi-Fi credentials
  - Updates every 15 seconds if changes are detected
  - Is enabled by default

### Presence detection

- Detect presence of devices connected to the main or the guest Wi-Fi
  - Updates every 15 seconds
  - Automatically adds new devices as disabled entities unless disabled via system option

### Sensors

- Number of connected Wi-Fi clients
  - Updates every 15 seconds
  - Is enabled by default
- Number of neighbored Wi-Fi networks
  - Updates every 5 minutes
  - Is disabled by default because it runs quite long
- Number of PLC devices in the same PLC network
  - Updates every 5 minutes
  - Is disabled by default because it typically rarely changes
- PLC PHY rates
  - Updates every 5 minutes
  - PHY rates to/from the device attached to the router are enabled by default. PHY rates between all other devices are disabled by default.

### Switch

- Turn on/off guest Wi-Fi
  - Is enabled by default
- Turn on/off the device LEDs
  - Is enabled by default

### Update

- Update the firmware of a device.
  - Is enabled by default but will only give a result if regular checks are enabled on the device.

## Supported devolo Devices

The list of supported devolo devices depends on the device firmware and the device features. The following devices were tested running firmware 5.6.0:

- Magic 2 WiFi 6
- Magic 2 WiFi next
- Magic 2 WiFi 2-1
- Magic 1 WiFi mini
- Magic 1 WiFi 2-1
- WiFi 6 Repeater 5400
- WiFi 6 Repeater 3000
- WiFi Repeater+ ac
- dLAN 1200+ WiFi ac
- dLAN 550+ Wifi
- dLAN 550 WiFi

Since firmware 7.10 also the following device without Wi-Fi can be used as long as the corresponding entities are supported:

- Magic 2 LAN triple
- Magic 2 DinRail
- Magic 2 LAN 1-1
- Magic 1 LAN 1-1
