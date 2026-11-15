---
description: Instructions on how to integrate WattWächter devices into Home Assistant.
ha_release: 2026.7
ha_domain: wattwaechter
---

The **WattWächter** {% term integration %} connects Home Assistant to [WattWächter](https://wattwächter.de) devices by [SmartCircuits GmbH](https://smartcircuits.de). The **WattWächter Plus** energy monitoring device reads data from your smart electricity meter via the <abbr title="Smart Message Language">SML</abbr>/<abbr title="Object Identification System">OBIS</abbr> protocol and exposes it over a local HTTP API. All communication stays on your local network. No cloud service is involved.

The same integration also supports the **WattWächter Gas** and **WattWächter Wasser** devices, which read a mechanical gas or water meter.

Use this integration to monitor your electricity consumption, feed-in, voltage, current, and power factor, or your gas and water consumption. The collected data can be used in the [Energy dashboard](/home-energy-management).

## Supported devices

- **WattWächter Plus**: ESP-based smart meter reader with SML/OBIS support. Connects to your meter's optical interface and provides real-time energy data via a local HTTP API.
- **WattWächter Gas** and **WattWächter Wasser**: ESP-based readers for mechanical gas and water meters. A magnetic or inductive sensor on the meter counts the revolutions of the meter dial. The device is set to gas or water in its web interface and is named after the selected medium.

## Prerequisites

- The WattWächter device must be connected to your local network and reachable from Home Assistant.
- Set up your device using the [WattWächter documentation](https://docs.wattwächter.de) before adding it to Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your WattWächter device."
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
- **Absolute energy (kWh)**: Total energy regardless of direction, if reported by your meter.
- **Reactive energy consumption / feed-in (kvarh)**: Reactive energy totals, if reported by your meter.
- **Reactive energy quadrant I / II / III / IV (kvarh)**: Reactive energy per quadrant, on meters that report the four quadrant registers.

### Power sensors

- **Active power (W)**: Current power being consumed or fed in. Negative values indicate feed-in.
- **Active power L1 / L2 / L3 (W)**: Active power per phase.
- **Power consumption / Power feed-in (W)**: Separate import and export power readings, on meters that report them as two registers.
- **Absolute power (W)**: Power regardless of direction, on meters that report the unsigned value.
- **Reactive power consumption / feed-in (var)**: Reactive power, if reported by your meter.
- **Apparent power consumption / feed-in (VA)**: Apparent power, if reported by your meter.
- **Maximum demand (kW)**: The maximum power demand, if reported by your meter.

### Voltage and current sensors

- **Voltage L1 / L2 / L3 (V)**: Voltage per phase.
- **Current L1 / L2 / L3 (A)**: Current per phase.

### Other sensors

- **Grid frequency (Hz)**: The current grid frequency.
- **Power factor / Power factor L1 / L2 / L3**: The power factor (total and per phase).

### Additional meter values

Smart meters can report values beyond the well-known ones listed above. The integration creates a sensor for every additional OBIS code your meter reports, deriving the sensor type from the reported unit. Cumulative energy registers of electricity meters and m³ registers of gas and water meters are recorded as continuously increasing totals. These additional sensors are disabled by default; enable the ones you need from the device page. Device metadata registers, such as the meter's serial number, do not create sensors.

### Gas and water sensors

A WattWächter Gas or WattWächter Wasser creates the sensors of its medium:

- **Gas consumption (m³)**: The gas meter reading.
- **Gas flow rate (m³/h)**: The current gas flow.
- **Gas power (kW)**: The current gas power, calculated by the device from the gas flow and the energy factor (calorific value × gas correction factor) set in its web interface.
- **Water consumption (m³)**: The water meter reading.
- **Water flow rate (m³/h)**: The current water flow.

When you switch the device between gas and water, the integration removes the sensors of the previous medium and adds the sensors of the new one.

### Diagnostic sensors

The following sensors are created with the diagnostic entity category and are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity):

- **Wi-Fi signal (dBm)**: The wireless signal strength of the device.
- **Wi-Fi SSID**: The wireless network name the device is connected to.

### Firmware updates

The integration adds an update entity that reports the firmware version installed on your WattWächter device and whether a newer version is available. When an update is offered, you can review the release notes and install it directly from Home Assistant. The device downloads and applies the firmware itself.

## Data updates

The integration {% term polling polls %} your WattWächter device locally every 2 minutes (120 seconds). Each poll fetches the meter data, system information, and the firmware update status.

## Actions

This integration does not provide additional actions.

## Examples

### Add your energy data to the Energy dashboard

The WattWächter integration provides energy sensors that can be used in the Energy dashboard. To add your data, follow the steps in the [Energy dashboard documentation](/home-energy-management).

Use the **Total consumption** sensor for grid consumption and the **Total feed-in** sensor for energy returned to the grid. For a WattWächter Gas, add the **Gas consumption** sensor as gas consumption. For a WattWächter Wasser, add the **Water consumption** sensor as water consumption.

### Get notified on high power consumption

Run an action, such as sending a notification, when your power consumption stays above a threshold for a set duration:

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/wattwaechter_high_power_alert.yaml" %}

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

### Switching between gas and water

The sensors of the previous medium are removed, but their long-term statistics are kept. After switching, add the consumption sensor of the new medium to the Energy dashboard. To delete the statistics of the removed sensors, use {% my tools_statistics title="**Settings** > **Tools** > **Statistics**" %}.

### Corrected or replaced meter reading

The **Gas consumption** and **Water consumption** sensors follow the meter reading set on the device:

- When you correct the reading, the difference counts as consumption in that hour, also downwards. This matches the consumption shown on the device.
- When you replace the meter and enter it as a new meter on the device, Home Assistant starts a new cycle. The full reading of the new meter counts as consumption in that hour.

To adjust an affected hour, use {% my tools_statistics title="**Settings** > **Tools** > **Statistics**" %}.

### Smart meter PIN unlock required for full precision

Most smart meters need to be unlocked with a PIN from your energy provider before they expose detailed meter data. Without the PIN, many meters only report integer values (no decimal places) and may not provide per-phase readings. Contact your energy provider to request the PIN and enter it on your smart meter to unlock extended data.

## Troubleshooting

### Device is not discovered automatically

- Make sure the WattWächter device is connected to the same network as Home Assistant.
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
