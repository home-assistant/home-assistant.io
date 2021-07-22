---
title: iGlo
description: Instructions on how to integrate iGlo lights into Home Assistant.
logo: iglo.png
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.61
ha_domain: iglo
ha_platforms:
  - light
---

The `iglo` platform allows you to integrate your [iGlo Lights](https://www.youtube.com/watch?v=oHTS9ji_v-s) into Home Assistant.

To use your iGlo light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: iglo
    host: 192.168.1.10
```

{% configuration %}
host:
  required: true
  description: The IP address for connecting to the light.
  type: string
name:
  required: false
  description: The name for this light.
  default: iGlo Light
  type: string
port:
  required: false
  description: The port used to connect to the light.
  default: 8080
  type: integer
{% endconfiguration %}
