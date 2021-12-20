---
title: Launch Library
description: Instructions on how to integrate space launch information within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.83
ha_codeowners:
  - '@ludeeus'
  - '@DurgNomis-drol'
ha_domain: launch_library
ha_platforms:
  - sensor
---

The `launch_library` sensor will provide you with information about the next planned space launch.

{% include integrations/config_flow.md %}

The data this platform presents comes from [launchlibrary.net][launchlibrary].

## Using in Automations

Example below will send a notification 15 minutes before liftoff.

{% raw %}

```yaml
alias: Notify me 15 minutes before liftoff
description: 'Send me a notification 15 minutes before liftoff.'
trigger:
  - platform: template
    value_template: >-
      {{ (as_timestamp(states('sensor.launch_time')) - 900) <=
      as_timestamp(now())  }}
condition: []
action:
  - service: notify.mobile_app_ac2003
    data:
      title: Rocket launch in less the 15 minutes!
      data:
        ttl: 0
        priority: high
      message: >-
        {{ states('sensor.next_launch') }} - at <b>{{
        as_timestamp(states('sensor.launch_time')) |
        timestamp_custom('%H:%M', false) }}</b>, launch probability {{ states('sensor.launch_probability') }}%.
mode: single
```

{% endraw %}

[launchlibrary]: https://launchlibrary.net/

