---
title: Moon
description: Instructions on how to integrate the moon sensor into Home Assistant.
ha_category:
  - Environment
ha_iot_class: Calculated
ha_release: 0.38
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
  - '@frenck'
ha_domain: moon
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: service
---

The Moon integration tracks the phases of the moon.

{% include integrations/config_flow.md %}

The sensor provided by this integration will return one of the following values:

- `new_moon`
- `waxing_crescent`
- `first_quarter`
- `waxing_gibbous`
- `full_moon`
- `waning_gibbous`
- `last_quarter`
- `waning_crescent`

<p class='img'>
<img src='/images/screenshots/more-info-dialog-moon.png' />
</p>
