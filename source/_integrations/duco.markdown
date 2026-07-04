---
title: Duco
description: Instructions on how to integrate Duco ventilation with Home Assistant.
ha_release: 2026.5
ha_category:
  - Fan
  - Select
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ronaldvdmeer'
ha_domain: duco
ha_platforms:
  - diagnostics
  - fan
  - select
  - sensor
ha_integration_type: hub
ha_quality_scale: platinum
ha_dhcp: true
ha_zeroconf: true
---

The **Duco** {% term integration %} allows you to monitor and control [Duco](https://www.duco.eu/) demand-controlled ventilation (DCV) systems from Home Assistant. Duco produces ventilation boxes for residential buildings that regulate air quality based on CO₂ and humidity sensors. This integration communicates locally with the Duco box over your home network, requiring no cloud connection.

## Supported devices

This integration communicates with the **DUCO Connectivity Board** (article 0000-4810) via its local REST API over Wi-Fi or Ethernet.

To set up the integration, your Duco system must expose the DUCO Connectivity Board API with public API version 2.1 or newer.

Hardware revisions:

- **DUCO Connectivity Board 1.0**: Supported
- **DUCO Connectivity Board 2.0**: Supported

Validated DucoBox models:

- DucoBox Silent
- DucoBox Focus
- DucoBox Energy

Older Duco systems using the Communication Board V1 are not supported because they do not expose the required API surface.

Other Duco systems that expose public API version 2.1 or newer can also be set up. The current integration has been validated on the models above for the base functionality, but some model-specific sensors are still not exposed in Home Assistant, especially on DucoBox Energy systems.

### Supported node types

The following node types are supported:

- **BOX**: The main ventilation box; provides fan control, ventilation state select, ventilation state, target flow level, state end time, and Wi-Fi signal strength. Models that expose a filter timer also provide a filter remaining sensor.
- **BSCO2**: CO₂ sensor module wired directly to the DucoBox PCB; provides CO₂ concentration and CO₂ air quality index.
- **UCCO2**: Wall-mounted CO₂ sensor unit; provides CO₂ concentration and CO₂ air quality index.
- **BSRH**: Humidity sensor module installed in the duct inlet of the DucoBox, wired directly to the PCB via cable; provides relative humidity and humidity air quality index.
- **UCRH**: Wireless humidity sensor module; provides relative humidity and humidity air quality index.
- **VLV**, **VLVRH**, **VLVVOC**, **VLVCO2**, and **VLVCO2RH**: Valve actuator families. These nodes expose ventilation state, target flow level, state end time, and, when the firmware advertises it for that node, a ventilation state select. The RH and CO₂ variants also expose their supported sensor entities.
- **EAV**, **EAVRH**, **EAVVOC**, and **EAVCO2**: Extract air valve families. These nodes expose the same ventilation-related entities as the supported valve actuator families. The RH and CO₂ variants also expose their supported sensor entities.

### Unsupported node types

The following node types can be discovered but are not currently surfaced as entities:

- **UC**: Universal control unit (no sensor data exposed)
- **UCBAT**: Battery-powered sensor module

Home Assistant ignores unsupported node types until support is added. All supported nodes continue to work normally.

## Prerequisites

- A Duco ventilation box with a DUCO Connectivity Board connected to your local network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your DUCO Connectivity Board on the local network, for example `192.168.1.10`. Only needed when setting up the integration manually."
{% endconfiguration_basic %}

## Supported functionality

Each supported node appears as a separate device in Home Assistant, connected to the main ventilation box. The sections below describe which entities Home Assistant creates for those supported node types.

### Fan

The fan entity on the main ventilation box lets you control the ventilation speed. You can set the speed as a percentage or switch back to automatic mode.

Use the fan when you want to work with Home Assistant's percentage-based fan controls. If you want to choose a specific Duco ventilation state code instead, use the ventilation state select on the node that exposes it.

The fan is always on. Turning off the fan is not supported.

Setting a speed percentage to 33%, 66%, or 100% activates a continuous override with no time limit. Setting it to 0% clears the override and hands control back to Duco:

- **Speed 0%**: Clears the override and returns to automatic mode.
- **Speed 33%**: Continuous low speed override.
- **Speed 66%**: Continuous medium speed override.
- **Speed 100%**: Continuous high speed override.
- **Auto preset**: Same as speed 0%. Clears the override and returns to automatic mode.

When a connected wall unit (such as a UCCO2) triggers a timed speed override on the Duco box, Home Assistant reflects the current ventilation level as a percentage. These timed states cannot be set from Home Assistant; writing a speed always uses the permanent manual mode (a continuous override with no time limit).

{% note %}
The percentages 33%, 66%, and 100% are abstract speed levels used in the Home Assistant fan UI and do not match the actual airflow percentages configured in the Duco firmware. To see the real airflow target, use the **Target flow level** sensor.
{% endnote %}

### Select

The ventilation state select is available for the main ventilation box (BOX) and for supported valve or extract nodes when that node advertises selectable ventilation states. It lets you choose the Duco ventilation state codes exposed by your system, such as `AUTO`, `CNT1`, `CNT2`, `CNT3`, `MAN1`, `MAN2`, `MAN3`, or `EMPT`.

Home Assistant only shows the options advertised by your Duco system for that specific node, so the available choices can vary by model, node type, or firmware. After you change the option, Home Assistant refreshes the state from the box and shows the state the box reports back.

### Sensors

The following sensor entities are created per node, depending on the node type:

#### Target flow level

Available for the main ventilation box (BOX) and supported valve or extract node families with ventilation data. Shows the actual airflow target as reported by the Duco box, as a percentage (0–100%). This value reflects the real airflow configured in the Duco firmware. On the main ventilation box, it can differ from the abstract speed levels (33%, 66%, or 100%) shown in the fan entity. For example, if your Duco system is configured with manual speed levels of 15%, 30%, and 100%, this sensor shows those values.

#### Ventilation state

Available for the main ventilation box (BOX) and supported valve or extract node families with ventilation data. Shows the ventilation state using the Duco state codes shown by the device and app, instead of friendly labels with fixed meanings.

This sensor is read-only. To choose a specific Duco state code from Home Assistant, use the ventilation state select.

Common values include:

- `AUTO`: Automatic mode.
- `AUT1`, `AUT2`, `AUT3`: Automatic mode currently running at low, medium, or high airflow.
- `CNT1`, `CNT2`, `CNT3`: Continuous low, medium, or high speed override.
- `MAN1`, `MAN2`, `MAN3`: Timed manual low, medium, or high speed override.
- `EMPT`: Empty house mode.

`CNT` states are continuous overrides.

`MAN` states are timed overrides, but the timer duration is configured on the Duco system and is not encoded in the raw state value itself. Some systems may also report compatibility values like `MAN1x2` or `MAN1x3` for timed manual modes.

To see when a timed state ends, use the [State end time](#state-end-time) sensor.

#### State end time

Available for the main ventilation box (BOX) and supported valve or extract node families with ventilation data. Shows the time at which the current timed ventilation state ends. When no timer is active, this sensor is unavailable.

#### Filter remaining

Available for Duco box models that expose a filter timer via the local API. Shows the remaining filter lifetime in days.

On models that do not expose a filter timer, this sensor is not created.

#### CO₂ concentration

Available for CO₂ sensor modules and valve actuators with a built-in CO₂ sensor. Shows the current CO₂ concentration in parts per million (ppm).

#### Humidity

Available for the supported node types with a built-in humidity sensor listed in [Supported node types](#supported-node-types). Shows the current relative humidity in percent.

#### CO₂ air quality index

Available for CO₂ sensor modules and valve actuators with a built-in CO₂ sensor. Shows the CO₂ air quality score as a percentage (0–100%). This entity is disabled by default.

Indoor air quality ranges for CO₂:

- 90–100%: Very good
- 75–85%: Good
- 50–70%: Temporarily acceptable
- 35–45%: Poor

#### Humidity air quality index

Available for the supported node types with a built-in humidity sensor listed in [Supported node types](#supported-node-types). Shows the humidity air quality score as a percentage (0–100%). This entity is disabled by default.

Indoor air quality ranges for humidity:

- 95–100%: Very good
- 65–90%: Good
- 35–50%: Temporarily acceptable
- 5–20%: Poor

#### Wi-Fi signal strength

Available for the main ventilation box (BOX). Shows the Wi-Fi signal strength in dBm. This entity is disabled by default.

## Use cases

- Switch to high ventilation automatically when cooking or showering.
- Return to auto mode when everyone leaves home using a presence-based automation.
- Choose a specific Duco ventilation state from an automation or script.
- Monitor ventilation activity over time via the logbook.
- Trigger automations based on CO₂ levels or humidity reported by connected Duco modules.

## Examples

The example entity IDs below use the default naming that Home Assistant assigns on a new Home Assistant installation. Replace them with the entity IDs from your own system.

### Activate high ventilation while cooking

This automation switches the ventilation to high speed when the kitchen hood is turned on, and returns it to automatic mode five minutes after the hood is switched off.

```yaml
- alias: "High ventilation while cooking"
  triggers:
    - trigger: state
      entity_id: switch.kitchen_hood
      to: "on"
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.node_1
      data:
        percentage: 100

- alias: "Return to auto after cooking"
  triggers:
    - trigger: state
      entity_id: switch.kitchen_hood
      to: "off"
      for: "00:05:00"
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.node_1
      data:
        percentage: 0
```

### Reduce ventilation when nobody is home

When the last person leaves home, the ventilation hands control back to Duco (automatic mode). When someone returns, it switches to medium speed.

```yaml
- alias: "Ventilation auto mode on leave"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      below: 1
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.node_1
      data:
        percentage: 0

- alias: "Ventilation medium speed on arrive"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      above: 0
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.node_1
      data:
        percentage: 66
```

### Boost ventilation when CO₂ is high

This automation switches to high speed when the CO₂ level rises above 1000 ppm on a UCCO2 sensor module, and returns to automatic mode when it drops back below 800 ppm.

```yaml
- alias: "Boost ventilation on high CO2"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.node_2_carbon_dioxide
      above: 1000
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.node_1
      data:
        percentage: 100

- alias: "Return to auto when CO2 is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.node_2_carbon_dioxide
      below: 800
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.node_1
      data:
        percentage: 0
```

### Boost ventilation when humidity is high

This automation switches to medium speed when relative humidity rises above 70% on a UCRH or BSRH sensor module, and returns to automatic mode when it drops back below 60%.

```yaml
- alias: "Boost ventilation on high humidity"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.node_113_humidity
      above: 70
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.node_1
      data:
        percentage: 66

- alias: "Return to auto when humidity is normal"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.node_113_humidity
      below: 60
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.node_1
      data:
        percentage: 0
```

## Data updates

The integration {% term polling polls %} the Duco box every 10 seconds. If you add a new sensor module (such as a CO₂ or humidity sensor) to your Duco system after the integration is already set up, it will automatically appear in Home Assistant the next time the integration polls for data. No restart or reconfiguration required.

## Known limitations

- New setup requires a DUCO Connectivity Board that exposes public API 2.1 or later. Older systems using the Communication Board V1 are not supported. The integration has been validated on DucoBox Silent, DucoBox Focus, and DucoBox Energy. Other systems on the same API surface can still be set up, but some model-specific functionality may remain limited until it has been validated and implemented.
- The Duco box enforces a rate limit of 200 write requests per day. When the limit is reached, the integration shows a notification and stops sending write requests until the quota resets automatically around midnight.
- Timed speed overrides set by a connected wall unit (such as a UCCO2) cannot be triggered from Home Assistant. They are read-only: the current ventilation level is shown as a percentage, but setting a speed from Home Assistant always uses the permanent manual mode (a continuous override with no time limit).
- Some model-specific sensors are not yet exposed in Home Assistant. This currently affects parts of the DucoBox Energy sensor surface, and VOC-capable node families currently expose only the ventilation-related entities.
- Integration diagnostics are available, but subsystem-specific diagnostics for the different Duco models are not yet exposed separately.
- When you deregister a sensor module via the Duco app or firmware, the node disappears from the Duco API and Home Assistant removes it automatically on the next data update. However, a BSRH humidity sensor that is physically disconnected from the box PCB (rather than deregistered via software) is not treated as deregistered by the firmware. Its node remains in the API indefinitely, so its entities will stay in Home Assistant until you deregister it through the Duco app.

## Troubleshooting

### Device is not automatically discovered

If your Duco ventilation box is not automatically discovered:

- Ensure the device is powered on and connected to the same network as Home Assistant.
- Check that mDNS/Bonjour traffic is not blocked by your router or firewall. If it is, the integration can still discover the device automatically via DHCP the next time the device renews its IP address lease.
- Verify the device name shows as "DUCO [MAC address]" in your router's device list or network scanner.
- Manually add the integration using the device's IP address if discovery continues to fail.

### Cannot connect to the Duco box

#### Symptom

The integration setup fails with a "Cannot connect" error, or all entities show as unavailable after the integration was working correctly.

#### Description

Home Assistant cannot reach the Duco box at the configured address. This can happen during initial setup or later during operation if the box is restarted, loses power, or its IP address changes.

#### Resolution

1. Check that the Duco box is powered on and connected to your local network.
2. Confirm the IP address or hostname is correct by opening `http://<host>` in a browser on your local network.
3. If the box is reachable but entities are still unavailable, reload the integration via {% my integrations title="**Settings** > **Devices & services**" %} > **Duco** > **Reload**.
4. If the Duco box received a new IP address from your router, Home Assistant updates the address automatically the next time the box is discovered via mDNS/Bonjour (zeroconf). If that does not happen, see [Reconfiguring the integration](#reconfiguring-the-integration).

### Setup says this Duco system is not supported

#### Symptom

Manual setup stops with this message:

> This Duco system is not supported by this integration. The integration requires a Duco Connectivity Board running public API 2.1 or newer.

#### Description

Home Assistant could reach the Duco device, but the detected system does not expose the required API surface for setup. The integration requires a DUCO Connectivity Board with public API version 2.1 or later.

This can happen when your system uses an older Communication Board V1, or when the board firmware does not expose public API 2.1 or later.

#### Resolution

1. Confirm that your system uses a DUCO Connectivity Board.
2. Check whether the board firmware exposes public API 2.1 or later.
3. If your system uses the older Communication Board V1, Home Assistant cannot set up the integration for that system.
4. If your system does not meet these requirements, Home Assistant cannot set up a new integration for that system.
5. If your system should be supported, collect diagnostics and open an issue in Home Assistant Core with your Duco model, board details, and firmware information.

### Failed to set ventilation state (rate limit)

#### Symptom

Setting the fan speed or preset mode fails with a notification in the Home Assistant UI:

> The Duco device has reached its daily write limit. Try again tomorrow.

#### Description

The Duco box enforces a daily API write limit of 200 write requests. When the limit is reached, the box rejects further write requests until the quota resets shortly after midnight.

#### Resolution

1. Check if the daily write limit has been reached. 
   - Under **Settings** > **System** > **Repairs**, open the {% icon "mdi:dots-vertical" %} menu in the top-right corner.
   - Select **System information**.
   - In the Duco section, you should see if the daily write limit has been reached.
2. If the limit has been reached, wait until shortly after midnight for the quota to reset.
3. To avoid hitting the limit again, reduce the frequency of automations that change the ventilation state.

## Reconfiguring the integration

If your Duco ventilation box gets a new IP address, you can update it without removing and re-adding the integration.

When zeroconf discovery is available, Home Assistant updates the address automatically. If that does not happen, you can update it manually:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the **Duco** integration and select it.
3. Select the three dots menu {% icon "mdi:dots-vertical" %} next to the integration and choose **Reconfigure**.
4. Enter the new IP address or hostname and select **Submit**.

Home Assistant verifies that the new address belongs to the same Duco box. If you enter the address of a different device, the reconfiguration is aborted.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
