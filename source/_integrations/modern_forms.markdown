---
title: Modern Forms
description: Instructions on how to integrate a Modern Forms Smart Fan with Home Assistant.
ha_category:
  - Binary sensor
  - Fan
  - Light
  - Sensor
  - Switch
ha_release: 2021.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@wonderslug'
ha_domain: modern_forms
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - fan
  - light
  - sensor
  - switch
ha_integration_type: integration
---

[Modern Forms](https://modernforms.com/) has a line of smart Wi-Fi-connected fans that allow for cloud or local control of the fan and light. There is support for individual sleep timers for the fan and light that can be set and cleared independently.

{% include integrations/config_flow.md %}

{% note %}
If the Modern Forms fan does not have a light unit installed, then the Light entities and actions will not show up.
{% endnote %}

## Fans

The Modern Forms integration has support for the Modern Forms fans. This includes directional support, and sleep timer actions for the fan.

## Lights

The Modern Forms integration has support for the Modern Forms fans light. This includes brightness, and sleep timer actions for the light.

## Binary sensors

The Modern Forms integration provides binary sensors for the following information:

- Fan sleep timer active status
- Light sleep timer active status

## Sensors

The Modern Forms integration provides sensors for the following information:

- Fan sleep timer time expiring
- Light sleep timer time expiring
  
## Switches

The Modern Forms integration provides support for the following toggleable attributes of a fan:

- Away mode - to allow the fan simulate someone being home.
- Adaptive learning - for allow learning for away mode.

## Actions

### Action `modern_forms.clear_fan_sleep_timer`

This action will clear the sleep timer for the fan if it has been set. It will not turn off the fan when the timer is cleared.

### Action `modern_forms.clear_light_sleep_timer`

This action will clear the sleep timer for the light if it has been set. It will not turn off the light when the timer is cleared.

### Action `modern_forms.set_fan_sleep_timer`

This action will set a sleep timer for the fan. When the sleep timer is expired it will turn off the fan.

| Data attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `sleep_time`           | yes      | The amount of time in minutes to set the sleep timer for. This is time in minutes from 1 to 1440 (1 day). |

### Action `modern_forms.set_light_sleep_timer`

This action will set a sleep timer for the light. When the sleep timer is expired it will turn off the light.

| Data attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `sleep_time`           | yes      | The amount of time in minutes to set the sleep timer for. This is time in minutes from 1 to 1440 (1 day).|

{% note %}
Modern Forms Fans use NTP to pool.ntp.org in order to set its internal clock and check of sleep timers have expired. Sleep timers will only work if the Modern Forms Fans have internet NTP access. You can block off cloud access for the fan and only leave NTP (UDP port 123) outbound working for the sleep timers.
{% endnote %}
