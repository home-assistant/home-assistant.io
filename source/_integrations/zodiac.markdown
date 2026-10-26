---
description: Instructions on how to set up the zodiac integration within Home Assistant.
ha_release: 0.116
ha_domain: zodiac
---

The **Zodiac** {% term integration %} tracks the current zodiac sign.

{% include integrations/config_flow.md %}

## Sensor

This integration offers a sensor that will return one of the following states:
`aries`, `taurus`, `gemini`, `cancer`, `leo`, `virgo`, `libra`, `scorpio`, `sagittarius`, `capricorn`, `aquarius`, `pisces`.

The sensor also exposes the following attributes:

- `element`: `fire`, `air`, `earth`, `water`
- `modality`: `cardinal`, `fixed`, `mutable`
