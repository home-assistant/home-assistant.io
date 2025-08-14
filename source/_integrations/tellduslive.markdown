---
title: Telldus Live
description: Instructions on how to integrate Telldus Live into Home Assistant.
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Light
  - Sensor
  - Switch
ha_release: 0.11
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fredrike'
ha_domain: tellduslive
ha_platforms:
  - binary_sensor
  - cover
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `tellduslive` {% term integration %} let you connect to the [Telldus Live](https://live.telldus.com) API. It's cloud platform that connects to your Tellstick Net or Tellstick ZNet connected gear at home.

{% important %}
You need a [Telldus Premium](https://telldus.com/en/telldus-premium/) subscription to access the Cloud API (https://telldus.com/en/important-announcement-english/).
{% endimportant %}

Local API supports only one device at this stage. Local API is only supported with the Znet Lite products, the older hardware (such as Tellstick Net) does not support local API.

## Configuration

To manually integrate your Telldus Live with Home Assistant, e.g., if your device is on another network or in another location, add the following section to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
tellduslive:
```

{% configuration %}
host:
  description: Host address to Tellstick Net or Tellstick ZNet for Local API, only useful when automatic discovery is not enabled.
  required: false
  type: string
scan_interval:
  description: Interval (in seconds) for polling the Telldus Live server (or the local server).
  required: false
  type: integer
  default: 60
{% endconfiguration %}

The integration will offer configuration through the Home Assistant user interface where it will let you associate it with your Telldus Live account.

{% note %}

If you are receiving the error message: "The path '/tellduslive/authorize' was not found", you have to switch to a web browser that allows HTTP connections. Firefox is known to work fine. Chrome is known to cause issues.

{% endnote %}
