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

{% include integrations/actions.md %}

{% note %}
Modern Forms fans use NTP to pool.ntp.org to set their internal clock and check whether sleep timers have expired. Sleep timers only work if the fan has internet NTP access. You can block cloud access for the fan and leave only NTP (UDP port 123) outbound working for the sleep timers.
{% endnote %}
