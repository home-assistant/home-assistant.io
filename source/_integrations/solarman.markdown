---
title: Solarman
description: Instructions on how to integrate your Solarman device with Home Assistant.
ha_release: 2025.8
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_codeowners:
  - '@solarmanpv'
ha_platforms:
  - sensor
  - switch
ha_domain: solarman
ha_integration_type: integration
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
Port:
  description: "The TCP port of the device, 8080 by deault."
Scan Interval:
  description: "The polling interval in seconds."
{% endconfiguration_basic %}

## Supported functionality

The Solarman integration mainly provides sensors about what your device is measuring.

### SP-2W-EU

The SP-2W-EU provides the following sensors:

- Power
- Voltage
- Current
- Positive active energy
- Reverse active energy

### P1-2W

The P1-2W provides the following sensors:

- SN
- Device version
- Total actual energy low tariff
- Total actual energy normal tariff
- Total actual returned energy low tariff
- Total actual returned energy normal tariff
- AC phase-A current
- AC phase-B current
- AC phase-C current
- AC phase-A voltage
- AC phase-B voltage
- AC phase-C voltage
- Total actual power
- Total actual returned power
- Active power phase-A
- Active power phase-B
- Active power phase-C
- Active returned power phase-A
- Active returned power phase-B
- Active returned power phase-C
- Total gas consumption

### MR1-D5-W/MR1-D5-WR

The MR1-D5-W/MR1-D5-WR provides the following sensors:

- SN
- Voltage
- Current
- Active power
- Apparent power
- Reactive power
- Power factor
- Frequency
- Total actual energy
- Total actual returned energy

## Data updates

The **Solarman integration** integration {% term polling polls %} data from the device every 30 seconds by default. You can define it by changing Scan Interval during integration setup.

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
