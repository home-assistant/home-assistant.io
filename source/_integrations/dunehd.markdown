---
description: Instructions on how to integrate Dune HD media players into Home Assistant.
ha_release: 0.34
ha_domain: dunehd
---

The **Dune HD** {% term integration %} allows you to control a [Dune HD media player](https://dune-hd.com/eng/products/full_hd_media_players) from Home Assistant. Support is based on the official [IP protocol](https://dune-hd.com/support/ip_control/dune_ip_control_overview.txt) published by Dune.

Devices with firmware 110127_2105_beta or above are supported. Some functions may depend on the version of the protocol (volume / mute control is only available with version 2 onwards).

{% include integrations/config_flow.md %}
