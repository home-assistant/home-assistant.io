---
description: Instructions on how to integrate Watergate with Home Assistant.
ha_release: '2025.1'
ha_domain: watergate
---

The **Watergate** {% term integration %} integrates your Watergate Devices (currently Sonic Wi-Fi) with your Home Assistant.
With this integration, you can:

- Control your valve
- Monitor live telemetry (water flow, water pressure, water temperature)
- Monitor water usage
- Receive information when Sonic shuts off the valve due to potential leak
- Turn the automatic leak shut-off on or off

## Prerequisites

- You need to have a Sonic device.
- The Local API feature must be enabled in the Watergate application.

## Supported devices

The following devices are known to be supported by the integration:

- Watergate Sonic Wi-Fi

## Unsupported devices

The following devices are not supported by the integration:

- Watergate Sonic Pro

## Supported functionality

### Entities

The Watergate integration provides the following entities.

#### Binary sensors

- **Water flowing**
  - **Description**: Whether water is currently flowing through the device.
  - **Remarks**: It is updated when the device is polled (see [Data updates](#data-updates)), so it can lag behind the real state by up to 2 minutes. Use the **Water flow rate** sensor for live flow information.

- **MQTT connected**
  - **Description**: Whether the device is connected to its MQTT broker.
  - **Remarks**: This is a diagnostic entity and is [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

- **Wi-Fi connected**
  - **Description**: Whether the device is connected to Wi-Fi.
  - **Remarks**: This is a diagnostic entity and is disabled by default.

#### Sensors


- **Water meter volume**
  - **Description**: Water volume that flowed through this device in the normal flow direction, for the entire lifetime of a Sonic device.
  - **Remarks**: It can be used in the Energy Dashboard.

- **Water meter duration**
  - **Description**: Time that water flowed through this device in the normal flow direction, for the entire lifetime of a Sonic device.

- **Water meter negative volume**
  - **Description**: Water volume that flowed through this device in the reverse direction, for the entire lifetime of a Sonic device.
  - **Remarks**: Reverse flow is uncommon in a healthy installation, so a rising value can point to a backflow problem. Requires a Sonic firmware version that reports directional readings.

- **Water meter negative duration**
  - **Description**: Time that water flowed through this device in the reverse direction, for the entire lifetime of a Sonic device.
  - **Remarks**: Requires a Sonic firmware version that reports directional readings.

- **Water flow rate**
  - **Description**: The current flow rate of water through the device.
  - **Remarks**: Useful for monitoring real-time water usage.

- **Water pressure**
  - **Description**: The current water pressure in the system.
  - **Remarks**: Can be used to detect potential issues in the water supply.

- **Water temperature**
  - **Description**: The current temperature of the water.
  - **Remarks**: Useful for monitoring and ensuring safe water temperatures.

#### Valves

- **Water valve state**
  - **Description**: The current state of the water valve (open/closed).
  - **Remarks**: It is automatically updated when the valve state is changed.
  
#### Switches

- **Auto shut-off**
  - **Description**: Turns automatic leak shut-off on or off. When enabled, Sonic automatically closes the valve if it detects a potential leak.
  - **Remarks**: This is a configuration switch. When disabled, Sonic no longer closes the valve automatically on a detected leak. Leak detection and monitoring are not affected.

#### Numbers

- **Auto shut-off volume threshold**
  - **Description**: The volume of water, in liters, that triggers the automatic shut-off.
  - **Remarks**: This is a configuration entity. It has no effect while the **Auto shut-off** switch is turned off.

- **Auto shut-off duration threshold**
  - **Description**: The duration of continuous water flow, in minutes, that triggers the automatic shut-off.
  - **Remarks**: This is a configuration entity. It has no effect while the **Auto shut-off** switch is turned off.

#### Events

- **Auto Shut-Off**
  - **Description**: Event triggered when the valve automatically shuts off due to detected leak.
  - **Event Type**: Either `volume_threshold` or `duration_threshold`
  - **Event Data**:
    - `volume`: The volume of water that triggered the shut-off
    - `duration`: The duration of leak that triggered the shut-off
  - **Remarks**: Historical events are not preserved across Home Assistant restarts.

## Data updates

The Watergate integration fetches data from the Sonic device every 2 minutes.
Thanks to the webhook option, Sonic will provide live telemetry every second when water is flowing directly to Home Assistant.

## Known limitations

The integration does not provide the ability to control the device buzzer, reboot the device, or change the device's Wi-Fi configuration.

Sonic firmware 2.11 and older does not report the two flow directions separately. On such a device, the **Water meter negative volume** and **Water meter negative duration** entities stay unavailable, and **Water meter volume** and **Water meter duration** report the difference between the normal and reverse readings rather than the normal direction alone.

{% include integrations/config_flow.md %}

{% configuration_basic %}
IP address:
    description: "The IP address of your Sonic device."
{% endconfiguration_basic %}

## Reconfiguration

If the IP address of your Sonic device changes, you can update it without removing and re-adding the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Watergate**.
3. Next to the entry, select **Menu** {% icon "mdi:dots-vertical" %} and then select **Reconfigure**.
4. Enter the new IP address and select **Submit**.

The new address must belong to the same Sonic device that was originally set up. If it belongs to a different device, the reconfiguration stops with the message "The device at this address is not the one that was originally configured." To add a different Sonic device, [set up a new integration entry](#configuration) instead.

## Examples

### Monitor water usage in the Energy Dashboard

The water meter volume entity can be added to the Energy Dashboard, allowing you to monitor water usage.

### Automation ideas

- Turn off the water when no one is at home.
- Turn on the water when someone arrives home.
- Send a notification when the water is too hot.
- Send a notification when the water is too cold.
- Send a notification when water is flowing for too long.

## Troubleshooting

### The Energy dashboard shows a one-time spike in water use

#### Symptom: A large, one-time increase in water use after updating Home Assistant or the Sonic firmware

#### Description

Since Home Assistant 2026.11, **Water meter volume** and **Water meter duration** report only water that flows in the normal direction. Before, they reported the normal reading minus the reverse reading. If your Sonic device had recorded reverse flow, both values rose once by that amount, and Home Assistant counted the rise as water use.

#### Resolution

To remove the spike, [adjust the statistic](/docs/tools/dev-tools/#adjusting-a-statistic) of **Water meter volume** for the hour in which the spike happened.

### The water meter negative entities are unavailable

#### Symptom: The **Water meter negative volume** and **Water meter negative duration** entities are unavailable

#### Description

These entities need Sonic firmware newer than 2.11. A Sonic connected to the Watergate cloud is kept up to date by Watergate, so it already has this firmware. A Sonic that has been offline may still run an older version.

#### Resolution

1. Connect the Sonic to your network. The device updates itself within 24 hours.
2. After the update, reload the integration: go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Watergate**, select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reload**. Restarting Home Assistant works too.
3. If your Sonic had recorded reverse flow, **Water meter volume** and **Water meter duration** rise once after the reload. To remove the spike, refer to [The Energy dashboard shows a one-time spike in water use](#the-energy-dashboard-shows-a-one-time-spike-in-water-use).

## Removing the integration

This integration follows standard integration removal procedures. No extra steps are required.

{% include integrations/remove_device_service.md %}
