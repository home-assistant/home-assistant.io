---
title: Starlink
description: Instructions on how to integrate Starlink into Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Network
  - Sensor
  - Switch
ha_release: 2023.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@boswelja'
ha_domain: starlink
ha_platforms:
  - binary_sensor
  - button
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: silver
---

The Starlink integration allows you to integrate your [Starlink](https://www.starlink.com/) into Home Assistant.

**Important:** If your Starlink is in bypass mode, you will need to open a route to it so that the local API can be accessed. Otherwise this integration will not work.

{% include integrations/config_flow.md %}

### Sensor

- Ping - The ping that Starlink has measured, in ms
- Azimuth - The direction Dishy is facing in degrees
- Elevation - Dishy's current elevation in degrees
- Uplink throughput - The amount of data being uploaded through Starlink in Bit/s
- Downlink throughput - The amount of data being downloaded through Starlink in Bit/s
- Last boot time - The time Starlink was last turned on

### Binary Sensor

- Obstructed - Whether Dishy is currently obstructed
- Roaming - Whether Starlink is "roaming". Roaming is an optional upgrade that allows you to use your Starlink outside of your home address. It is also known as "portability"
- Heating - Whether Dishy is currently heating. This may be due to cold temperatures, or an attempt to thaw snow and ice
- Idle - Whether Starlink is in an "idle" state to save power
- Mast near vertical - Whether Dishy is mounted straight
- Motors stuck - Whether Dishy is unable to move
- Thermal throttle - Whether Starlink has reduced performance to avoid overheating
- Unexpected location - Whether Starlink has detected operation outside of its designated area

### Button

- Reboot - Reboots your Starlink system

### Switch

- Stowed - Controls whether Dishy is stowed
