---
title: Fluss+
description: Instructions on how to integrate Fluss+ devices within Home Assistant.
ha_category:
  - Button
ha_release: "2024.11"
ha_iot_class: Cloud Polling
ha_codeowners:
    -'@fluss'
ha_domain: fluss
ha_config_flow: true
ha_platforms:
  - button
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Fluss+** {% term integration %} allows you to control [Fluss+](https://fluss.io/) devices through Home Assistant.

## Prerequisites

- A Fluss+ account
- The Fluss+ app installed on your smart phone.
- During setup of the integration in Home Assistant, you will be prompted to input your API key.
   - You can find the API key in your Fluss+ app.

{% include integrations/config_flow.md %}
