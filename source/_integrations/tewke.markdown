---
title: Tewke
description: Instructions on how to integrate Tewke devices with Home Assistant
ha_category:
  - Light
ha_release: 2026.8
ha_iot_class: Local Push
ha_codeowners:
  - '@1NFR4R3D'
  - '@oskarwilliams'
  - '@SirenGlitch'
ha_domain: tewke
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: gold
ha_zeroconf: true
---

The **Tewke** {% term integration %} lets you connect and control your [Tewke](https://www.tewke.com) Tap over your local network.

## Supported devices

The following devices are currently supported by the integration:

- Tewke Tap

## Prerequisites

The Tewke integration requires that your device is discoverable on your local network via mDNS/Zeroconf. 
Make sure your Tewke Tap is connected to the same network as your Home Assistant instance.

To make your Tap start broadcasting over mDNS so Home Assistant can discover it, update the following setting in the Tewke app:

1. Open the Tewke app.
2. Select the Tap you wish to add to Home Assistant.
3. Tap the {% icon "mdi:cog" %} **Settings** icon in the top right.
4. Scroll down to **Local integrations**.
5. Turn on **Home Assistant (BETA)** and **LAN CoAP**.

{% include integrations/config_flow.md %}

## Supported functionality

The Tewke integration currently provides the following entities, and in the future will also provide sensors, binary sensors, buttons, and numbers:

### Lights

- **Scenes**: Exposes Scenes configured on your Tap as light entities, allowing you to activate them and adjust their brightness.
- **Targets**: Exposes the gangs connected to your Wall Dock as light entities, allowing you to activate them and adjust their brightness if they are dimmable. Disabled by default.

## Tewke automation examples

Here are a few ideas for using your Tewke Tap in automations.

{% include docs/paste_yaml_tip.md %}

### Automation: Trigger a Wake-on-LAN from a Scene

This automation sends a Wake-on-LAN packet to turn on a computer when a switch is turned on, and sends a persistent notification. If the computer is already online (checked with Ping), it does nothing.

```yaml
automation:
  - alias: Turn on PC
    triggers:
      - trigger: switch.turned_on
        target:
          entity_id: switch.office_tap_pc
    conditions:
      - type: is_not_connected
        condition: device
        device_id: PING_DEVICE_ID
        entity_id: PING_ENTITY_ID
        domain: binary_sensor
        enabled: true
    actions:
      - action: persistent_notification.create
        data:
          title: "Wake-on-LAN"
          message: "Turning on computer"
      - action: button.press
        target:
          device_id: WOL_DEVICE_ID
    mode: single
```

## Data updates

The Tewke integration relies on local push data over CoAP, which means Home Assistant instantly updates when the state of your Tap changes. There is no polling interval to configure.

## Known limitations

- Managing (creating, deleting, or editing) Scenes must be done in the Tewke app. The integration will automatically detect these changes and add or remove the Scene entities in Home Assistant. Home Assistant can only trigger Scenes and set their brightness once they are configured on the Tap.

## Troubleshooting

### Device Swap Detected

If the integration reports a "Device swap detected!", it means the Home Assistant coordinator expected a specific Wall Dock ID, but the Tap is reporting a different one. This can happen if you move your Tap to a different Wall Dock. The integration will wait for a mDNS/Zeroconf update to resolve this. Ensure your device is properly seated in its dock and connected to the network.

### Unable to connect

If Home Assistant is unable to connect to your Tewke device, ensure it is powered on and connected to the local network. Make sure your router is not blocking mDNS (multicast) traffic, which is required for discovering Tap.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
