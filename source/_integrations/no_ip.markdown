---
title: No-IP.com
description: Keep your computer registered with the NO-IP.com dynamic DNS.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 0.57
ha_domain: no_ip
ha_integration_type: integration
---

With the No-IP integration, you can keep your current IP address in sync with your [No-IP.com](https://www.noip.com) hostname or domain.

Please note that the integration does not automatically confirm your hostname (which is required periodically for free domain names). You will still need to do that manually.

Additionally, you have the flexibility to customize the timeout duration (default: 10 seconds) and the update interval (default: 5 minutes) according to your preferences.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}
