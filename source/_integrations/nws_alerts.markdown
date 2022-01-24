---
title: "NWS Alerts"
description: "Provides an entity to check weather alerts for lots of countries"
ha_release: "2021.12.8"
ha_category: Weather
ha_iot_class: "Cloud Polling"
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: nws_alerts
---

The `nws_alerts` platform allows you to create an entity that allows for easy access to weather alerts for your area.

{% include integrations/config_flow.md %}

You need an OpenWeatherMap account to use this integration. The free plan allows for update intervals of 90 seconds per call. If it needs to be faster, consider upgrading your subscription.

Using a faster update interval [may put your account at risk of suspension](https://openweathermap.org/faq#what-happens-if-i-exceed-the-api-calls-limit-of-my-subscription).

If there is more than one alert, it will split each attribute on the entity with `(space here)-(space here)` so that it's easy for humans and automations to read, also the state is how many alerts are for that specific location.

Here's an example of an automation that sends out an alert on all Echo devices if there is a new weather alert.

```yaml
alias: Weather Alert
description: ''
mode: single
trigger:
  - platform: state
    entity_id: sensor.home_alerts
    from: '0'
    to: '1'
condition:
  - condition: state
    entity_id: sensor.home_alerts
    state: Tornado Warning
action:
  - service: notify.alexa_media
    data:
      message: Attention! A tornado warning has been issued. Take immediate shelter!
      title: Tornado Warning
      target:
        - media_player.kitchen_echo_show
        - media_player.master_bedroom_echo_dot
        - media_player.bathroom_echo_dot
        - media_player.bedroom_1_echo_dot
        - media_player.bedroom_2_echo_dot
        - media_player.bedroom_3_echo_dot
      data:
        method: all
        type: announce
  - service: notify.mobile_app_iphone
    data:
      message: Tornado Warning! Take shelter now!
      title: Emergency Alert
      data:
        push:
          sound:
            name: default
            critical: 1
            volume: 1
```
