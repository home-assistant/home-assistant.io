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
  - sensor
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

The integration creates one device per ventilation node found in your Duco system. Each node represents a physical ventilation unit (such as the main box or a valve).

### Fan

The fan entity lets you control the ventilation speed of a node using preset modes. Select the **Auto** preset to let Duco manage ventilation automatically based on air quality.

| Preset | Description |
|--------|-------------|
| Auto | Duco controls ventilation automatically based on air quality. |
| Away | Reduced ventilation for when nobody is home. |
| Low | Low speed timed manual override (~15 minutes). |
| Low (permanent) | Low speed permanent manual override. |
| Medium | Medium speed timed manual override (~15 minutes). |
| Medium (permanent) | Medium speed permanent manual override. |
| High | High speed timed manual override (~15 minutes). |
| High (permanent) | High speed permanent manual override. |

### Sensor

- **Ventilation state**
  - **Description**: The raw Duco ventilation state as reported by the box (for example `AUTO`, `MAN2`, or `CNT3`). Useful for logbook visibility and detailed automations.

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
    - action: fan.set_preset_mode
      target:
        entity_id: fan.living_ventilation
      data:
        preset_mode: high

- alias: "Return to auto after cooking"
  triggers:
    - trigger: state
      entity_id: switch.kitchen_hood
      to: "off"
      for: "00:05:00"
  actions:
    - action: fan.set_preset_mode
      target:
        entity_id: fan.living_ventilation
      data:
        preset_mode: auto
```

### Switch to away mode when everybody leaves home

When the last person leaves home, the ventilation is set to Away mode to save energy.

```yaml
- alias: "Ventilation away mode on leave"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: fan.set_preset_mode
      target:
        entity_id: fan.living_ventilation
      data:
        preset_mode: away

- alias: "Ventilation auto mode on arrive"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      above: 0
  actions:
    - action: fan.set_preset_mode
      target:
        entity_id: fan.living_ventilation
      data:
        preset_mode: auto
```

## Data updates

The integration {% term polling polls %} the Duco box every 30 seconds.

## Known limitations

- Timed presets (Low, Medium, High without "permanent") follow Duco's internal timer. Home Assistant cannot configure the override duration.
- The integration currently only supports ventilation control nodes. CO₂ and humidity sensor data from Duco modules is not yet exposed.
- The integration does not support automatic discovery; the IP address or hostname must be entered manually.

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
