---
title: Hisense AEH-W4A1
description: Instructions to setup the Hisense AEH W4A1 WiFi module for ACs.
ha_release: 0.103
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bannhead'
ha_domain: hisense_aehw4a1
ha_platforms:
  - climate
ha_integration_type: integration
---

The Hisense AEH-W4A1 is a Wi-Fi module used to give Wi-Fi connectivity to some Hisense ACs and rebranded models (Smart Cool, Beko and others).

Later AC models use other Wi-Fi modules (like AEH-W4B1 and AEH-W4E1) that are not compatible or otherwise tested with this integration.

It is highly recommended not to use one of the official smartphone applications and this integration at the same time, to avoid problems related to command collision.

{% include integrations/config_flow.md %}
