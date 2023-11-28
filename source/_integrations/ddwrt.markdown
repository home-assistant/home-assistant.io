---
title: DD-WRT
description: Instructions on how to integrate DD-WRT based routers into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_domain: ddwrt
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

This platform offers presence detection by looking at connected devices to a [DD-WRT](https://dd-wrt.com/) based router.

To use a DD-WRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ddwrt
    host: ROUTER_IP_ADDRESS
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
ssl:
  description: Whether to connect via HTTPS.
  required: false
  type: boolean
  default: false
verify_ssl:
  description: If SSL/TLS verification for HTTPS resources needs to be turned off (for self-signed certs, etc.)
  required: false
  type: boolean
  default: true
wireless_only:
  description: Whether to only list devices that are connected directly to the router via Wi-Fi or include those connected via Ethernet or other networked access points as well.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

By default Home Assistant pulls information about connected devices from DD-WRT every 5 seconds.
See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
