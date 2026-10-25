---
title: Monoprice 6-Zone Amplifier
description: Instructions on how to integrate Monoprice 6-Zone Home Audio Controller into Home Assistant.
ha_categories:
  - media_entertainment.speakers_audio
ha_release: 0.56
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@etsinko'
  - '@OnFreund'
ha_domain: monoprice
ha_platforms:
  - media_player
  - number
ha_integration_type: hub
---

The **Monoprice 6-Zone Amplifier** {% term integration %} allows you to control [Monoprice 6-Zone Amplifier](https://www.monoprice.com/product?p_id=10761) using a serial connection.

{% include integrations/config_flow.md %}


## Configuration notes

If you are using an IP232 module instead of a direct serial connection, then use `socket://<host>:<port>` in the port setting.
  
Sources can also be later edited from the integration options (gear icon in the top right when selecting the integration). Note that editing sources will remove the snapshot you may have saved.

## Zone management

Devices and entities are created for each of the possible 18 zones, and can be enabled, disabled and renamed through regular Home Assistant methods.
By default, the first 6 zones (11..16) are enabled, and there's an attempt to automatically detect the 12 extension zones (21..26, and 31..36) on the first run.

## Tone controls

Each zone has **Bass**, **Treble**, and **Balance** {% term entities %} in the configuration section of its device page.

- **Bass** and **Treble** go from -7 to +7.
- **Balance** goes from -10 (left) to +10 (right), with 0 in the center.

The values are read together with the rest of the zone's status, so they do not add any queries to the amplifier. The controls are unavailable while their zone is off.

Tone controls are only created for zones whose media player is enabled. If you enable a zone later, the integration reloads and adds its controls.

{% include integrations/actions.md %}
