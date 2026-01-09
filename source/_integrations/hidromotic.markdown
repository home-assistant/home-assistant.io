---
title: Hidromotic
description: Instructions on how to integrate Hidromotic CHI Smart irrigation controllers with Home Assistant.
ha_category:
  - Binary sensor
  - Irrigation
  - Sensor
  - Switch
ha_release: 2025.2
ha_iot_class: Local Push
ha_codeowners:
  - '@bulju'
ha_domain: hidromotic
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **Hidromotic** {% term integration %} allows you to control and monitor [Hidromotic](https://www.hidromotic.com/) CHI Smart irrigation controllers from Home Assistant. These controllers are designed for automated flooding irrigation systems commonly used in agriculture and gardens.

## Supported devices

The following devices are supported by this integration:

- **CHI Smart** - Full-featured irrigation controller with support for multiple zones, tanks, and pump control
- **CHI Smart Mini** - Compact version with fewer flooding zones, occupying 3 DIN module spaces

## Prerequisites

Before setting up this integration, ensure that:

1. Your Hidromotic device is powered on and connected to your local network
2. You know the IP address of your device. You can find this in your router's DHCP client list or by using the Hidromotic mobile app
3. Home Assistant can reach the device on your network. This typically means both devices need to be on the same network, unless you have configured advanced routing

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your Hidromotic device on your local network."
{% endconfiguration_basic %}

## Supported functionality

### Switches

The integration creates switch entities for:

- **Zone switches** - Control each irrigation zone individually. Turn on to start irrigation, turn off to stop
- **Auto Irrigation** - Enable or disable the automatic irrigation schedule programmed on the device

### Sensors

- **Pump status** - Shows the current state of the pump. The integration reports the following status values: `off`, `on`, `recovery`, and `no_water` (no water detected)
- **Tank level** - Shows the water level status for each tank. The integration reports the following status values: `full`, `empty`, `medium`, `sensor_fail` (sensor failure), and `level_fail` (invalid or out-of-range level reading)

### Binary sensors

- **Tank full** - Indicates when a tank is full
- **Tank empty** - Indicates when a tank is empty

## Data updates

The integration uses WebSocket connections for real-time updates. When the device state changes (zones turning on/off, tank levels changing, pump status updates), Home Assistant is notified immediately via push notifications from the device.

## Known limitations

- The integration requires the device to be on the local network. Cloud or remote access is not supported
- Zone schedules and timers are configured on the device itself and cannot be modified through Home Assistant. Use the Auto Irrigation switch to enable or disable the programmed schedules

## Troubleshooting

### Cannot connect to device

If you see a "Failed to connect" error during setup:

1. Verify the IP address is correct
2. Ensure the device is powered on and connected to your network
3. Check that Home Assistant can reach the device (try pinging the IP address)
4. Make sure no firewall is blocking WebSocket connections (port 80)

### Device becomes unavailable

If the device shows as unavailable after working initially:

1. Check that the device is still powered on
2. Verify the network connection to the device
3. The device may have obtained a new IP address - check your router's DHCP leases
4. Consider assigning a static IP address to the device to prevent this issue

## Removing the integration

This integration follows standard integration removal. No additional cleanup is required on the device.

{% include integrations/remove_device_service.md %}

