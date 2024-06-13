---
title: Whois
description: Instructions on how to integrate WHOIS lookup sensor within Home Assistant.
ha_category:
  - Network
ha_release: 0.57
ha_iot_class: Cloud Polling
ha_domain: whois
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **Whois** {% term integration %} allows you to perform daily WHOIS lookups against your owned domains. This provides you with information such as `expiration_date`, `name_servers` and `registrar` details.

{% include integrations/config_flow.md %}
