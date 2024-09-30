---
title: Aruba Instant On
description: Instructions on how to integrate Aruba Instant On devices into Home Assistant.
ha_category:
  - Presence detection
ha_release: '2024.9'
ha_iot_class: Local Polling
ha_domain: aruba_instant_on
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

This platform allows you to detect presence by looking at connected devices to [Aruba Instant On](https://www.arubainstanton.com) Ethernet switches and Wi-Fi access points.

Device names can be customized in the [Instant On portal](https://portal.arubainstanton.com).

{% important %}
Two-factor authentication must be disabled.
{% endimportant %}

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: aruba_instant_on
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    site_id: YOUR_SITE_ID
```

{% configuration %}
username:
  description: The username of a user with access to the desired site.
  required: true
  type: string
password:
  description: The password for the given user.
  required: true
  type: string
site_id:
  description: Site ID. Can be obtained from the portal URL, for example `https://portal.arubainstanton.com/sites/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
