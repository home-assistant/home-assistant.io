---
title: Fido
description: Instructions on how to integrate Fido data usage within Home Assistant.
ha_category:
  - Network
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_domain: fido
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Integrate your [Fido](https://www.fido.ca/) account information into Home Assistant.

## Configuration

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fido
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - fido_dollar
     - balance
     - data_used
```

{% configuration %}
username:
  description: Your Fido username (your Fido phone number or your email).
  required: true
  type: string
password:
  description: Your Fido password.
  required: true
  type: string
number:
  description: Your Fido phone number (it will use your username if empty).
  required: false
  type: string
monitored_variables:
  description: Variables to monitor.
  required: true
  type: list
  keys:
    fido_dollar:
      description: Your Fido dollar balance
    balance:
      description: Your account balance
    data_used:
      description: Current data used
    data_limit:
      description: Current data limit
    data_remaining:
      description: Current data remaining
    text_used:
      description: SMS sent
    text_limit:
      description: SMS limit
    text_remaining:
      description: SMS remaining
    mms_used:
      description: MMS sent
    mms_limit:
      description: MMS limit
    mms_remaining:
      description: MMS remaining
    text_int_used:
      description: International SMS sent
    text_int_limit:
      description: International SMS limit
    text_int_remaining:
      description: International SMS remaining
    talk_used:
      description: Talk time used
    talk_limit:
      description: Talk time limit
    talk_remaining:
      description: Talk time remaining
    other_talk_used:
      description: Other talk time used (It could be international calls)
    other_talk_limit:
      description: Other talk time limit
    other_talk_remaining:
      description: Other talk time remaining
{% endconfiguration %}
