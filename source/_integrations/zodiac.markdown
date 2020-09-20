---
title: Zodiac
description: Instructions on how to integrate the zodiac integration into Home Assistant.
ha_category:
  - Environment
ha_iot_class: Local Polling
ha_release: 0.116
ha_quality_scale: silver
ha_codeowners:
  - '@JulienTant'
ha_domain: zodiac
---

The `zodiac` integration tracks the current zodiac sign.

## Configuration

To enable the zodiac sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
zodiac:
```

This sensor will return one of the following values:
`aries`, `taurus`, `gemini`, `cancer`, `leo`, `virgo`, `libra`, `scorpio`, `sagittarius`, `capricorn`, `aquarius`, `pisces`. You also have access to three attributes :
- `sign`: return one of the values above
- `element`: `fire`, `air`, `earth`, `water`
- `modality`: `cardinal`, `fixed`, `mutable`
