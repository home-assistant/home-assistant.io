---
title: LAGUTE LW-12
description: Instructions on how to setup Lagute LW-12 Wifi LED controller within Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
logo: lagute.png
ha_release: 0.71
ha_domain: lw12wifi
ha_platforms:
  - light
---

The `lw12wifi` light platform supports Lagute LW-12 Wifi LED controller.

## Configuration

To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: lw12wifi
    host: IP_ADDRESS_CONTROLLER
```

{% configuration %}
host:
  description: Host name or IP of LW-12 LED stripe to control.
  required: true
  type: string
port:
  description: Some firmware versions of the LW-12 controller listen on different ports.
  required: false
  type: integer
  default: 5000
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: LW-12 FC
{% endconfiguration %}
