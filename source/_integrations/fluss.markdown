---
title: Fluss+
description: Instructions on how to integrate Fluss+ devices within Home Assistant.
ha_category:
  - Button
ha_release: 2024.5
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

The `Fluss+` integration allows you to control [Fluss+](https://fluss.io/) devices through Home Assistant.

## Configuration

To add the Fluss+ Integration, follow these steps:

1. Go to your instance of Home Assistant.
2. Navigate to **Settings**.
3. Go to **Devices & Services**.
4. Click the **+ Integration** button.
5. Search for **Fluss+**.
6. You will be prompted to input your API key, which can be found in the Fluss+ app.

{% details "Manual Configuration" %}

To enable Fluss+ in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for Fluss+ with additional options
```yaml
# Example configuration.yaml entry
fluss:
  api_key: YOUR_API_KEY
{% enddetails %}