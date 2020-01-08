---
title: Xfinity Gateway
description: Instructions on how to integrate Xfinity Gateways into Home Assistant.
ha_category:
  - Presence Detection
logo: xfinity.svg
ha_release: 0.9
ha_iot_class: Local Polling
ha_codeowners:
  - '@cisasteelersfan'
---

The `xfinity` device tracker platform offers presence detection by looking at connected devices to an Xfinity gateway.

It was tested with an Xfinity Gateway model TG1682G.

## Configuration

To use an Xfinity Gateway in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: xfinity
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.1.1`.
  required: false
  type: string
  default: 10.0.0.1
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
