---
title: "Jandy iAqualink"
description: "Instructions on how to configure Jandy iAqualink integration."
logo: iaqualink.png
ha_category:
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 0.99 # TBD
ha_iot_class: Local Polling
ha_qa_scale: platinum # TBD
---

[iAqualink](https://www.iaqualink.com/) by [Jandy](https://www.jandy.com/) allows you to control your pool anytime, anywhere.

There is currently support for the following device types within Home Assistant:

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
  username: email@example.com
  password: password
```

{% configuration %}
username:
  description: Same address as relevant config entry, needed to identify config entry
  type: string
  required: true
  default: None
password:
  description: Same site as relevant config entry, needed to identify config entry
  type: string
  required: true
  default: None
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
    homeassistant.components.climate.unifi: debug
    homeassistant.components.light.unifi: debug
    homeassistant.components.sensor.unifi: debug
    homeassistant.components.switch.unifi: debug
```
