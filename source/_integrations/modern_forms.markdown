---
title: Modern Forms
description: Instructions on how to integrate a Modern Forms Smart Fan with Home Assistant.
ha_category:
  - Binary sensor
  - Fan
  - Light
  - Number
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
  - number
  - sensor
  - switch
ha_integration_type: integration
---

[Modern Forms](https://modernforms.com/) has a line of smart Wi-Fi-connected fans that allow for cloud or local control of the fan and light. On fan models that support sleep timers, individual timers for the fan and light can be set and cleared independently.

{% include integrations/config_flow.md %}

{% note %}
If the Modern Forms fan does not have a light unit installed, then the Light entities and actions will not show up.
{% endnote %}

## Fans

The Modern Forms integration has support for the Modern Forms fans. This includes directional support, and sleep timer actions for the fan.

Fan models with breeze hardware also support the **Breeze** preset mode, which varies the fan speed for a more natural airflow. Select **Normal** to return to a steady fan speed. Turning the fan off does not clear the preset mode. If **Breeze** was active, it resumes the next time you turn the fan on. This preset mode is not available on fan models without breeze hardware.

## Lights

The Modern Forms integration supports the fan's light, including brightness and sleep timer actions.

Some fan models have more than one light fixture, such as a separate uplight and downlight. Each fixture gets its own light entity that you can control independently, using the name you gave it in the Modern Forms app.

Light fixtures that support a range of color temperatures let you adjust the color temperature from the light entity, alongside the brightness.

## Binary sensors

On fan models that support sleep timers, the Modern Forms integration provides binary sensors for the following information:

- Fan sleep timer active status
- Light sleep timer active status

These entities are not available on fan models without sleep timer support.

## Numbers

On fan models with breeze hardware, the Modern Forms integration provides a number entity to configure the following setting:

- Breeze intensity - how much the fan speed fluctuates while the breeze preset is active. Range: 1-3.

This entity is not available on fan models without breeze hardware.

## Sensors

On fan models that support sleep timers, the Modern Forms integration provides sensors for the following information:

- Fan sleep timer time expiring
- Light sleep timer time expiring

These entities are not available on fan models without sleep timer support.
  
## Switches

The Modern Forms integration provides support for the following toggleable attributes of a fan:

- Away mode - to allow the fan simulate someone being home.
- Adaptive learning - for allow learning for away mode.

The adaptive learning switch is not available on fan models without adaptive learning support.

{% include integrations/actions.md %}

{% note %}
Modern Forms fans use NTP (via `pool.ntp.org`) to set their internal clock and check whether sleep timers have expired. Sleep timers only work if your fan can reach an NTP server on the internet. You can block cloud access for the fan and allow only outbound NTP (UDP port 123) so sleep timers keep working.
{% endnote %}
