---
title: MyQ
description: Instructions on how to integrate MyQ-Enabled garage door covers into Home Assistant.
ha_category:
  - Cover
  - Binary Sensor
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: myq
---

The `myq` cover platform lets you control MyQ-Enabled garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your MyQ Device mobile app.

## Configuration

To add `MyQ` cover to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **MyQ**.

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: myq
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your MyQ account username.
  required: true
  type: string
password:
  description: Your MyQ account password.
  required: true
  type: string
{% endconfiguration %}

### Binary Sensor

Your `MyQ` gateway will appear as a binary sensor that shows if the device is connected.

### Cover

Garage doors and gates linked to your `MyQ` account will appear as covers.
