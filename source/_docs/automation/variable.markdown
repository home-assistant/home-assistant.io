---
title: "Variables"
description: "How to use variables in automations"
---

VARIABLES
In Home Assistant 0.116 automation variables where introduced. This makes it possible to use variables to automation and scripts. It  allows variables to be defined once for each automation, based on templates, and it change during the action sequence.

Basic example
```yaml
automation:
  trigger:
    platform: sun
    event: sunset
    offset: -00:30
  variables:
    notification_service: notify.paulus_iphone
  action:
    - service: "{{ notification_service }}"
      data:
        message: Beautiful sunset!
```

While the above example, it doesn’t add that much value, it does shows how it works. Variables can be templates too! For example:
```yaml
variables:
  person: frenck
  notification_service: "notify.{{ person }}_iphone"
```

Changing variables using actions.
```yaml
variables:
  notification_service: notify.paulus_iphone
action:
  - variables:
      notification_service: notify.frenck_iphone
  - service: "{{ notification_service }}"
    data:
      message: This message actually went to Frenck, not Paulus.
```

another advantage is variables can be used to set values at start of the automation. This makes sure for time based variables the timestamp is fixed when the automation starts and doesn't change during its execution. Additionally it can make you automations more readable.
```yaml
variables:
  full_date: '{{ now().strftime("%Y%m%d") }}'
  month_day: '{{ now().strftime("%m%d") }}'
  day: '{{ now().strftime("%d") }}'
  month: '{{ now().strftime("%m") }}'
```

