---
title: WattWächter Plus
description: Instructions on how to integrate WattWächter Plus into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@smartcircuits'
ha_domain: wattwaechter
ha_platforms:
  - sensor
ha_zeroconf: true
ha_integration_type: device
ha_quality_scale: bronze
works_with:
  - local
---

The **WattWächter Plus** {% term integration %} connects Home Assistant to a [WattWächter Plus](https://wattwächter.de) energy monitoring device by [SmartCircuits GmbH](https://smartcircuits.de). The device reads data from your smart electricity meter via the <abbr title="Smart Message Language">SML</abbr>/<abbr title="Object Identification System">OBIS</abbr> protocol and exposes it over a local HTTP API. All communication stays on your local network. No cloud service is involved.

Use this integration to monitor your electricity consumption, feed-in, voltage, current, and power factor. The collected data can be used in the [Energy dashboard](/home-energy-management).

## Supported devices

- **WattWächter Plus**: ESP-based smart meter reader with SML/OBIS support. Connects to your meter's optical interface and provides real-time energy data via a local HTTP API.

## Prerequisites

- The WattWächter Plus must be connected to your local network and reachable from Home Assistant.
- Set up your device using the [WattWächter documentation](https://docs.wattwächter.de) before adding it to Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your WattWächter Plus device."
API token:
  description: "The API token for authentication (optional, only required if token-based authentication is enabled on the device)."
{% endconfiguration_basic %}

## Supported functionality

The WattWächter Plus provides sensors that are based on your smart meter's reports via the SML/OBIS protocol. Not all meters expose every value. Only the available sensors are shown in the integration.

### Energy sensors

- **Total consumption (kWh)**: Total energy imported since installation of your smart meter.
- **Total feed-in (kWh)**: Total energy exported (fed back into the grid).
- **Consumption tariff 1 / 2 (kWh)**: Energy consumption per tariff, if your meter supports dual tariffs.
- **Feed-in tariff 1 / 2 (kWh)**: Energy feed-in per tariff.

### Power sensors

- **Active power (W)**: Current power being consumed or fed in. Negative values indicate feed-in.
- **Active power L1 / L2 / L3 (W)**: Active power per phase.

### Voltage and current sensors

- **Voltage L1 / L2 / L3 (V)**: Voltage per phase.
- **Current L1 / L2 / L3 (A)**: Current per phase.

### Other sensors

- **Grid frequency (Hz)**: The current grid frequency.
- **Power factor / Power factor L1 / L2 / L3**: The power factor (total and per phase).

### Diagnostic sensors

The following sensors are created with the diagnostic entity category and are disabled by default:

- **Wi-Fi signal (dBm)**: The wireless signal strength of the device.
- **Wi-Fi SSID**: The wireless network name the device is connected to.

## Data updates

The integration {% term polling polls %} your WattWächter Plus device locally every 2 minutes (120 seconds). Each poll fetches the meter data (SML/OBIS readings) and system information.

## Actions

This integration does not provide additional actions.

## Examples

### Add your energy data to the Energy dashboard

The WattWächter Plus integration provides energy sensors that can be used in the Energy dashboard. To add your data, follow the steps in the [Energy dashboard documentation](/home-energy-management).

Use the **Total consumption** sensor for grid consumption and the **Total feed-in** sensor for energy returned to the grid.

### Get notified on high power consumption

{% details "Example YAML automation" %}
{% raw %}

```yaml
alias: "High power consumption alert"
description: "Notify when power consumption exceeds 4 kW for 5 minutes."
triggers:
  - trigger: numeric_state
    entity_id: sensor.<your_wattwaechter_device_name>_active_power
    above: 4000
    for:
      minutes: 5
actions:
  - action: notify.mobile_app_phone
    data:
      title: "High power consumption"
      message: >-
        WattWächter reports
        {{ states('sensor.wattwaechter_plus_active_power') }} W.
```

{% endraw %}
{% enddetails %}

Replace the threshold and `notify` target with the values appropriate for your setup.

## Known limitations

### Sensor availability depends on your smart meter

Not all smart meters expose the same OBIS codes. For example, some meters do not report per-phase voltage or current. The integration can only show data that your meter provides.

### Smart meter PIN unlock required for full precision

Most smart meters need to be unlocked with a PIN from your energy provider before they expose detailed meter data. Without the PIN, many meters only report integer values (no decimal places) and may not provide per-phase readings. Contact your energy provider to request the PIN and enter it on your smart meter to unlock extended data.

## Troubleshooting

### Device is not discovered automatically

- Make sure the WattWächter Plus is connected to the same network as Home Assistant.
- Verify the device is powered on and reachable (try accessing its web interface in a browser).
- You can always add the device manually by entering its IP address.

### Authentication failed

If you have set an API token on the device, make sure you enter it correctly during setup.

### No sensor data available

- If the device is reachable but shows no meter sensors, your smart meter may not be connected or not yet sending data. Check the device's web interface to verify SML data is being received.
- The optical reader head must be properly aligned with your meter's optical interface.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
