---
title: TIS Control
description: Instructions on how to integrate a TIS Control smart-building system with Home Assistant.
ha_category:
  - Light
ha_release: 2026.11
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mohamedalshourafa-del'
ha_domain: tis_control
ha_platforms:
  - light
ha_integration_type: hub
ha_quality_scale: bronze
---

The **TIS Control** {% term integration %} lets you control a [TIS Control](https://www.tiscontrol.com) smart-building system from Home Assistant. TIS modules (dimmers, relay controllers, curtain and HVAC controllers, sensors and wall panels) share a wired bus that is connected to your network through one or more TIS IP gateways. Home Assistant talks to the bus directly on your local network; no cloud account is used.

## Supported devices

This integration supports TIS dimmer modules, for example:

- DIM-6CH-2A, DIM-4CH-3A, DIM-2CH-6A and other DIM dimmers
- TIS-DMX-48

Each dimmer channel becomes a light in Home Assistant. Relay, curtain and HVAC modules are not supported yet.

## Prerequisites

- A TIS installation with at least one TIS IP gateway (an IP-COM-PORT, a GTY gateway, or an RCU controller with a network port) on the same network as Home Assistant.
- Home Assistant must be able to receive UDP broadcasts on port 6000 from the gateway. This works out of the box on Home Assistant OS and on a container that uses host networking.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of any TIS IP gateway on your network, for example `192.168.1.50`. If your installation has several gateways, enter any one of them; modules behind the other gateways are found too."
Port:
  description: "The TIS bus port. Leave it at `6000` unless your installer changed it."
{% endconfiguration_basic %}

During setup, Home Assistant asks every TIS module on the network to identify itself. This only reads information; nothing is switched. Every dimmer channel that is found is added as a light, grouped under a device named after the module.

## Supported functionality

### Lights

Each dimmer channel is a light that supports:

- On and off
- Brightness
- Transition (fade time, in whole seconds)

When you turn a light on without choosing a brightness, it returns to the level it had before it was turned off.

## Data updates

TIS modules announce every change on the bus, whether it comes from Home Assistant, a wall switch, a touch panel or the TIS app, and the integration updates within a fraction of a second. As a safety net, the integration also reads every module every 30 seconds. A module that does not answer is shown as unavailable until it answers again.

## Examples

### Turn the hallway lights on at sunset

```yaml
automation:
  - alias: "Hallway lights at sunset"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: light.turn_on
        target:
          entity_id: light.hallway_dimmer_channel_1
        data:
          brightness_pct: 60
          transition: 5
```

## Known limitations

- Only dimmer channels are supported for now.
- Channels are named **Channel 1**, **Channel 2**, and so on. Rename them in Home Assistant to match your rooms.
- Modules added to the installation after setup appear after you remove and add the integration again.

## Troubleshooting

### No TIS dimmers answered

- Check that the IP address is the address of a TIS IP gateway.
- Check that Home Assistant is on the same network as the gateway. Broadcasts do not cross routers or VLANs.
- If Home Assistant runs in a container, make sure it uses host networking.
- Make sure no other program on the Home Assistant host is using UDP port 6000 exclusively.

### A light shows as unavailable

The module stopped answering status reads. Check its power and bus connection; the light becomes available again by itself once the module answers.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service_steps.md %}
