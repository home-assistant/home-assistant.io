---
title: Indevolt
description: Instructions on how to integrate your Indevolt device with Home Assistant.
ha_release: 2026.3
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_codeowners:
  - '@xirt'
ha_platforms:
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_domain: indevolt
ha_integration_type: device
ha_quality_scale: bronze
ha_config_flow: true
---

The **Indevolt** {% term integration %} enables direct local communication between Home Assistant and your [Indevolt](https://www.indevolt.com/) energy storage devices.

## Use cases

With this integration, you can monitor energy production, consumption, and battery status in real time.

Beyond basic monitoring, the Indevolt integration enables advanced energy management automations within Home Assistant. For example, you can:

- Optimize battery charging and discharging based on solar production forecasts
- Automatically adjust energy modes to take advantage of variable electricity pricing
- Prevent grid feed-in during peak tariff periods by dynamically limiting output power
- Maintain a minimum battery charge for backup scenarios by adjusting discharge limits when applicable
- Coordinate battery behavior with other Home Assistant energy devices for whole-home optimization

## Supported devices

The integration supports the following devices:

- BK1600 / BK1600 Ultra
- SolidFlex 1200 / SolidFlex 2000 / PowerFlex 2000

## Prerequisites

<!-- textlint-disable capitalize -->
1. Connect your Indevolt device and Home Assistant to the same local network.
2. Ensure the Indevolt device is powered on and has acquired a network IP address. You can get the IP from the app or from your router.
3. In the Indevolt app, enable the **Local API** and set the protocol to `http`.
<!-- textlint-disable capitalize -->

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your device. You can find it in your router or in the Indevolt app."

{% endconfiguration_basic %}


The Indevolt integration communicates with your device over its standard TCP port (8080), which is used automatically by Home Assistant and does not need to be configured manually.

## Supported functionality

The Indevolt integration provides sensors for monitoring your device (read only).

### Buttons

The following button entity allows triggering device actions directly from Home Assistant.

- **Enable standby mode**: Puts the battery in standby mode which pauses battery charging and discharging. Change the energy mode to resume normal battery activity.

### Sensors

#### BK1600 / BK1600 Ultra (Generation 1)

- Device mode (overal setup of the device, for example standalone/cluster)
- Energy mode (battery and energy management strategy, for example Self-Consumped Prioritized/Price-Based Strategy)
- DC input power (2 channels, W)
- Daily production (kWh)
- Cumulative production (kWh)
- Total AC input power (W)
- Total AC input energy (kWh)
- Total AC output power (W)
- Total DC output power (W)
- Battery power (W)
- Battery charge/discharge state
- Battery SOC (%)
- Battery daily charging energy (kWh)
- Battery daily discharging energy (kWh)
- Battery total charging energy (kWh)
- Battery total discharging energy (kWh)
- Meter connection status
- Meter power (W)

#### SolidFlex 1200 / SolidFlex 2000 / PowerFlex 2000 (Generation 2)

All Generation 1 sensors, plus:

- Rated capacity (kWh)
- DC input voltage (4 channels, V)
- DC input current (4 channels, A)
- DC input power (4 channels, W)
- Grid voltage (V)
- Grid frequency (Hz)
- Bypass power (W)
- Bypass input energy (Wh)
- Off-grid output energy (kWh)
- Total AC output energy (kWh)
- Main battery serial number
- Main battery SOC (%)
- Main battery temperature (°C)
- Main battery voltage (V)
- Main battery current (A)
- Battery pack 1-5 serial number
- Battery pack 1-5 SOC (%)
- Battery pack 1-5 temperature (°C)
- Battery pack 1-5 voltage (V)
- Battery pack 1-5 current (A)

### Configurable entities (Generation 2 only)

In addition to the read-only sensors listed above, the Indevolt integration also exposes the following configurable entities for supported Generation 2 devices. You can change these settings from Home Assistant, and they are applied directly to your device.

- Energy mode: Configure battery and energy management strategy (select)
- Discharge limit: Set the minimum battery level (emergency power/SOC, %)
- Max AC output power: Configure maximum discharge power (W)
- Inverter input limit: Set maximum PV input power (W)
- Feed-in power limit: Configure grid feed-in power limit (W)
- Allow grid charging: Enable or disable charging from the grid (switch)
- Bypass socket: Enable or disable the bypass socket (switch)
- LED indicator: Enable or disable the LED indicator (switch)

## Examples

### Setting emergency SOC based on forecasted minimum temperatures

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/indevolt_manage_auto_emergency_soc.yml" %}

### Dynamically control battery discharge based on battery state, grid import/export and solar production

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/indevolt_smart_discharge.yml" %}

## Data updates

The Indevolt integration automatically retrieves data from your devices by polling the OpenData API every 30 seconds. If an update fails, the integration will retry again at the set interval (self-recovery).

## Known limitations

- Real-time configuration changes may appear with a small delay in Home Assistant and the Indevolt app.
- Energy mode can only be set when the device is not in "Outdoor / Portable"-mode.
- Some sensors are device generation-specific and may not appear for all models.
- Some sensors / configurations available in the app are not (yet) available in the integration.
- The SolidFlex 1200 identifies itself as a SolidFlex 2000 device.

## Troubleshooting

### Cannot add device or obtain data

1. Ensure the device is powered on and functioning normally.
2. Confirm both the device and Home Assistant are connected to the same local network.
3. Ensure the device's IP address is correct and hasn't changed.
4. Check the device's settings in the Indevolt app to ensure that the API is enabled in "HTTP" mode.

Check the Home Assistant logs for more information.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
