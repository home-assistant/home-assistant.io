---
title: Solarman
description: Instructions on how to integrate your Solarman device with Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_config_flow: true
ha_release: 2026.4
ha_iot_class: Local Polling
ha_codeowners:
  - '@solarmanpv'
ha_domain: solarman
ha_platforms:
  - sensor
ha_integration_type: device
ha_zeroconf: true
ha_quality_scale: bronze
---

The Solarman {% term integration %} enables direct local communication between Home Assistant and your [Solarman](https://www.solarmanpv.com/) devices. This solution provides real-time monitoring of energy production and consumption while enabling device control, all through secure local communication.

## Use cases

- Monitor energy usage in real time.
- Control devices remotely.
- Automate schedules for your appliances.

## Supported devices

Currently, the integration supports the following devices:

- SP-2W-EU: Smart Plug for energy monitoring (power consumption, voltage, current) and remote outlet control.
- P1-2W: P1 Meter Reader for monitoring operating status and consumption data of P1 meter.
- MR1-D5-W/MR1-D5-WR: Smart Meter for bidirectional energy metering in residential and small commercial and industrial scenarios.

## Prerequisites

1. Connect your Solarman device and Home Assistant to the same local network.
2. Ensure the Solarman device is powered on and has acquired a network IP address. You can get the IP from the app or from your router.
3. Enable the device's API through the app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your device. You can find it in your router or in the app."
{% endconfiguration_basic %}

## Supported functionality

The Solarman integration mainly provides sensors about what your device is measuring.

### SP-2W-EU

The SP-2W-EU provides the following sensors:

- Power (W)
- Voltage (V)
- Current (A)
- Positive active energy (kWh)
- Reverse active energy (kWh)

### P1-2W

The P1-2W provides the following sensors:

- SN: serial number of the P1 meter
- Device version: version of the P1 meter
- Total actual energy low tariff (kWh)
- Total actual energy normal tariff (kWh)
- Total actual returned energy low tariff (kWh)
- Total actual returned energy normal tariff (kWh)
- AC phase-A current (A)
- AC phase-B current (A)
- AC phase-C current (A)
- AC phase-A voltage (V)
- AC phase-B voltage (V)
- AC phase-C voltage (V)
- Total actual power (kW)
- Total actual returned power (kW)
- Active power phase-A (kW)
- Active power phase-B (kW)
- Active power phase-C (kW)
- Active returned power phase-A (kW)
- Active returned power phase-B (kW)
- Active returned power phase-C (kW)
- Total gas consumption (m³)

### MR1-D5-W/MR1-D5-WR

The MR1-D5-W/MR1-D5-WR provides the following sensors:

- SN: serial number of the meter
- Voltage (V)
- Current (A)
- Active power (W)
- Apparent power (W)
- Reactive power (W)
- Power factor: ratio of active to apparent power
- Frequency (Hz)
- Total actual energy (kWh)
- Total actual returned energy (kWh)

## Data updates

The **Solarman integration** {% term polling polls %} data from the device every 30 seconds.

## Known limitations

The integration does not provide the ability to configure the devices, which can instead be done via the manufacturer's app.

## Troubleshooting

### Cannot add device or obtain data

1. Ensure the device is powered on and functioning normally.
2. Confirm both the device and Home Assistant are connected to the same local network.
3. Ensure the device's IP address is correct and hasn't changed.
4. Check the device's settings in app to ensure that the API is enabled.

Check the Home Assistant logs for more information.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
