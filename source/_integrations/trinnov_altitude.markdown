---
title: Trinnov Altitude
description: Instructions for setting up the Trinnov Altitude integration in Home Assistant.
ha_category:
  - Media player
  - Remote
  - Sensor
ha_iot_class: Local Push
ha_release: '2026.4'
ha_domain: trinnov_altitude
ha_codeowners:
  - '@binarylogic'
ha_config_flow: true
ha_platforms:
  - media_player
  - remote
  - sensor
  - switch
  - select
  - number
  - button
ha_integration_type: device
---

The **Trinnov Altitude** integration lets Home Assistant control and monitor Trinnov Altitude processors over your local network.

The integration supports power control (including Wake-on-LAN when a MAC address is configured), source and preset selection, volume and mute controls, and device status sensors.

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: Hostname or IP address of your Trinnov Altitude processor.
mac:
  description: Optional MAC address used for Wake-on-LAN power on.
{% endconfiguration_basic %}

## Supported functionality

- Power on/off
- Source and preset selection
- Upmixer mode selection
- Volume and mute control
- Device state and status sensors
- Remote command passthrough for advanced control

## Known behavior

- To power on from Home Assistant, configure the device MAC address during setup.
- After power-on, wait until the remote entity becomes `on` before sending additional commands.
- The integration requires the Trinnov device to be reachable on your local network.

## Troubleshooting

If setup fails:

- Confirm the Trinnov Altitude is powered and reachable from Home Assistant.
- Verify the host/IP is correct.
- If Wake-on-LAN is used, verify the MAC address format (`00:11:22:33:44:55`).
