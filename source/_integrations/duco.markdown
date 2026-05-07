---
title: Duco
description: Instructions on how to integrate Duco ventilation with Home Assistant.
ha_release: 2026.5
ha_category:
  - Fan
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ronaldvdmeer'
ha_domain: duco
ha_platforms:
  - diagnostics
  - fan
  - sensor
ha_integration_type: hub
ha_quality_scale: platinum
ha_dhcp: true
ha_zeroconf: true
---

The **Duco** {% term integration %} allows you to monitor and control [Duco](https://www.duco.eu/) demand-controlled ventilation (DCV) systems from Home Assistant. Duco produces ventilation boxes for residential buildings that regulate air quality based on CO₂ and humidity sensors. This integration communicates locally with the Duco box over your home network, requiring no cloud connection.

## Supported devices

This integration communicates with the **DUCO Connectivity Board** (article 0000-4810) via its local REST API over Wi-Fi or Ethernet.

Hardware revisions:

- **DUCO Connectivity Board 1.0**: Supported
- **DUCO Connectivity Board 2.0**: Not tested

Compatible DucoBox models:

- DucoBox Silent Connect
- DucoBox Focus (from firmware version 17xxxx)
- DucoBox Hygro Plus
- DucoBox Energy Comfort / Energy Comfort Plus
- DucoBox Energy Premium

### Supported sensor modules

The following sensor module types are supported:

- **BOX**: The main ventilation box; provides fan control, ventilation state, target flow level, mode end time, and Wi-Fi signal strength.
- **UCCO2**: Wall-mounted CO₂ sensor unit; provides CO₂ concentration and CO₂ air quality index.
- **BSRH**: Humidity sensor module installed in the duct inlet of the DucoBox, wired directly to the PCB via cable; provides relative humidity and humidity air quality index.
- **UCRH**: Wireless humidity sensor module; provides relative humidity and humidity air quality index.

### Unsupported sensor modules

The following sensor module types are discovered but not yet supported:

- **UC**: Universal control unit (no sensor data exposed)
- **UCBAT**: Battery-powered sensor module
- **VLV**: Valve actuator

When Home Assistant discovers a node with an unsupported type, it logs a warning and skips that node. All other nodes continue to work normally.

## Prerequisites

- A Duco ventilation box with a DUCO Connectivity Board connected to your local network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your DUCO Connectivity Board on the local network, for example `192.168.1.10`. Only needed when setting up the integration manually."
{% endconfiguration_basic %}

## Supported functionality

The Duco system consists of multiple nodes. Each node appears as a separate device in Home Assistant, connected to the main ventilation box:

- **BOX**: The main DucoBox (fan control, ventilation state, target flow level, mode end time)
- **UCCO2**: A wall-mounted control unit with a built-in CO₂ sensor
- **BSRH**: A humidity sensor module installed in the duct inlet of the DucoBox
- **UCRH**: A wireless humidity sensor module

### Fan

The fan entity lets you control the ventilation speed of a node. You can set the speed as a percentage or switch back to automatic mode.

The fan is always on. Turning off the fan is not supported.

Setting a speed percentage to 33%, 66%, or 100% activates a continuous override with no time limit. Setting it to 0% clears the override and hands control back to Duco:

- **Speed 0%**: Clears the override and returns to automatic mode.
- **Speed 33%**: Continuous low speed override.
- **Speed 66%**: Continuous medium speed override.
- **Speed 100%**: Continuous high speed override.
- **Auto preset**: Same as speed 0%; hands control back to Duco.

When a connected wall unit (such as a UCCO2) triggers a timed speed override on the Duco box, Home Assistant reflects the current ventilation level as a percentage. These timed states cannot be set from Home Assistant; writing a speed always uses the permanent manual mode (a continuous override with no time limit).

{% note %}
The percentages 33%, 66%, and 100% are abstract speed levels used in the Home Assistant fan UI and do not match the actual airflow percentages configured in the Duco firmware. To see the real airflow target, use the **Target flow level** sensor.
{% endnote %}

### Sensors

The following sensor entities are created per node, depending on the node type:

#### Target flow level

Available for the main ventilation box (BOX). Shows the actual airflow target as reported by the Duco box, as a percentage (0–100%). This value reflects the real airflow configured in the Duco firmware and differs from the abstract speed levels (33%, 66%, or 100%) shown in the fan entity. For example, if your Duco system is configured with manual speed levels of 15%, 30%, and 100%, this sensor shows those values.

#### Ventilation state

Available for the main ventilation box (BOX). Shows the current ventilation state, for example:

- Automatic
- Continuous high speed
- Manual low speed (15 min)

#### Mode end time

Available for the main ventilation box (BOX). Shows the time at which the current timed ventilation mode ends. When no timer is active, this sensor is unavailable.

#### CO₂ concentration

Available for CO₂ sensor modules. Shows the current CO₂ concentration in parts per million (ppm).

#### Humidity

Available for humidity sensor modules (BSRH, UCRH). Shows the current relative humidity in percent.

#### CO₂ air quality index

Available for CO₂ sensor modules. Shows the CO₂ air quality score as a percentage (0–100%). This entity is disabled by default.

Indoor air quality ranges for CO₂:

- 90–100%: Very good
- 75–85%: Good
- 50–70%: Temporarily acceptable
- 35–45%: Poor

#### Humidity air quality index

Available for humidity sensor modules (BSRH, UCRH). Shows the humidity air quality score as a percentage (0–100%). This entity is disabled by default.

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

- The Duco box enforces a rate limit of 200 write requests per day. When the limit is reached, the integration shows a notification and stops sending write requests until the quota resets automatically around midnight.
- Timed speed overrides set by a connected wall unit (such as a UCCO2) cannot be triggered from Home Assistant. They are read-only: the current ventilation level is shown as a percentage, but setting a speed from Home Assistant always uses the permanent manual mode (a continuous override with no time limit).
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

### Failed to set ventilation state (rate limit)

#### Symptom

Setting the fan speed or preset mode fails with a notification in the Home Assistant UI:

> The Duco device has reached its daily write limit. Try again tomorrow.

#### Description

The Duco box enforces a write rate limit of 200 write requests per day. When the limit is reached, the box rejects further write requests until the quota resets around midnight.

#### Resolution

Wait until midnight for the quota to reset. To avoid hitting the limit, reduce the frequency of automations that change the ventilation state.

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
