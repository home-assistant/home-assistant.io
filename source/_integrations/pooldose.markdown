---
title: SEKO PoolDose
description: Connect your SEKO PoolDose water treatment system to Home Assistant.
ha_category:
  - Water Management
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: "2025.9"
ha_codeowners:
  - '@lmaertin'
ha_domain: pooldose
ha_platforms:
  - sensor
ha_integration_type: integration
---

The PoolDose integration connects a [SEKO](https://www.seko.com/) water treatment system with Home Assistant. SEKO is a manufacturer of various monitoring and control devices for pools and spas.

This integration uses an undocumented local HTTP API. It provides live readings for pool sensors such as temperature, pH, ORP/Redox, as well as configuration  parameters.

## Prerequisites

1. Install and set-up the PoolDose device according to its user manual.
   1. In particular, connect the device to your Wi-Fi network.
   2. Identify the IP address or hostname of the device.
2. Browse to the IP address resp. hostname. Use HTTP and port 80.
   1. Log in to the web interface.
   2. Verify that sensor data is displayed, such as water temperature or pH values shown as gauges.
   3. Deactivate the device password, i.e., set it to 0000.
3. Optional: Block the device’s internet access to guarantee fully local operation and prevent potentially breaking firmware updates.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address resp. hostname of your device. Identify the IP address resp. hostname in the web interface of the device or of your router.
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Data updates

This integration {% term polling polls %} data from the device every 10 minutes (600 seconds) by default. This polling interval is configured to balance data freshness with device stability:

- The device does not support frequent requests and may become unstable with shorter intervals
- Physical water treatment values typically change slowly and do not require frequent monitoring
- This interval provides adequate monitoring for pool water management while maintaining device reliability

## Supported devices

The following devices are known to be supported by the integration:

- SEKO PoolDose Dual/Double (API v1)

## Supported functionality

### Sensor entities

| Identifier | Unit | Description | States |
|--------|------|-------------|--------|
| **temperature** | °C/°F | water temperature | — |
| **ph** | — | pH value | — |
| **orp** | mV | Current ORP (Redox) value | — |
| **ph_type_dosing** | — | Type of pH dosing being used | pH+, pH- |
| **peristaltic_ph_dosing** | — | pH peristaltic dosing mode | Off, Proportional, On/Off, Timed |
| **ofa_ph_value** | min | Time threshold for pH overfeed alerts | — |
| **orp_type_dosing** | — | Type of ORP dosing being used | Low, High |
| **peristaltic_orp_dosing** | — | ORP peristaltic dosing mode | Off, Proportional, On/Off, Timed |
| **ofa_orp_value** | min | Time threshold for ORP overfeed alerts | — |
| **ph_calibration_type** | — | Type of pH calibration being used | Off, Reference, 1 point, 2 points |
| **ph_calibration_offset** | mV | pH calibration offset value | — |
| **ph_calibration_slope** | mV | pH calibration slope value | — |
| **orp_calibration_type** | — | Type of ORP calibration being used | Off, Reference, 1 point |
| **orp_calibration_offset** | mV | ORP calibration offset value | — |
| **orp_calibration_slope** | mV | ORP calibration slope value | — |

## Troubleshooting

### Device not found

#### Symptom: "Device could not be found on the network"

When trying to set up the integration, you receive an error that the device cannot be found.

##### Description

The device may not be properly connected to your network or may be using a different hostname than expected.

##### Resolution

To resolve this issue, try the following steps:

1. Check that your device is powered on and connected to your Wi-Fi network.
2. Look for a device called "kommspot" in your router's device list or DHCP client table.
3. Use the IP address shown for "kommspot" in the integration setup.
4. Ensure the device and Home Assistant are on the same network segment.

### Connection refused

#### Symptom: "Connection refused" or authentication errors

The integration cannot connect to the device even though it's found on the network.

##### Description

This typically occurs when the device's web interface password is not set to the default value resp. deactivated.

##### Resolution

To resolve this issue:

1. Browse to the device's IP address using a web browser.
2. Log in to the web interface.
3. Set the password to the default value (0000) or deactivate password protection.
4. Try setting up the integration again.

### Unstable connection

#### Symptom: Entities frequently become unavailable

Sensor entities show as "unavailable" intermittently, especially during certain times of day.

##### Description

This is normal behavior for the PoolDose device. When the circulation pump is not running, the device enters a kind of sleep mode and becomes less responsive to network requests.

##### Resolution

This behavior is expected and does not indicate a problem with the integration:

1. The integration uses cached values when the device is temporarily unresponsive.
2. Entities will return to normal once the device becomes responsive again.
3. Consider this behavior when creating automations that depend on these sensors.
