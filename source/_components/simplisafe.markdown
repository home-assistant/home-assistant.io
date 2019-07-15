---
title: "SimpliSafe"
description: "Instructions on how to integrate SimpliSafe into Home Assistant."
logo: simplisafe.png
ha_release: 0.81
ha_category:
  - Alarm
redirect_from:
  - /components/alarm_control_panel.simplisafe/
---

The `simplisafe` integration integrates SimpliSafe home security (V2 and V3) systems into Home Assistant. Multiple SimpliSafe accounts can be accommodated.

There is currently support for the following device types within Home Assistant:

- Alarm

To enable this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
simplisafe:
  accounts:
    - username: user@email.com
      password: password123
```

{% configuration %}
username:
  description: The email address of a SimpliSafe account.
  required: true
  type: string
password:
  description: The password of a SimpliSafe account.
  required: true
  type: string
code:
  description: A code to enable or disable the alarm in the frontend.
  required: false
  type: string
{% endconfiguration %}
