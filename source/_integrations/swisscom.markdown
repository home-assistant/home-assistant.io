---
title: Swisscom Internet-Box
description: Instructions on how to integrate Swisscom Internet-Box into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.32
ha_domain: swisscom
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `swisscom` {% term integration %} offers presence detection by looking at connected devices to an [Internet-Box](https://www.swisscom.ch/en/residential/help/device/internet-router.html) router from [Swisscom](https://www.swisscom.ch) which is an Internet provider in Switzerland.

{% note %}
There are three models of Internet-Box (light, standard and plus). The platform has only been tested on the Internet-Box plus but the others should work as well because they have the same web interface.
{% endnote %}

To use an Internet-Box router in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: swisscom
```

{% configuration %}
host:
  description: The IP address of your router.
  required: false
  default: 192.168.1.1
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
