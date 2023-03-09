---
title: Zodiac
description: Instructions on how to setup the zodiac integration within Home Assistant.
ha_category:
  - Environment
ha_iot_class: Local Polling
ha_release: 0.116
ha_quality_scale: silver
ha_codeowners:
  - '@JulienTant'
ha_domain: zodiac
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `zodiac` integration tracks the current zodiac sign.

## Configuration

To enable the zodiac integration, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
zodiac:
```

## Sensor

This integration offers a sensor that will return one of the following states:
`aries`, `taurus`, `gemini`, `cancer`, `leo`, `virgo`, `libra`, `scorpio`, `sagittarius`, `capricorn`, `aquarius`, `pisces`.

The sensor also exposes the following attributes:

- `element`: `fire`, `air`, `earth`, `water`
- `modality`: `cardinal`, `fixed`, `mutable`
