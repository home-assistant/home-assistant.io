---
title: SRP Energy
description: How to integrate SRP Energy within Home Assistant.
ha_category:
  - Energy
ha_release: 2020.12
ha_iot_class: Cloud Polling
ha_domain: srp_energy
ha_codeowners:
  - '@briglx'
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

The SRP Energy integration shows information from SRP hourly energy usage report for their customers.

You need a username, password, and account ID which you can create at [SRP](https://www.srpnet.com).

{% include integrations/config_flow.md %}
