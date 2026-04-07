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
ha_integration_type: hub
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

The integration creates one device for the main Duco box. Connected modules (such as CO₂ sensors or humidity sensors) are discovered but not yet exposed as separate devices.

### Fan

The fan entity lets you control the ventilation speed of a node. You can set the speed as a percentage or switch back to automatic mode.

The fan is always on — turning it off hands control back to Duco (automatic mode), after which the firmware automatically resumes ventilation and the entity switches back to on to reflect the actual state. Because the entity is always on, the turn on action is never triggered.

| Action | Result |
|--------|--------|
| Turn off | Hands control back to Duco (automatic mode). |
| Speed 33% | Low speed manual override. |
| Speed 66% | Medium speed manual override. |
| Speed 100% | High speed manual override. |
| Auto preset | Same as turn off: hands control back to Duco. |

Timed speed overrides triggered externally (for example by a CO₂ sensor) are shown at their equivalent percentage level in Home Assistant, but writing a speed always uses the permanent mode.

## Use cases

- Switch to high ventilation automatically when cooking or showering.
- Return to auto mode when everyone leaves home using a presence-based automation.
- Monitor ventilation activity over time via the logbook.

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
    - action: fan.turn_off
      target:
        entity_id: fan.living_ventilation
```

### Reduce ventilation when nobody is home

When the last person leaves home, the ventilation hands control back to Duco (automatic mode). When someone returns, it switches to medium speed.

```yaml
- alias: "Ventilation auto mode on leave"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.living_ventilation

- alias: "Ventilation medium speed on arrive"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      above: 0
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.living_ventilation
```

## Data updates

The integration {% term polling polls %} the Duco box every 30 seconds.

## Known limitations

- The integration does not yet expose CO₂ and humidity sensor data from connected Duco modules. This is planned for a future update.
- The integration does not support automatic discovery; the IP address or hostname must be entered manually.
- The Duco box enforces a rate limit of approximately 200 write requests per hour (HTTP 429, error code 18). The integration handles this gracefully, and the firmware resets the quota automatically.

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
