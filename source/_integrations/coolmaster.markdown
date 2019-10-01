---
title: "CoolMasterNet Climate"
description: "Instructions on how to integrate CoolMasterNet within Home Assistant."
logo: coolautomation.png
ha_category:
  - Climate
ha_release: 0.88
ha_iot_class: Local Polling
---


The `coolmaster` climate platform lets you control HVAC through [CoolMasterNet](https://coolautomation.com/products/coolmasternet/). To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: coolmaster
    host: YOUR_COOLMASTER_HOST
    port: YOUR_COOLMASTER_PORT
    supported_modes:
      - heat
      - cool
      - dry
```

{% configuration %}
host:
  description: The host address of your CoolMasterNet instance (IP or host name).
  required: true
  type: string
port:
  description: The port number of your CoolMasterNet instance.
  required: false
  type: integer
  default: 10102
supported_modes:
  description: The operation modes supported by your HVAC.
  required: false
  type: list
  default: All modes
  keys:
    heat:
      description: Heat mode.
    cool:
      description: Cool mode.
    heat_cool:
      description: Heat/Cool mode (CoolMasterNet refers to it as Auto).
    dry:
      description: Dry mode.
    fan_only:
      description: Fan only mode.
{% endconfiguration %}
