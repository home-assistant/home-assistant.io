---
title: Plum Lightpad
description: Instructions on setting up Plum Lightpads within Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Push
ha_config_flow: true
ha_release: 0.85
ha_domain: plum_lightpad
ha_codeowners:
  - '@ColinHarrington'
  - '@prystupa'
---

Configurable/Dimmable Wi-Fi Lightswitch
- Cloud registered, Local API communication (both RESTful and TCP pushed events)
- Motion Sensor
- Energy Meter
- RGB Glow Ring
- Wi-Fi & Bluetooth connectivity
- Phone Apps for iOS & Android

## Configuration

To use Plum Lightpad devices in your installation, add your Plum account from the integrations page.
Alternatively, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
plum_lightpad:
  username: YOUR_CLOUD_USERNAME
  password: YOUR_CLOUD_PASSWORD
```

{% configuration %}
username:
  required: true
  description: Your Plum Cloud username.
  type: string
password:
  required: true
  description: Your Plum Cloud password.
  type: string
{% endconfiguration %}
