---
title: Duco
description: Instructions on how to integrate Duco ventilation with Home Assistant.
ha_release: 2026.4
ha_category:
  - Fan
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ronaldvdmeer'
ha_domain: duco
ha_platforms:
  - fan
ha_integration_type: service
ha_quality_scale: bronze
---

The **Duco** {% term integration %} allows you to monitor and control [Duco](https://www.duco.eu/) demand-controlled ventilation (DCV) systems from Home Assistant. Duco produces ventilation boxes for residential buildings that regulate air quality based on CO₂ and humidity sensors. This integration communicates locally with the Duco box over your home network, requiring no cloud connection.

## Supported devices

This integration communicates with the **DUCO Connectivity Board** (article 0000-4810) via its local REST API over WiFi or Ethernet.

| Hardware | Status |
|----------|--------|
| DUCO Connectivity Board 1.0 | Supported |
| DUCO Connectivity Board 2.0 | Not tested |

Compatible DucoBox models:

- DucoBox Silent Connect
- DucoBox Focus (from firmware version 17xxxx)
- DucoBox Hygro Plus
- DucoBox Energy Comfort / Energy Comfort Plus
- DucoBox Energy Premium

## Prerequisites

- A Duco ventilation box with a DUCO Connectivity Board connected to your local network.
- The IP address or hostname of your Duco Connectivity Board.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your DUCO Connectivity Board on the local network."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per ventilation node found in your Duco system. Each node represents a physical ventilation unit (such as the main box or a valve).

### Fan

The fan entity lets you control the ventilation speed of a node. You can set the speed as a percentage (mapped to three discrete levels), use the **Auto** preset, or use the on/off controls.

| Control | Action |
|---------|--------|
| Off | Hands control back to Duco (Auto mode). Duco manages the speed automatically. |
| Low (33%) | Low speed — permanent manual override (CNT1). |
| Medium (66%) | Medium speed — permanent manual override (CNT2). |
| High (100%) | High speed — permanent manual override (CNT3). |
| Auto preset | Same as Off: hands control back to Duco. |

The fan card shows as **off** (grey) when Duco is in automatic control mode, and as **on** when a manual speed is active.

Timed speed overrides (set externally, for example via a CO₂ sensor) are shown at their equivalent percentage level in Home Assistant, but writing a speed always uses the permanent mode.

## Use cases

- Switch to high ventilation automatically when cooking or showering.
- Return to auto mode when everyone leaves home using a presence-based automation.
- Monitor ventilation activity over time via the logbook.

## Examples

### Activate high ventilation while cooking

This automation switches the ventilation to high speed when the kitchen hood is turned on, and returns it to auto mode five minutes after the hood is switched off.

```yaml
- alias: "High ventilation while cooking"
  triggers:
    - trigger: state
      entity_id: switch.kitchen_hood
      to: "on"
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_manual_control
      data:
        percentage: 100

- alias: "Return to auto after cooking"
  triggers:
    - trigger: state
      entity_id: switch.kitchen_hood
      to: "off"
      for: "00:05:00"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.living_manual_control
```

### Reduce ventilation when nobody is home

When the last person leaves home, the ventilation is turned off (Duco takes over in automatic mode at its minimum speed). When someone returns, it goes back to medium speed.

```yaml
- alias: "Ventilation off on leave"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.living_manual_control

- alias: "Ventilation on on arrive"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      above: 0
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_manual_control
      data:
        percentage: 66
```

## Data updates

The integration {% term polling polls %} the Duco box every 30 seconds.

## Known limitations

- The integration does not yet expose CO₂ and humidity sensor data from connected Duco modules. This is planned for a future update.
- The integration does not support automatic discovery; the IP address or hostname must be entered manually.
- **Write rate limit**: The DUCO Connectivity Board firmware allows approximately 200 write requests per hour. Rapid successive changes (for example, clicking the speed slider quickly) can trigger a rate limit error. If this happens, Home Assistant will show an error notification and you should wait a few minutes before trying again. The quota resets automatically.

## Troubleshooting

### Cannot connect to Duco box

#### Symptom

The integration setup fails with a "Cannot connect" error.

#### Description

Home Assistant cannot reach the Duco box at the configured address. This is usually a network connectivity issue.

#### Resolution

1. Check that the Duco box is powered on and connected to your local network.
2. Confirm the IP address or hostname is correct by opening `http://<host>` in a browser on your local network.
3. If the Duco box received a new IP address from your router, update the integration: go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Duco**, and reconfigure the host.

### Entities show as unavailable

#### Symptom

All entities show as unavailable after the integration was working correctly.

#### Description

Home Assistant lost the connection to the Duco box during operation. This can happen if the box is restarted, loses power, or its IP address changes.

#### Resolution

1. Check that the Duco box is powered on and reachable on your network.
2. Reload the integration via {% my integrations title="**Settings** > **Devices & services**" %} > **Duco** > **Reload**.
3. If the box has a new IP address, reconfigure the integration with the updated address.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
