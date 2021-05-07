---
title: Ubiquiti UniFi AP
description: Instructions on how to use a Unifi WAP as a device tracker.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: 0.59
ha_domain: unifi_direct
ha_platforms:
  - device_tracker
---

This platform allows you to detect presence by looking at devices connected to a [UniFi AP](https://www.ui.com/products/#unifi). This device tracker differs form [Ubiquiti UniFi](/integrations/unifi) because it doesn't require the UniFi controller software.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: unifi_direct
    host: YOUR_AP_IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The hostname or IP address of your UniFi AP.
  required: true
  type: string
username:
  description: The SSH device username used to connect to your UniFi AP.
  required: true
  type: string
password:
  description: The SSH device password used to connect to your UniFi AP.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
