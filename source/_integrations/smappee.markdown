---
title: Smappee
description: Instructions on how to setup Smappee within Home Assistant.
ha_category:
  - Hub
  - Energy
  - Sensor
  - Switch
ha_iot_class: Cloud polling
ha_release: 0.64
ha_config_flow: true
ha_codeowners:
  - '@bsmappee'
ha_domain: smappee
---

The Smappee integration will allow users to integrate their Smappee monitors, plugs and switches into Home Assistant using the [official API](https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview).

## Configuration

To use the Smappee integration you need a personal `client_id` and `client_secret` and add these to your `configuration.yaml` file.  The `client_id` and `client_secret` can be obtained by contacting [support@smappee.com](mailto:support@smappee.com).

```yaml
# Example configuration.yaml entry
smappee:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

Once Home Assistant restarted, go to Configuration > Integrations and select the Smappee integration. You will be redirected to a login page and be able to select the locations you would like to use within Home Assistant.

{% configuration %}
client_id:
  description: Your Smappee API client ID.
  required: True
  type: string
client_secret:
  description: Your Smappee API client secret.
  required: True
  type: string
{% endconfiguration %}
