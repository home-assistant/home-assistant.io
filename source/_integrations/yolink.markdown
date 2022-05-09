---
title: YoLink
description: Instructions on how to integrate YoLink Devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 2022.6.0
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@YoSmart-Inc'
ha_domain: yolink
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [YoLink](https://www.yosmart.com/) Devices into Home Assistant.

You must contact <service@yosmart.com> to obtain a `client_id` and `client_secret`.

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
yolink:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```

Restart Home Assistant. Then, go to the frontend and authorize YoLink.

{% configuration %}
client_id:
  description: Your YoLink API client ID.
  required: true
  type: string
client_secret:
  description: Your YoLink API client secret.
  required: true
  type: string
{% endconfiguration %}

The integration is tested and verified for the following devices from YoLink:

* YS7704

{% include integrations/config_flow.md %}
