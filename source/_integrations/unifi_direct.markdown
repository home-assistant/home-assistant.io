---
title: UniFi AP
description: Instructions on how to use a Unifi WAP as a device tracker.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.59
ha_domain: unifi_direct
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_codeowners:
  - '@tofuSCHNITZEL'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This {% term integration %} allows you to detect presence by looking at devices connected to a [UniFi AP](https://www.ui.com/products/#unifi). This device tracker differs from [Ubiquiti UniFi](/integrations/unifi) because it doesn't require the UniFi Network application.

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
