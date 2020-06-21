---
title: Jandy iAqualink
description: Instructions on how to configure Jandy iAqualink integration.
ha_category:
  - Binary Sensor
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@flz'
ha_domain: iaqualink
---

[iAqualink](https://www.iaqualink.com/) by [Jandy](https://www.jandy.com/) allows you to control your pool anytime, anywhere.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Climate
- Light
- Sensor
- Switch

## Configuration

Home Assistant offers Jandy iAqualink integration through **Configuration** -> **Integrations** -> **Jandy iAqualink**. Simply enter `username` and `password` when prompted.

You can also configure the component via `configuration.yaml`:

```yaml
# Example configuration.yaml entry
iaqualink:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your iAqualink account
  type: string
  required: true
password:
  description: The password for accessing your iAqualink account
  type: string
  required: true
{% endconfiguration %}

## Known limitations

- The platform only supports a single pool.
- Only Pool systems are supported at this time.

## Debugging integration

If you have problems with iAqualink or the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    iaqualink: debug
    homeassistant.components.iaqualink: debug
```
