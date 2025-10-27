---
title: Sony Projector
description: Instructions on how to integrate Sony projectors using SDCP as a media player in Home Assistant.
ha_category:
  - Multimedia
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.89
ha_domain: sony_projector
ha_platforms:
  - media_player
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---

The **Sony Projector** {% term integration %} allows Home Assistant to control the power state of SDCP-compatible, network-connected projectors from [Sony](https://www.sony.com/). It exposes the projector as a media player entity with on/off controls.

{% include integrations/config_flow.md %}

## Projector settings

Under your projector's web interface Advanced Menu, you may need to:
- Enable/start the PJ Talk service.
- Add the IP address of your Home Assistant server to the Host address field.

## Entities

- Media player: Represents the projector and supports turning the device on and off.
- Legacy switch (deprecated; transitional): If you still have a `switch:` YAML entry for `sony_projector`, a temporary compatibility switch entity is provided to keep existing automations working. It disappears automatically after you remove the YAML and restart. A repair notice appears only when your automations, scripts, scenes, or groups reference the legacy switch and will clear automatically after a reload or restart once no references remain.

## YAML configuration

YAML configuration for `sony_projector` is no longer supported. If you previously configured this integration using YAML, remove any `sony_projector` entries from your `configuration.yaml` (including legacy `switch` or `media_player` sections) and set up the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

After removing the YAML and restarting Home Assistant:
- The temporary compatibility switch (if present) is removed automatically
- The Repairs notice about the legacy switch clears automatically after a reload or restart once no automations or scripts reference it

Tip: to re-check immediately without restarting, reload the Sony Projector integration from Settings → Devices & Services.

To migrate existing automations, update them to call `media_player.turn_on` and `media_player.turn_off` on the projector entity. To find where the legacy switch is used, open Settings → Developer tools → Search and look up the switch entity to see related automations, scripts, scenes, and groups.
