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

Please note that the integration updates your No-IP.com record at a fixed interval of 5 minutes, regardless of whether your IP address has changed or not. This ensures that your hostname or domain stays up to date with your current IP address.

To set up the integration, navigate to the No-IP integration page in Home Assistant, enter your No-IP.com account credentials, and provide the hostname or domain you want to update.

Please ensure that you have a valid No-IP.com account and a registered hostname or domain before configuring this integration.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}
