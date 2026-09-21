---
title: Mitsubishi Comfort
description: Integrate Mitsubishi Electric ductless minisplit heat pump and air conditioning systems with Home Assistant.
ha_category:
  - Climate
ha_release: 2026.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@nikolairahimi'
ha_domain: mitsubishi_comfort
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: bronze
ha_dhcp: true
---

The **Mitsubishi Comfort** {% term integration %} connects Mitsubishi Electric ductless minisplit heat pump and air conditioning systems to Home Assistant. It communicates directly with each indoor unit over your local network for low-latency control, using the Kumo Cloud account only for initial device discovery and credential retrieval.

This integration supports indoor units (full climate control) and Kumo Station outdoor units (temperature monitoring only).

## Supported devices

- **Indoor unit** (ductless, ducted)
  - Controls: mode, temperature, fan speed, vane direction
  - Sensors: temperature, humidity, filter status, Wi-Fi signal
- **Kumo Station** (outdoor unit, read-only)
  - Sensors: outdoor temperature, Wi-Fi signal

## Prerequisites

- A [Kumo Cloud](https://app.kumocloud.com) account with your Mitsubishi devices registered
- Devices must be connected to your local network via their Wi-Fi adapters
- During setup you will be asked to enter the **username** and **password** for your Kumo Cloud account. The integration uses these credentials to discover your devices and retrieve the local API passwords needed for direct communication.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: The email address for your Kumo Cloud account.
Password:
  description: The password for your Kumo Cloud account.
{% endconfiguration_basic %}

## Finding device IP addresses

The Kumo Cloud account provides the device list and credentials, but never a device's local IP address. The integration finds each address automatically through DHCP discovery—including devices that were already seen on the network before the integration was set up—and records the new address when a device's IP changes. Automatic discovery works when your devices are on the same network as Home Assistant.

If a device is on a different subnet or VLAN, DHCP discovery cannot reach it. The device then has no entities yet, and the integration raises a repair issue where you can enter the IP address manually:

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %}.
2. Select the **Mitsubishi Comfort devices have no local IP address** issue.
3. Enter the local IP address for each listed device. Each field is labeled with the device's MAC address.
4. Leave a field blank to keep waiting for DHCP discovery for that device.

{% tip %}
If you set an IP address manually, give the device a fixed IP address in your router (a DHCP reservation) so the address does not change over time.
{% endtip %}

## Supported functionality

The **Mitsubishi Comfort** integration provides the following entities.

### Climate

Each indoor unit is exposed as a climate entity with the following capabilities:

- **HVAC modes**: Off, Cool, Heat, Dry, Fan only, Heat/Cool (auto)
  - Availability depends on the specific unit.
- **Fan modes**: Super quiet, Quiet, Low, Powerful, Super powerful, Auto
  - The number of available speeds depends on the unit.
- **Swing modes**: Horizontal, Mid-Horizontal, Midpoint, Mid-Vertical, Vertical, Auto, Swing
  - Availability depends on the unit.
- **Temperature**: Single setpoint in Cool and Heat modes, separate high and low setpoints in Heat/Cool (auto) mode.
  - Temperature ranges vary by unit and mode.

## Data updates

The Mitsubishi Comfort integration {% term polling polls %} the status of your devices every 60 seconds. When you send a command (such as changing the mode or adjusting the temperature), Home Assistant reflects the change straight away, without waiting for the next poll.

## Troubleshooting

### Devices show up without entities or stay unavailable

A device has no entities until its local IP address is known. The integration normally finds the address through DHCP discovery, which only works when the device is on the same network as Home Assistant. While any device lacks an address, the integration raises a repair issue where you can enter it manually. See [Finding device IP addresses](#finding-device-ip-addresses).

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration stops all polling and closes connections to the devices. Your Kumo Cloud account and device settings are not affected.
