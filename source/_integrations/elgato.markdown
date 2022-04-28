---
title: Elgato Light
description: Instructions on how to integrate an Elgato Light with Home Assistant.
ha_category:
  - Light
ha_release: 0.104
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_quality_scale: platinum
ha_domain: elgato
ha_zeroconf: true
ha_platforms:
  - button
  - diagnostics
  - light
ha_integration_type: integration
---

The [Elgato](https://www.elgato.com/) Lights sets the bar for high-end studio
lightning. The LED lights are created and designed specifically for streamers
and content creators, many of whom operate on platforms like YouTube and Twitch.

The following light productions from Elgato have been tested with this
integration:

- [Elgato Key Light](https://www.elgato.com/en/key-light)
- [Elgato Key Light Air](https://www.elgato.com/en/key-light-air)
- [Elgato Ring Light](https://www.elgato.com/en/ring-light)
- [Elgato Light Strip](https://www.elgato.com/en/light-strip)

{% include integrations/config_flow.md %}

## Lights

This integration adds the Key Light device as a light in Home Assistant, and
allows you to control the color temperature, brightness, and its on/off state.

When using the Elgato Light Strip, color support is automatically detected
and enabled in Home Assistant.

## Services

### Service `elgato.identify`

The identify service shortly blinks the Elgato light. Originally meant as
a way to identify which light you are talking to; it can also be used as
a service to create a visual notification.

This service also works when the light is turned off and will turn off the
light after the identification sequence has been completed.

{% my developer_call_service badge service="elgato.identify" %}

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
