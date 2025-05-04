---
title: Soundavo WS66i 6-Zone Amplifier
description: Instructions on how to integrate WS66i 6-Zone Home Audio Controller into Home Assistant.
ha_category:
  - Media player
ha_release: 2022.6
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@ssaenger'
ha_domain: ws66i
ha_platforms:
  - media_player
ha_integration_type: integration
---

The **Soundavo WS66i 6-Zone Amplifier** {% term integration %} allows you to control the [Soundavo Whole-Home Audio Amplifier](https://www.soundavo.com/products/ws-66i) via the local network. This amplifier is an upgrade of the amplifier sold by [Monoprice](https://www.monoprice.com/product?p_id=10761) that adds 2 built-in wireless streamers and an Ethernet port for control over LAN.

{% include integrations/config_flow.md %}

## Configuration notes

Enter the IP address of the WS66i amplifier when prompted to connect to the device and hit submit. It will detect the number of connected amplifiers and present each zone as an {% term entity %}.

- 1 Amplifier: Zones 11..16
- 2 Amplifiers: Zones 11..16, Zones 21..26
- 3 Amplifiers: Zones 11..16, Zones 21..26, Zones 31..36

Once detected, you can add them to an area.

## Source management

You can configure source names by hitting the **CONFIGURE** button in the integration card.
