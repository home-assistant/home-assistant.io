---
title: Brunt Blind Engine
description: Instructions on how to set up Brunt Blind Engine within Home Assistant.
ha_category:
  - Cover
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: brunt
ha_platforms:
  - cover
ha_config_flow: true
ha_integration_type: integration
---

The **Brunt Blind Energy** {% term integration %} allows one to control Blind Engines by [Brunt](https://www.brunt.co). To use it, you need a Brunt App Account. All Brunt Blind devices registered to your account are automatically added to your Home Assistant with the names given them through the Brunt app.

{% warning %}
This integration is not affiliated with Brunt and retrieves data from the endpoints of the mobile application. Use at your own risk.
{% endwarning %}

{% include integrations/config_flow.md %}
