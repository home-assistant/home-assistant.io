---
title: WattWächter Plus
description: Instructions on how to integrate WattWächter Plus into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.4
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@simono41'
ha_domain: wattwaechter
ha_platforms:
  - diagnostics
  - sensor
  - update
ha_zeroconf: true
ha_integration_type: device
ha_quality_scale: platinum
works_with:
  - local
---

The **WattWächter Plus** {% term integration %} connects Home Assistant to a [WattWächter Plus](https://wattwächter.de) energy monitoring device by [SmartCircuits GmbH](https://smartcircuits.de). The device reads data from your smart electricity meter via the SML/OBIS protocol and exposes it over a local HTTP API. All communication stays on your local network — no cloud service is involved.

Use this integration to monitor your electricity consumption, feed-in, voltage, current, and power factor. The collected data can be used in the [Energy dashboard](/home-energy-management).

## Supported devices

- **WattWächter Plus**: ESP-based smart meter reader with SML/OBIS support. Connects to your meter's optical interface and provides real-time energy data via a local HTTP API.

## Prerequisites

The WattWächter Plus must be connected to your local network and reachable from Home Assistant. Set up your device using the [WattWächter documentation](https://docs.wattwächter.de) before adding it to Home Assistant.

{% include integrations/config_flow.md %}

The integration supports automatic discovery via mDNS. If your device is on the same network, it will appear automatically in the discovered integrations.

### Configuration parameters

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your WattWächter Plus device."
API token:
  description: "The API token for authentication (optional, only required if token-based authentication is enabled on the device)."
{% endconfiguration_basic %}

### MQTT conflict detection

If your WattWächter Plus device is already integrated via MQTT auto-discovery, the integration will detect this and ask you to disable MQTT on the device or remove the MQTT entities first. The device supports both HTTP and MQTT, but only one integration method should be used at a time.

## Supported functionality

The WattWächter Plus provides sensors based on what your smart meter reports via the SML/OBIS protocol. Not all meters expose every value — only the available sensors are shown in the integration.

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

{% note %}
If your smart meter reports OBIS codes not listed above, the integration will create additional sensors automatically. These sensors are named by their OBIS code, for example "OBIS 1.8.0".
{% endnote %}

### Diagnostic sensors

The following sensors are created with the diagnostic entity category:

- **WiFi signal (dBm)**: The wireless signal strength of the device.
- **WiFi SSID**: The wireless network name the device is connected to.
- **IP address**: The current IP address of the device.
- **Firmware version**: The installed firmware version.
- **mDNS**: The mDNS hostname of the device.

### Firmware updates

The integration provides an update entity that checks for new firmware every 6 hours. When an update is available, you can install it directly from Home Assistant. The device will download and flash the firmware over the air (OTA) and reboot automatically. Update progress is shown during the installation.

## Options

The integration supports the following options that can be changed after setup:

{% configuration_basic %}
Update interval:
  description: "How often the integration polls the device for new data, in seconds. Default: 120 seconds. Range: 3–900 seconds."
{% endconfiguration_basic %}

The update interval can be changed at any time without reloading the integration.

## Data updates

The integration {% term polling polls %} your WattWächter Plus device locally every 120 seconds by default. Each poll fetches the meter data (SML/OBIS readings). System information (WiFi, firmware version) is polled separately once per minute, since these values rarely change. You can adjust the meter data polling interval in the integration options (3–900 seconds).

{% include common-tasks/define_custom_polling.md %}

## Reconfiguration

If your device's IP address changes or you need to update the API token, you can reconfigure the integration without removing it. Use the reconfigure option in the integration settings to update the host and token.

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
    entity_id: sensor.wattwaechter_plus_active_power
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

### OTA updates require internet access

While meter data is read entirely locally, firmware update checks and downloads require the device to have internet access. The update entity will show "up to date" if the device cannot reach the update server.

### Only one integration method at a time

The WattWächter Plus device supports both HTTP (this integration) and MQTT. Using both simultaneously for the same device is not supported. If MQTT auto-discovery entities already exist, you must remove them before setting up this integration.

## Troubleshooting

### Device is not discovered automatically

- Make sure the WattWächter Plus is connected to the same network as Home Assistant.
- Verify the device is powered on and reachable (try accessing its web interface in a browser).
- You can always add the device manually by entering its IP address.

### Authentication failed

- If you have set an API token on the device, make sure you enter it correctly during setup.
- Use the reauthentication flow to update the token if it has changed. Home Assistant will prompt you automatically when authentication fails.

### No sensor data available

- If the device is reachable but shows no meter sensors, your smart meter may not be connected or not yet sending data. Check the device's web interface to verify SML data is being received.
- The optical reader head must be properly aligned with your meter's optical interface.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
