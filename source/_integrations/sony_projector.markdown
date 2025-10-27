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

The **Sony Projector** {% term integration %} allows Home Assistant to control the power state of SDCP-compatible, network-connected projectors from [Sony](https://www.sony.com/). It exposes the projector as a media player {% term entity %} with on/off controls.

## Prerequisites

Under your projector's web interface Advanced Menu, you may need to:
- Enable/start the PJ Talk service.
- Add the IP address of your Home Assistant server to the Host address field.

{% include integrations/config_flow.md %}

## Entities

- Media player: Represents the projector as an {% term entity %} and supports turning the device on and off.
- Legacy switch (deprecated; transitional): If you still have a `switch:` {% term YAML %} entry for `sony_projector`, a temporary compatibility switch {% term entity %} is provided to keep existing {% term automations %} working. It disappears automatically after you remove the {% term YAML %} and restart. A repair notice appears only when your {% term automations %}, {% term scripts %}, {% term scenes %}, or {% term groups %} reference the legacy switch and will clear automatically after a {% term reload %} or restart once no references remain.

## YAML configuration

{% term YAML %} configuration for `sony_projector` is no longer supported. If you previously configured this integration using {% term YAML %}, remove any `sony_projector` entries from your {% term "`configuration.yaml`" %} (including legacy `switch` or `media_player` sections) and set up the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

### Resolving the Deprecation

After removing the {% term YAML %} and restarting Home Assistant:
- The temporary compatibility switch (if present) is removed automatically.
- The **Repairs** notice about the legacy switch clears automatically after a {% term reload %} or restart once no automations or scripts reference it.

Tip: to re-check immediately without restarting, {% term reload %} the Sony Projector integration from {% my integrations title="**Settings** > **Devices & services**" %}.

### Migrating existing associations to new component

To migrate existing {% term automations %}, update them to call `media_player.turn_on` and `media_player.turn_off` on the projector {% term entity %}. To find where the legacy switch is used:
- Open Developer tools → States → Filter Entities.
- Look up the switch {% term entity %} via the Entity Column Filter (ie. `switch.*projector`).
- Click the (i) to open the entity details pane.
- Click the menu button → `Related` see related {% term automations %}, {% term scripts %}, {% term scenes %}, and {% term groups %}.
