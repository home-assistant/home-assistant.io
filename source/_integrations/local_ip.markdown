---
title: Local IP Address
description: Instructions on how to integrate the Local IP Address sensor into Home Assistant.
ha_category:
  - Network
ha_iot_class: Local Polling
ha_release: 0.104
ha_config_flow: true
ha_codeowners:
  - '@issacg'
ha_domain: local_ip
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `local_ip` sensor will expose the local (LAN) IP address of your Home Assistant instance. This can be useful when your instance has a static public hostname (for example, if you use the Nabu Casa service), but have a dynamically allocated local LAN address (for example, configured via DHCP).

{% include integrations/config_flow.md %}
