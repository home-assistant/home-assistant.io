---
title: Linksys Smart Wi-Fi
description: Instructions on how to integrate Linksys Smart Wi-Fi Router into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.48
ha_domain: linksys_smart
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `linksys_smart` {% term integration %} offers presence detection by looking at connected devices to a Linksys Smart Wi-Fi based router.

Tested routers:

- Linksys WRT3200ACM MU-MIMO Gigabit Wi-Fi Wireless Router
- Linksys WRT1900ACS Dual-band Wi-Fi Router
- Linksys EA6900 AC1900 Dual-Band Wi-Fi Router
- Linksys EA8300 Max-Stream AC2200 Tri-Band Wi-Fi Router

## Setup

For this {% term integration %} to work correctly, it is necessary to disable the "Access via wireless" feature in the Local Management Access section of the router administration page. If "Access via wireless" is not disabled, a connectivity conflict arises because the Home Assistant integration is trying to pass userid and password, but the router is only expecting a password.

## Configuration

To use a Linksys Smart Wi-Fi Router in your Home Assistant installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: linksys_smart
    host: 192.168.1.1
```

{% configuration %}
host:
  description: The hostname or IP address of your router, e.g., `192.168.1.1`.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
