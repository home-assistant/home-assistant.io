---
title: Hegel Amplifier
description: Instructions on integrating Hegel amplifiers into Home Assistant.
ha_category:
  - Media player
ha_release: 2026.3
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@boazca'
ha_domain: hegel
ha_platforms:
  - media_player
ha_ssdp: true
ha_quality_scale: silver
ha_integration_type: device
---

The **Hegel** {% term integration %} allows you to control your [Hegel Music Systems](https://www.hegel.com/) amplifiers from Home Assistant.

## Supported devices

The following Hegel amplifiers are supported:

- Röst
- H95
- H120
- H190
- H190V
- H390
- H590

Other Hegel models with IP control support may also work.

## Prerequisites

- Your Hegel amplifier must be connected to the same network as Home Assistant.
- TCP port 50001 must be accessible between Home Assistant and your amplifier.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address of your Hegel amplifier.
Model:
  description: Your Hegel amplifier model.
{% endconfiguration_basic %}

## Supported functionality

This integration provides a media player entity with the following controls:

- Power on/off
- Volume control
- Mute toggle
- Input source selection

The available input sources depend on your amplifier model.

## Troubleshooting

### Cannot connect to the amplifier

1. Make sure the amplifier is powered on and connected to the network.
2. Verify the IP address is correct.
3. Check that TCP port 50001 is not blocked by a firewall.
4. Try power cycling the amplifier.

### Wrong input names or missing inputs

Make sure you selected the correct Hegel model during setup. You can reconfigure the integration to change the model.

### Debug logging

To enable debug logging for this integration, add the following to your {% term "`configuration.yaml`" %}:

```yaml
logger:
  logs:
    homeassistant.components.hegel: debug
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
