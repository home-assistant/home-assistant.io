---
title: Notion
description: How to integrate Notion kits within Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Sensor
ha_release: 0.96
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: notion
---

The `Notion` component retrieves data from [Notion](https://getnotion.com) wireless
home monitoring sensor kits.

## Configuration

To add your Notion kits to your Home Assistant installation, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notion:
  username: YOUR_EMAIL_ADDRESS
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: An email address for an active Notion account.
  required: true
  type: string
password:
  description: The password for the account.
  required: true
  type: string
{% endconfiguration %}
