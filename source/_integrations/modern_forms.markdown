---
title: Modern Forms
description: Instructions on how to integrate a Modern Forms Smart Fan with Home Assistant.
ha_category:
  - Fan
  - Light
ha_release:  2021.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_quality_scale: none
ha_codeowners:
  - '@wonderslug'
ha_domain: modern_forms
ha_zeroconf: true
ha_platforms:
  - fan
  - light
---

[Modern Forms](https://modernforms.com/) has a line of smart WiFi connected fans that allow for cloud or local control of the fan and light.  There is support for individual sleep timers for the fan and light that can be set and cleared independently.

{% include integrations/config_flow.md %}

## Fans

The `modern_forms` integration has support for the Modern Forms fans. This includes directional support, and sleep timer services for the fan.

## Lights

The `modern_forms` integration has support for the Modern Forms fans light.  This includes brightness, and sleep timer services for the light.

## Services

### Service `modern_forms.clear_fan_sleep_timer`

This service will clear the sleep timer for the Fan if it has been set. It will not turn off the fan when the timer is cleared.

### Service `modern_forms.clear_light_sleep_timer`

This service will clear the sleep timer for the Light if it has been set. It will not turn off the light when the timer is cleared.

### Service `modern_forms.set_fan_sleep_timer`

This service will set a sleep timer for the fan. When the sleep timer is expired it will turn off the fan.

| Service Data Attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `sleep_time`           | yes      | The amount of time in minutes to set the sleep timer for. This is time in minutes from 1 to 1440 (1 day). |

### Service `modern_forms.set_light_sleep_timer`

This service will set a sleep timer for the light.  When the sleep timer is expired it will turn off the light.

| Service Data Attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `sleep_time`           | yes      | The amount of time in minutes to set the sleep timer for.  This is time in minutes from 1 to 1440 (1 day).|

<div class='note'>

Modern Forms Fans use NTP to pool.ntp.org in order to set its internal clock and check of sleep timers have expired.  Sleep timers will only work if the Modern Forms Fans have internet NTP access.  You can block off cloud access for the fan and only leave NTP (UDP port 123) outbound working for the sleep timers.

</div>
