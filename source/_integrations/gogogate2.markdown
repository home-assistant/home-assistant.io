---
title: Gogogate2
description: Instructions on how to integrate Gogogate2-Enabled garage door covers into Home Assistant.
logo: gogogate2.png
ha_category:
  - Cover
ha_release: 0.67
ha_iot_class: Local Polling
ha_domain: gogogate2
---

The `gogogate2` cover platform lets you control Gogogate2-Enabled garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your Gogogate2 mobile app.

## Configuration

To use your Gogogate2 cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: gogogate2
    username: email@email.com
    password: password
    ip_address: 192.168.1.200
```

{% configuration %}
username:
  description: Your Gogogate2 account username.
  required: true
  type: string
password:
  description: Your Gogogate2 account password.
  required: true
  type: string
ip_address:
  description: The IP Address of your Gogogate2 device.
  required: true
  type: string
name:
  description: Allows you to override the default name.
  default: gogogate2
  required: false
  type: string
{% endconfiguration %}
