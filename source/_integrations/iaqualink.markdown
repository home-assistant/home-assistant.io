---
title: Jandy iAqualink
description: Instructions on how to configure Jandy iAqualink integration.
ha_category:
  - Binary sensor
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
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
ha_integration_type: hub
---

[iAqualink](https://www.iaqualink.com/) by [Jandy](https://www.jandy.com/) allows you to control your pool anytime, anywhere.

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Climate
- Light
- Sensor
- Switch

## Prerequisites

1. Create an account and log in using either the iAqualink app or the [iAqualink website](https://site.iaqualink.net/signin).
2. Add your devices to the account you created in the previous step, typically using their serial numbers.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The email address used to sign in to your account using the iAqualink app or website."
Password:
    description: "The password associated with your account."
{% endconfiguration_basic %}

## Data Updates

This integration uses cloud {% term polling %} to automatically discover your devices using the cloud APIs.

## Known limitations

Only iAquaLink 2.0 (iQ20) and eXO systems are supported at this time.

If you need support for other systems, please open a request in the iaqualink-py Python library [repository](https://github.com/flz/iaqualink-py/issues).

## Debugging integration

If you have problems with iAqualink or the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    iaqualink: debug
    homeassistant.components.iaqualink: debug
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
