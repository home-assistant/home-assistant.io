---
title: "Zyxel T50"
description: "Instructions on how to integrate Zyxel T50 modem into Home Assistant."
ha_category:
- Presence Detection
ha_release: next
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@SLG'
ha_domain: zyxelt50
ha_platforms:
  - device_tracker
---

The `zyxelt50` integration is the main integration to connect to a [Zyxel T50](https://service-provider.zyxel.com/global/en/products/dsl-cpes/vdsl/residential-iads/vmg8825-t50k) based router.

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - The zyxelt50 platform offers presence detection by looking at connected devices to the modem.

{% include integrations/config_flow.md %}
