---
title: EE Bright Box
description: Instructions on how to integrate EE Bright Box router into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.87
ha_iot_class: Local Polling
ha_domain: ee_brightbox
ha_platforms:
  - device_tracker
---

This platform offers presence detection by looking at connected devices to a [EE Bright Box 2](https://ee.co.uk/help/phones-and-device/home-broadband/bright-box-2-wireless-router/bright-box-2-wireless-router) router.

## Configuration

To use a EE Bright Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ee_brightbox
    password: router-admin-password
```

{% configuration %}
host:
  description: The IP address of your router
  default: 192.168.1.1
  required: false
  type: string
username:
  description: Found at the back of the router in 'Router login details' section
  default: admin
  required: false
  type: string
password:
  description: Found at the back of the router in 'Router login details' section
  required: true
  type: string
version:
  description: Currently only version 2 of the router is supported
  default: 2
  required: false
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.
