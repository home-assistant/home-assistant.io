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
  - diagnostics
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
- Network access from Home Assistant to the BLUETTI cloud service (this integration does not talk to your power station directly over the local network, except for the optional local Modbus connection described below).

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

This integration is cloud-based by default: it talks to the BLUETTI cloud service, not directly to your power station over the local network.

- **Push updates**: the integration keeps a WebSocket connection open to the BLUETTI cloud. When your power station reports a change (for example, you toggle a switch in the official BLUETTI app), Home Assistant is notified and refreshes that device's entities within a few seconds.
- **Polling fallback**: independently of push updates, each device is also {% term polling polled %} every 30 seconds, so entities stay up to date even if a push notification is missed.
- **Availability**: if the BLUETTI cloud is unreachable, or your account's authorization expires, affected entities are marked `unavailable` rather than showing stale data.

### Optional: local Modbus for Balco260 / EP2000

Balco260 and EP2000 also expose a local Modbus TCP interface, in addition to the cloud API. For these models, once the device is enabled in this integration, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **BLUETTI** integration, choose **Configure**, and then select **Configure local Modbus**:

{% configuration_basic %}
Device:
  description: "The BLUETTI power station to configure the local Modbus connection for."
Host:
  description: "The hostname or IP address of the device's local Modbus TCP interface."
Port:
  description: "The Modbus TCP port to connect to. The default is `502`."
{% endconfiguration_basic %}

This is entirely optional and additive:

- It surfaces data the cloud API doesn't report (real battery charge/discharge energy, cycle count, per-string PV data), as extra sensors on the same device.
- It does not replace the cloud connection - if the local Modbus connection drops, only those extra sensors go `unavailable`; the device's normal cloud-sourced entities and controls keep working.
- It's polled every 30 seconds, matching the cloud path.

## Known limitations

- **Cloud-dependent by default**: this integration relies on the BLUETTI cloud service (OAuth2 login and WebSocket push), and stops updating if BLUETTI's cloud service is unreachable. The optional local Modbus connection for Balco260/EP2000 is supplementary, not a replacement for the cloud connection.
- **One BLUETTI account per Home Assistant install**: all devices from a given BLUETTI account are grouped under a single integration entry.
- **Newly bound devices require a manual step**: after binding a new device to your BLUETTI account, use the integration's **Configure** option to add it - it isn't picked up automatically.
- **SMeter accessories aren't supported over local Modbus yet**: only Balco260 and EP2000 can be configured with a local Modbus connection today. Whether an SMeter accessory shows up as its own device in a BLUETTI cloud account is unconfirmed, so support for it isn't implemented yet.
- **Sensor coverage varies by model**: not every measurement or control reported by every power station model is mapped to a Home Assistant entity yet.

## Troubleshooting

### Cannot connect to the BLUETTI cloud

Check your network, ports, and firewall to ensure Home Assistant can reach the BLUETTI cloud service.

### A newly bound device doesn't show up

Devices bound to your BLUETTI account after the integration was first set up aren't added automatically. Use the integration's **Configure** option to add them.

## Removing the integration

{% include integrations/remove_device_service.md %}
