---
title: Actiontec
description: Instructions on how to integrate Actiontec routers into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: 0.7
ha_domain: actiontec
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

This platform allows you to detect presence by looking at connected devices to an [Actiontec](https://www.actiontec.com/) device.

Supported devices (tested):

- MI424WR (Verizon FIOS)

<div class='note warning'>
This device tracker needs telnet to be enabled on the router.
</div>

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: actiontec
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.1.1`.
  required: true
  type: string
username:
  description: The username of a user with administrative privileges, usually `admin`.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
