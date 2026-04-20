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
  - fan
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
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

## Prerequisites

- A Duco ventilation box with a DUCO Connectivity Board connected to your local network.

{% include integrations/config_flow.md %}

Your Duco ventilation box can be automatically discovered on your network when the device is connected and powered on. When Home Assistant discovers a new Duco device, it appears as a notification in the UI. Select the notification to complete the setup.

If automatic discovery does not work, you can manually add the integration by providing the IP address or hostname.

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your DUCO Connectivity Board on the local network, for example `192.168.1.10`. Only needed when setting up the integration manually."
{% endconfiguration_basic %}

## Supported functionality

The Duco system consists of multiple nodes. Each node appears as a separate device in Home Assistant, connected to the main ventilation box:

- **BOX** — the main DucoBox (fan control, ventilation state)
- **UCCO2** — a wireless CO₂ sensor module
- **BSRH** — a humidity sensor module installed inside the DucoBox

### Fan

The fan entity lets you control the ventilation speed of a node. You can set the speed as a percentage or switch back to automatic mode.

The fan is always on. Setting the speed to 0% returns control to Duco (automatic mode), after which the firmware automatically resumes ventilation.

The following actions are available:

- **Speed 0%**: Hands control back to Duco (automatic mode).
- **Speed 33%**: Low speed manual override.
- **Speed 66%**: Medium speed manual override.
- **Speed 100%**: High speed manual override.
- **Auto preset**: Same as speed 0%; hands control back to Duco.

When an external device (for example a CO₂ sensor or an RF wall switch) triggers a timed speed override on the Duco box, Home Assistant reflects the current ventilation level as a percentage. These timed states cannot be set from Home Assistant; writing a speed always uses the permanent manual mode (a continuous override with no time limit).

### Sensors

The following sensor entities are created per node, depending on the node type:

#### Ventilation state

Available for the main ventilation box (BOX). Shows the current ventilation state, for example:

- Automatic
- Continuous high speed
- Manual low speed (15 min)

#### CO₂ concentration

Available for CO₂ sensor modules. Shows the current CO₂ concentration in parts per million (ppm).

#### Humidity

Available for humidity sensor modules (BSRH). Shows the current relative humidity in percent.

#### CO₂ air quality index

Available for CO₂ sensor modules. Shows the CO₂ air quality score as a percentage (0–100%). This entity is disabled by default.

Indoor air quality ranges for CO₂:

- 90–100%: Very good
- 75–85%: Good
- 50–70%: Temporarily acceptable
- 35–45%: Poor

#### Humidity air quality index

Available for humidity sensor modules (BSRH). Shows the humidity air quality score as a percentage (0–100%). This entity is disabled by default.

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
        entity_id: fan.living_ventilation
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
        entity_id: fan.living_ventilation
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
        entity_id: fan.living_ventilation
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
        entity_id: fan.living_ventilation
      data:
        percentage: 66
```

### Boost ventilation when CO₂ is high

This automation switches to high speed when the CO₂ level in the office rises above 1000 ppm, and returns to automatic mode when it drops back below 800 ppm.

```yaml
- alias: "Boost ventilation on high CO2"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.office_co2_carbon_dioxide
      above: 1000
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_ventilation
      data:
        percentage: 100

- alias: "Return to auto when CO2 is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.office_co2_carbon_dioxide
      below: 800
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_ventilation
      data:
        percentage: 0
```

## Data updates

The integration {% term polling polls %} the Duco box every 30 seconds.

## Known limitations

- The Duco box enforces a rate limit of approximately 200 write requests per day (HTTP 429, error code 18). The integration handles this gracefully, and the firmware resets the quota automatically around midnight.
- Timed speed overrides set by external devices (such as an RF wall switch or a CO₂ sensor) cannot be triggered from Home Assistant. They are read-only: the current ventilation level is shown as a percentage, but setting a speed from Home Assistant always uses the permanent manual mode (a continuous override with no time limit).

## Troubleshooting

### Device is not automatically discovered

If your Duco ventilation box is not automatically discovered:

- Ensure the device is powered on and connected to the same network as Home Assistant.
- Check that mDNS/Bonjour traffic is not blocked by your router or firewall.
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
4. If the Duco box received a new IP address from your router, Home Assistant updates the address automatically the next time the box is discovered via mDNS. If that does not happen, see [Reconfiguring the integration](#reconfiguring-the-integration).

### Failed to set ventilation state (rate limit)

#### Symptom

Setting the fan speed or preset mode fails with an error like:

```text
Failed to set ventilation state: DucoError('Duco API error (429): {"Code":18,"Result":"FAILED"}')
```

#### Description

The Duco box enforces a write rate limit of 200 write requests per day. When the limit is reached, the box rejects further write requests with a 429 error until the quota resets around midnight.

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
