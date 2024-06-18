---
title: KMtronic
description: Integrate KMTronic devices
ha_category:
  - Switch
ha_release: 2021.3
ha_codeowners:
  - '@dgomes'
ha_iot_class: Local Push
ha_domain: kmtronic
ha_config_flow: true
ha_platforms:
  - switch
ha_integration_type: integration
---

Integrate [KMtronic devices](https://www.kmtronic.com/) into Home Assistant. KMtronic offers a large range of IP-connected relays that can be controlled over your local area network. This integration maps each of the relays as a separate device, enabling you to control various areas of your home (e.g. using each relay to control different garden sprinkler areas, or controlling the electrical distribution of your house from a central board).

{% include integrations/config_flow.md %}
