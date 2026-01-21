---
title: SEKO PoolDose
description: Connect your SEKO PoolDose water treatment system to Home Assistant.
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
  - Water Management
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: '2025.9'
ha_codeowners:
  - '@lmaertin'
ha_domain: pooldose
ha_platforms:
  - binary_sensor
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: silver
ha_dhcp: true
---

The **SEKO PoolDose** {% term integration %} connects a [SEKO](https://www.seko.com/) water treatment system with Home Assistant. SEKO is a manufacturer of various monitoring and control devices for pools and spas.

This integration uses an undocumented local HTTP API. It provides live readings for pool sensors such as temperature, pH, ORP/Redox, alarm status, relay states, as well as configuration parameters.

## Prerequisites

1. Install and set up the PoolDose device according to its user manual.
   1. In particular, connect the device to your Wi-Fi network.
   2. Identify the IP address or hostname of the device.
2. Browse to the IP address or hostname. Use HTTP and port 80.
   1. Log in to the web interface.
   2. Verify that sensor data is displayed, such as water temperature or pH values shown as gauges.
   3. Deactivate the device password, that is, set it to 0000.
3. Optional: Block the device’s internet access to guarantee fully local operation and prevent potentially breaking firmware updates.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your device. Identify this in the web interface of the device or of your router.
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Data updates

This integration {% term polling polls %} data from the device every 10 minutes (600 seconds) by default. This polling interval is configured to balance data freshness with device stability:

- The device does not support frequent requests and may become unstable with shorter intervals
- Physical water treatment values typically change slowly and do not require frequent monitoring
- This interval provides adequate monitoring for pool water management while maintaining device reliability

### Update and write behavior

Parallel reads for read-only values are avoided and write operations are serialized (one value at a time). This reduces load on the device's limited hardware and prevents race conditions.

## Supported devices

The following devices are known to be supported by the integration:

- SEKO PoolDose Double
- VÁGNER POOL VA DOS BASIC
- VÁGNER POOL VA DOS EXACT

## Supported functionality

This integration provides the following entities.

### Binary sensors

- **Recirculation pump alarm**: Recirculation pump issue.
- **pH tank level alarm**: Low pH dosing solution level.
- **ORP tank level alarm**: Low ORP dosing solution level.
- **Chlorine tank level alarm**: Low chlorine dosing solution level.
- **Flow rate alarm**: Water flow issues.
- **pH overfeed alarm**: Excessive pH dosing detected.
- **ORP overfeed alarm**: Excessive ORP dosing detected.
- **Alarm relay**: Main alarm relay state.
- **Auxiliary relay 1**: Auxiliary relay 1 output state.
- **Auxiliary relay 2**: Auxiliary relay 2 output state.
- **Auxiliary relay 3**: Auxiliary relay 3 output state.

### Sensors

- **Temperature**: Water temperature.
  - **Unit**: °C, °F
- **pH**: pH value.
- **ORP**: Current ORP (Redox) value.
  - **Unit**: mV
- **Chlorine**: Chlorine concentration.
  - **Unit**: ppm
- **Flow rate**: Water flow rate.
  - **Unit**: L/s, m³/h
- **pH type dosing**: Type of pH dosing being used.
  - **Values**: pH+, pH-
- **Peristaltic pH dosing**: pH peristaltic dosing mode.
  - **Values**: Off, Proportional, On/Off, Timed
- **Overfeed alert pH time**: Time threshold for pH overfeed alerts.
  - **Unit**: min
- **ORP type dosing**: Type of ORP dosing being used.
  - **Values**: Low, High
- **Peristaltic ORP dosing**: ORP peristaltic dosing mode.
  - **Values**: Off, Proportional, On/Off, Timed
- **Chlorine type dosing**: Type of chlorine dosing being used.
  - **Values**: Low, High
- **Peristaltic chlorine dosing**: Chlorine peristaltic dosing mode.
  - **Values**: Off, Proportional, On/Off, Timed
- **Overfeed alert ORP time**: Time threshold for ORP overfeed alerts.
  - **Unit**: min
- **pH calibration type**: Type of pH calibration being used.
  - **Values**: Off, Reference, 1 point, 2 points
- **pH calibration offset**: pH calibration offset value.
  - **Unit**: mV
- **pH calibration slope**: pH calibration slope value.
  - **Unit**: mV
- **ORP calibration type**: Type of ORP calibration being used.
  - **Values**: Off, Reference, 1 point
- **ORP calibration offset**: ORP calibration offset value.
  - **Unit**: mV
- **ORP calibration slope**: ORP calibration slope value.
  - **Unit**: mV
- **Totalizer**: Total water volume accumulated.
  - **Unit**: L, m³

### Numbers

- **pH target**: Target pH value for automatic dosing control.
- **ORP target**: Target ORP (Redox) value for automatic dosing control.
  - **Unit**: mV
- **Chlorine target**: Target chlorine concentration for automatic dosing control.
  - **Unit**: ppm
- **pH overfeed alarm lower limit**: Lower threshold for pH overfeed detection.
- **pH overfeed alarm upper limit**: Upper threshold for pH overfeed detection.
- **ORP overfeed alarm lower limit**: Lower threshold for ORP overfeed detection.
  - **Unit**: mV
- **ORP overfeed alarm upper limit**: Upper threshold for ORP overfeed detection.
  - **Unit**: mV
- **Chlorine overfeed alarm lower limit**: Lower threshold for chlorine overfeed detection.
  - **Unit**: ppm
- **Chlorine overfeed alarm upper limit**: Upper threshold for chlorine overfeed detection.
  - **Unit**: ppm

### Switches

- **Pause dosing**: Pauses or resumes the dosing process.
- **Pump monitoring**: Enables or disables pump monitoring.
- **Frequency input**: Enables or disables frequency input for a water meter.

### Selects

- **Water meter unit**: Water meter measurement unit.
  - **Options**: Liters, Cubic meters
- **Flow rate unit**: Flow rate measurement unit.
  - **Options**: Cubic meters per hour, Liters per second
- **pH dosing type**: pH dosing type.
  - **Options**: pH+ / alcalyne, pH- / acid
- **pH dosing method**: pH dosing control method.
  - **Options**: Disabled, Proportional control, On/Off control, Timed dosing
- **ORP dosing type**: ORP/Redox dosing type.
  - **Options**: Low intensity, High intensity
- **ORP dosing method**: ORP/Redox dosing control method.
  - **Options**: Disabled, Proportional control, On/Off control, Timed dosing
- **Chlorine dosing type**: Chlorine dosing type.
  - **Options**: Low intensity, High intensity
- **Chlorine dosing method**: Chlorine dosing control method.
  - **Options**: Disabled, Proportional control, On/Off control, Timed dosing

## Known limitations

### Hardware and connectivity issues

The PoolDose devices have two characteristics that can affect their network connectivity:

- **Hardware limitations**: The devices use a small-scale controller that is heavily loaded by web server and data processing tasks. This can occasionally cause brief connection interruptions, though devices typically recover quickly.

- **Energy-saving mode**: When the pump monitoring feature is activated in the device settings, the device often enters an energy-saving mode if no pump operation is detected. During this time, the device may be less responsive or temporarily unavailable on the network, for example, at night.

### Cached data behavior

These limitations are normal behavior for the device and not issues with the integration itself. To handle these connectivity issues, the integration caches values for a maximum of 300 seconds (5 minutes) when the device is temporarily unresponsive. After this cache period expires, entities will show as "unavailable" until the device provides new data again.

## Troubleshooting

### Device not found

#### Symptom: "Device could not be found on the network"

When trying to set up the integration, you receive an error that the device cannot be found.

##### Description

The device may not be properly connected to your network, or it may be using a different IP address or hostname than expected.

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

This typically occurs when the device's web interface password is not set to the default value (0000) or not properly deactivated.

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

### Missing peristaltic pump status

#### Symptom: No peristaltic pump status data is available

Peristaltic pump status sensors don't show any data or appear as unavailable.

##### Description

The PoolDose device only propagates the status of peristaltic dosing pumps when the external relays for these pumps are enabled in the device settings.

##### Resolution

To get peristaltic pump status data:

1. Browse to your PoolDose device's settings.
2. Find the external relay configuration for the pH and ORP pumps.
3. Enable the external relays for the pumps you want to monitor.
4. Save the settings and restart the device if required.
