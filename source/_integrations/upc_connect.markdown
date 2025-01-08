---
title: UPC Connect Box
description: Instructions on how to integrate UPC ConnectBox into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.36
ha_codeowners:
  - '@pvizeli'
  - '@fabaff'
ha_domain: upc_connect
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `upc_connect` {% term integration %} offers presence detection by looking at connected devices to a [Connect Box](https://www.upc.ch/en/internet/learn-about-internet/) from [Liberty Global](https://www.libertyglobal.com) (also known as UPC Cablecom in Switzerland) which is an Internet provider in Switzerland, Austria, the Netherlands (under Ziggo) and Hungary (under Vodafone).

{% important %}
This integration works by logging into the router with a password. The router can only have one active session at any time, so if you want to access your router settings then stop Home Assistant first.
{% endimportant %}

To use a Connect Box in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: upc_connect
    password: PASSWORD
```

{% configuration %}
password:
  description: The password of your router.
  required: true
  type: string
host:
  description: The IP address of your router.
  required: false
  default: 192.168.0.1
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

Also known to be working with the following devices:
 - Irish Virgin Media Super Hub 3.0
 - Unitymedia Connect Box (DE)
 - Ziggo Connectbox (NL)
 - Compal CH7465LG ED 3.0 - Connect box (UPC / Vodafone CZ / Vodafone HU)
