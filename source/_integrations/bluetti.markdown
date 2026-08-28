---
title: BLUETTI
description: Instructions on how to integrate BLUETTI portable power stations with Home Assistant.
ha_category:
  - Energy
ha_iot_class: Cloud Push
ha_codeowners:
  - '@chpego'
ha_domain: bluetti
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: hub
ha_release: 2026.10
ha_quality_scale: silver
---

The **BLUETTI** {% term integration %} connects Home Assistant to your [BLUETTI](https://www.bluettipower.com/) portable power stations through the BLUETTI cloud service, letting you monitor battery levels and input/output power.

## Supported devices

The integration supports the BLUETTI power stations bound to your BLUETTI account, across several product families, including Apex, Elite, AORA, Premium, EP, RV5, Balco, AC-series, and AC200-series models. Which sensors are available depend on what your specific model reports over the BLUETTI cloud API. Not every model exposes every entity described below.

## Prerequisites

- A BLUETTI account, with the power station(s) you want to use already bound to it in the BLUETTI app.
- Network access from Home Assistant to the BLUETTI cloud service (this integration does not talk to your power station directly over the local network).

{% include integrations/config_flow.md %}

Signing in opens the BLUETTI account login page. After you authorize Home Assistant to access your account, select which of your bound power stations to add.

## Supported functionality

The **BLUETTI** integration can provide the following entities, depending on what your power station model supports:

### Sensors

- Battery state of charge (SOC).
- PV (solar) input power.
- Grid input power.
- AC and DC output power.
- Inverter status.

## BLUETTI automation examples

The real power of this integration is being notified about your power station's state without having to open the BLUETTI app.
Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the power station battery is low

```yaml
automation:
  - alias: "Notify when the power station battery is low"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.power_station_battery_level
        below: 20
    conditions: []
    actions:
      - action: notify.mobile_app_your_phone
        data:
          message: "The BLUETTI power station's battery is below 20%."
```

### Automation: Notify when the power station starts drawing from the grid

```yaml
automation:
  - alias: "Notify when the power station starts drawing from the grid"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.power_station_grid_input_power
        above: 0
    conditions: []
    actions:
      - action: notify.mobile_app_your_phone
        data:
          message: "The BLUETTI power station is drawing power from the grid."
```

## Data updates

This integration is cloud-based: it talks to the BLUETTI cloud service, not directly to your power station over the local network.

- **Push updates**: the integration keeps a WebSocket connection open to the BLUETTI cloud. When your power station reports a change (for example, you toggle a switch in the official BLUETTI app), Home Assistant is notified and refreshes that device's entities within a few seconds.
- **Polling fallback**: independently of push updates, each device is also {% term polling polled %} every 30 seconds, so entities stay up to date even if a push notification is missed.
- **Availability**: if the BLUETTI cloud is unreachable, or your account's authorization expires, affected entities are marked `unavailable` rather than showing stale data.

## Known limitations

- **Cloud-dependent**: this integration relies on the BLUETTI cloud service (OAuth2 login and WebSocket push), and stops updating if BLUETTI's cloud service is unreachable.
- **One BLUETTI account per Home Assistant install**: all devices from a given BLUETTI account are grouped under a single integration entry.
- **Newly bound devices require a manual step**: after binding a new device to your BLUETTI account, use the integration's **Configure** option to add it - it isn't picked up automatically.
- **Sensor coverage varies by model**: not every measurement or control reported by every power station model is mapped to a Home Assistant entity yet.

## Troubleshooting

### Cannot connect to the BLUETTI cloud

Check your network, ports, and firewall to ensure Home Assistant can reach the BLUETTI cloud service.

### A newly bound device doesn't show up

Devices bound to your BLUETTI account after the integration was first set up aren't added automatically. Use the integration's **Configure** option to add them.

## Removing the integration

{% include integrations/remove_device_service.md %}
