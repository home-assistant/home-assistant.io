---
title: Elgato Key Light
description: Instructions on how to integrate an Elgato Key Light with Home Assistant.
ha_category:
  - Light
ha_release: 0.104
ha_iot_class: Local Polling
ha_qa_scale: platinum
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_quality_scale: platinum
ha_domain: elgato
ha_zeroconf: true
ha_platforms:
  - light
---

The [Elgato Key Light](https://www.elgato.com/en/gaming/key-light) sets the
bar for high-end studio lightning. With 80 LEDs, that put out a massive
2500 lumens, and can change the color temperature as well.

The LED light panel is created specifically, and designed for streamers
and content creators, many of whom operate on platforms like YouTube and Twitch.

{% include integrations/config_flow.md %}

## Lights

This integration adds the Key Light device as a light in Home Assistant, and
allows you to control the color temperature, brightness, and its on/off state.

## Services

### Service `elgato.identify`

The identify service shortly blinks the Elgato light. Originally meant as
a way to identify which light you are talking to, it can also be used as
a service to create a visual notification with.

{% my developer_call_service badge service="service=elgato.identify" %}

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | Yes | String or list of Elgato light entity IDs.

Example automation, in YAML format, that triggers a visual notification when
a binary sensor (a doorbell) is triggered:

```yaml
- alias: Visual doorbell notification example
  trigger:
    - platform: state
      entity_id: binary_sensor.doorbell
      to: "on"
  action:
    - service: elgato.identify
      target:
        entity_id: light.elgato_key_light
```
