---
title: ZhongHong
description: Instructions on how to integrate ZhongHong Support thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: 0.72
ha_iot_class: Local Push
ha_domain: zhong_hong
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

The `zhong_hong` climate platform lets you control Zhonghong HVAC Gateway Controller thermostats through Home Assistant.

To set it up, add the following information to your {% term "`configuration.yaml`" %} file:

```yaml
climate:
  - platform: zhong_hong
    host: GATEWAY_IP
```

{% configuration %}
host:
  description: The IP address of your controller.
  required: true
  type: string
port:
  description: The port of your controller.
  required: false
  default: 9999
  type: integer
gateway_address:
  description: The gateway address for the gateway (Settings in the controller itself).
  required: false
  default: 1
  type: integer

{% endconfiguration %}

When Gateway is found, All HVAC devices will be configured automatically.
