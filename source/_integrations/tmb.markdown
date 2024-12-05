---
title: Transports Metropolitans de Barcelona
description: Instructions on how to integrate TMB iBus sensor within Home Assistant.
ha_category:
  - Transport
ha_release: 0.104
ha_iot_class: Local Polling
ha_codeowners:
  - '@alemuro'
ha_domain: tmb
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

This sensor will provide you the remaining time, in minutes, for the next bus in a specific stop by using the [iBus service](https://www.tmb.cat/en/barcelona/tmb-ibus).

You must create an application on [developer.tmb.cat](https://developer.tmb.cat/account/applications/public/new) to obtain the `app_id` and `app_key` values that you will need.

Add the data to your {% term "`configuration.yaml`" %} file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
- platform: tmb
  app_id: !secret tmb_app_id
  app_key: !secret tmb_app_key
  stops:
    - line: V25
      stop: 3258
```

{% configuration %}
app_id:
  description: Your TMB APP identifier.
  required: true
  type: string
app_key:
  description: Your TMB APP key.
  required: true
  type: string
stops:
  description: List of bus stops to track.
  required: false
  type: list
  keys:
    line:
      description: Identifier of the line to track.
      required: true
      type: string
    stop:
      description: Stop identifier.
      required: true
      type: integer
    name:
      description: Name you want to use to identifier that stop.
      required: false
      type: string
      default: "LINE - STOP"
{% endconfiguration %}

Data provided by [TMB](https://tmb.cat/).
