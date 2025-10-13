---
title: Indevolt
description: Instructions on how to integrate your Indevolt device with Home Assistant.
ha_release: 2025.9
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_codeowners:
  - '@solarmanpv'
ha_platforms:
  - sensor
ha_domain: indevolt
ha_integration_type: integration
---

The Indevolt integration {% term integration %} enables direct local communication between Home Assistant and your [Indevolt](https://www.indevolt.com/) energy storage devices. 

## Use cases

- Monitor energy production and consumption, as well as battery status.


## Supported devices

Currently, the integration supports the following devices:

- BK1600/BK1600Ultra
- SolidFlex/PowerFlex2000


## Prerequisites

1. Connect your Indevolt device and Home Assistant to the same local network.
2. Ensure the Indevolt device is powered on and has acquired a network IP address. You can get the IP from app or your router.
3. Enable the device's API through app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your device. You can find it in your router or in app."
Port:
  description: "The TCP port of the device, 8080 by deault."
Scan Interval:
  description: "The polling interval in seconds."
Model:
  description: "The device model".

{% endconfiguration_basic %}


## Supported functionality

The Indevolt integration mainly provides sensors about what your device is measuring.

### BK1600/BK1600Ultra

- Working mode (Outdoor Portable, Self-consumed Prioritized, Charge/Discharge Schedule)
- DC Input Power1 (W)
- DC Input Power2 (W)
- Total AC Output Power (W)
- Daily Production (kWh)
- Cumulative Production (* 0.001kwh)
- Total AC Input Power (W)
- Total AC Input Energy (kWh)
- Total DC Output Power (W)
- Battery Power (W)
- Battery Charge/Discharge State (Static, Charging, Discharging)
- Battery SOC (%)
- Emergency power supply (%)
- Battery Daily Charging Energy (kWh)
- Battery Daily Discharging Energy (kWh)
- Battery Total Charging Energy (kWh)
- Battery Total Discharging Energy (kWh)
- Meter Connection Status (ON, OFF)
- Meter Power (W)


### SolidFlex/PowerFlex2000

- Working mode (Self-consumed Prioritized, Charge/Discharge Schedule)
- DC Input Power1 (W)
- DC Input Power2 (W)
- DC Input Power3 (W)
- DC Input Power4 (W)
- Total DC Output Power (W)
- Total AC Output Power (W)
- Daily Production (kWh)
- Cumulative Production (* 0.001kwh)
- Total AC Input Power (W)
- Total AC Input Energy (kWh)
- Rated capacity (kWh)
- Total DC Output Power (W)
- Battery Power (W)
- Battery Charge/Discharge State (Static, Charging, Discharging)
- Battery SOC (%)
- Emergency power supply (%)
- Battery Daily Charging Energy (kWh)
- Battery Daily Discharging Energy (kWh)
- Battery Total Charging Energy (kWh)
- Battery Total Discharging Energy (kWh)
- Meter Connection Status (ON, OFF)
- Meter Power (W)
- Bypass power (W)


## Data updates

The Indevolt integration automatically retrieves data from your devices by polling the OpenData API every 30 seconds. You can adjust this frequency by configuring the "Scan Interval" during setup.

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
