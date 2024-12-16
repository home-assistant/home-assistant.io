---
title: Starlink
description: Instructions on how to integrate Starlink into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Device tracker
  - Network
  - Sensor
  - Switch
  - Time
ha_release: 2023.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@boswelja'
ha_domain: starlink
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - sensor
  - switch
  - time
ha_integration_type: integration
---

The Starlink integration allows you to integrate your [Starlink](https://www.starlink.com/) into Home Assistant.

**Important:** If your Starlink is in bypass mode, you will need to open a route to it so that the local API can be accessed. Otherwise this integration will not work.

{% include integrations/config_flow.md %}

### Sensor

- Ping - The ping that Starlink has measured, in ms
- Ping drop rate - The percentage of failed ping requests (aka "dropped"). This is the inverse of "Uptime" in the Starlink app.
- Azimuth - The direction Dishy is facing in degrees
- Elevation - Dishy's current elevation in degrees
- Uplink throughput - The amount of data being uploaded through Starlink
- Downlink throughput - The amount of data being downloaded through Starlink
- Last boot time - The time Starlink was last turned on
- Upload - Total number of bytes uploaded from the user terminal since reboot
- Download - Total number of bytes downloaded to the user terminal since reboot
- Power - Last measured power [W]
- Energy - Measured energy consumption since reboot [kWh]

### Binary sensor

- Update available - Whether there is an update pending install
- Obstructed - Whether Dishy is currently obstructed
- Roaming mode - Whether Starlink is "roaming". Roaming is an optional upgrade that allows you to use your Starlink outside of your home address. It is also known as "portability mode"
- Heating - Whether Dishy is currently heating. This may be due to cold temperatures, or an attempt to thaw snow and ice
- Idle - Whether Starlink is "sleeping", as per the schedule defined in the Starlink app
- Mast near vertical - Whether Dishy is mounted straight
- Motors stuck - Whether Dishy is unable to move
- Slow ethernet - Whether the Ethernet link is at max (gigabit) speed
- Thermal throttle - Whether Starlink has reduced performance to avoid overheating
- Unexpected location - Whether Starlink has detected operation outside of its designated area

### Button

- Reboot - Reboots your Starlink system

### Switch

- Stowed - Controls whether Dishy is stowed
- Sleep schedule - Controls whether Starlink will enter a power-saving sleep mode at a predefined schedule

### Device tracker

- Device location - Tracks the latitude, longitude, and altitude of Dishy. You need to allow location access on the local network via the Starlink app for this to work. This is disabled by default in the Starlink app and is thus disabled by default in Home Assistant.

### Time

- Sleep start - The time at which Starlink will enter sleep mode, if "Sleep Schedule" is enabled
- Sleep end - The time at which Starlink will exit sleep mode, if "Sleep Schedule" is enabled
