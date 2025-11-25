---
title: Aruba
description: Instructions on how to integrate Aruba routers into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.7
ha_iot_class: Local Polling
ha_domain: aruba
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This platform allows you to detect presence by looking at connected devices to an [Aruba Instant](https://www.arubanetworks.com/products/networking/aruba-instant/) device.

Supported devices (tested):

- Aruba AP-105
- Aruba AP-205
- Aruba AP-505
- Aruba AP-515
- Aruba IAP-315
- Aruba IAP-335
- Aruba Instant IAP-275

{% important %}
This device tracker needs telnet to be enabled on the router.
{% endimportant %}

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: aruba
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
