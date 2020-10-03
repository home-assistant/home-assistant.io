---
title: Mobile Vikings
description: Instructions on how to integrate Mobile Vikings data usage within Home Assistant.
ha_release: 0.116
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_config_flow: false
ha_codeowners: @TheLastGimbus
ha_domain: mobilevikings_pl
---

Integrate your [Mobile Vikings](https://mobilevikings.pl/en/) account information into Home Assistant.

This integration is for Mobile Vikings in Poland. Other countries where they operate are not supported yet.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mobilevikings_pl
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
      - balance
      - data_available
```

Multiple numbers on one account is not supported yet (feel free to open issue on that if you need this)

{% configuration %}
username:
  description: Your Mobile Vikings username (your phone number or your email).
  required: true
  type: string
password:
  description: Your password.
  required: true
  type: string
monitored_variables:
  description: Variables to monitor.
  required: true
  type: list
  keys:
    balance:
      description: Your account balance (in PLN)
    data_available:
      description: How much mobile data you have left (in GB)
{% endconfiguration %}
