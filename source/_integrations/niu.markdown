---
title: NIU
description: Instructions on how to integrate NIU vehicles into Home Assistant.
ha_category:
  - Car
  - Binary Sensor
  - Sensor
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bonnee'
ha_domain: niu
---

The `NIU` integration offers integration with the [NIU](https://www.niu.com) cloud service and provides sensors such as battery level, odometer and range.

This integration provides the following platforms:

- Binary sensors - such as power status, charging status, connection and lock.
- Sensors - such as battery level and temperature, odometer, estimated range and charging time.

## Configuration

Home Assistant offers the NIU integration through `configuration.yaml`. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
niu:
  username: YOUR_EMAIL_ADDRESS
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email address associated with your NIU account.
  required: true
  type: string
password:
  description: The password associated with your NIU account.
  required: true
  type: string
{% endconfiguration %}
