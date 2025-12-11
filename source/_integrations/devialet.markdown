---
title: Devialet
description: Instructions on how to integrate Devialet devices into Home Assistant.
ha_category:
  - Media Player
ha_release: 2023.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: devialet
ha_codeowners:
  - '@fwestenberg'
ha_zeroconf: true
ha_integration_type: device
ha_platforms:
  - diagnostics
  - media_player
---

The **Devialet** integration lets you control your [Devialet](https://www.devialet.com) wireless speakers from Home Assistant.

{% important %}

- For a stereo setup, only one of the speakers need to be configured.
- Make sure your Devialet firmware version is 2.16.1 or later. Otherwise, expect functions not to work.
- Assigning a fixed IP address to your speakers is highly recommended.

{% endimportant %}

{% include integrations/config_flow.md %}

## Tested models

Known supported devices:

- Phantom I
- Phantom II

## Turning off the device

The media player `turn off`  button and the `media_player.turn_off` action will turn off all the devices of the designated system. Exiting OFF mode is only possible by pressing a physical button on each device.
