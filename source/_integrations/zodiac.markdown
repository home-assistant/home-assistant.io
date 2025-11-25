---
title: Zodiac
description: Instructions on how to setup the zodiac integration within Home Assistant.
ha_category:
  - Environment
ha_iot_class: Calculated
ha_release: 0.116
ha_codeowners:
  - '@JulienTant'
ha_domain: zodiac
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
---

The **Zodiac** {% term integration %} tracks the current zodiac sign.

{% include integrations/config_flow.md %}

## Sensor

This integration offers a sensor that will return one of the following states:
`aries`, `taurus`, `gemini`, `cancer`, `leo`, `virgo`, `libra`, `scorpio`, `sagittarius`, `capricorn`, `aquarius`, `pisces`.

The sensor also exposes the following attributes:

- `element`: `fire`, `air`, `earth`, `water`
- `modality`: `cardinal`, `fixed`, `mutable`
