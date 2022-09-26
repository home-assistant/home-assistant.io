---
title: OpenUV
description: Instructions on how to integrate OpenUV within Home Assistant.
ha_category:
  - Binary Sensor
  - Health
  - Sensor
ha_release: 0.76
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: openuv
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
---

The `openuv` integration displays UV and Ozone data from [openuv.io](https://www.openuv.io/).

<div class='note warning'>
The guidelines within this documentation constitute estimates and are intended to help
informed decision making. They should not replace analysis, advice or diagnosis from a
trained medical professional.
</div>

## Generating an API Key

To generate an API key,
[simply log in to the OpenUV website](https://www.openuv.io/auth/google).

{% include integrations/config_flow.md %}

## Sensors

| Name | Type | Value |
|------|------|-------|
| Current Ozone Level | Sensor | ozone level in du (Dobson Units) |
| Current UV Index | Sensor | UV Index (numerical value) |
| Current UV Level | Sensor | UV Level (as literal) |
| Max UV Index | Sensor | max UV Index for the day (at solar noon) |
| Protection Window | Binary Sensor | whether sunblock protection should be used |
| Skin Type 1 Safe Exposure Time | Sensor | the amount of time [Fitzpatrick skin type 1](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 2 Safe Exposure Time | Sensor | the amount of time [Fitzpatrick skin type 2](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 3 Safe Exposure Time | Sensor | the amount of time [Fitzpatrick skin type 3](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 4 Safe Exposure Time | Sensor | the amount of time [Fitzpatrick skin type 4](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 5 Safe Exposure Time | Sensor | the amount of time [Fitzpatrick skin type 5](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 6 Safe Exposure Time | Sensor | the amount of time [Fitzpatrick skin type 6](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |

## Updating Data

<div class='note warning'>
OpenUV does _not_ automatically update data for its entities! Users must manually
update data via the `homeassistant.update_entity` service.
</div>

Beginning February 1, 2019, the "Limited" plan (which is what new users are given by
default) is limited to 50 API requests per day. Because different API plans and
locations will have different requirements, the `openuv` component does not automatically
query the API for new data after it initially loads. To request new data, the
`homeassistant.update_entity` service should be used.

Note that in the case of UV and ozone data, selecting any one of:

* Current Ozone Level
* Current UV Index
* Current UV Level
* Max UV Index
* Skin Type 1 Safe Exposure Time
* Skin Type 2 Safe Exposure Time
* Skin Type 3 Safe Exposure Time
* Skin Type 4 Safe Exposure Time
* Skin Type 5 Safe Exposure Time
* Skin Type 6 Safe Exposure Time

...as the target for the `homeassistant.update_entity` service will update the data for
_all_ of these entities.

To protect against possible API call waste, all calls to `homeassistant.update_entity`
that reference an OpenUV entity are throttled to a minimum of 15 minutes between calls.

### Protection Window

The Protection Window binary sensor will be `on` when sunblock protection should be used.

By default, this occurs anytime the UV index is above 3.5. This behavior can be
configured via the config entry options within the UI. Two parameters are given:

* `Starting UV index for the protection window`: the UV index that, when passed, indicates
  protection should be utilized
* `Ending UV index for the protection window`: the UV index that, when passed, indicates
  protection is no longer required

## Examples of Updating Data

Update the UV index data every 20 minutes while the sun is at least 10 degrees above the
horizon:

{% raw %}
```yaml
automation:
  - alias: "Update OpenUV"
    trigger:
      platform: time_pattern
      minutes: "/20"
    condition:
      condition: numeric_state
      entity_id: sun.sun
      value_template: "{{ state.attributes.elevation }}"
      above: 10
    action:
      service: homeassistant.update_entity
      target:
        entity_id: sensor.LATITUDE_LONGITUDE_current_uv_index
```
{% endraw %}

Update the protection window once a day at 12:00pm:

```yaml
automation:
  - alias: "Update OpenUV"
    trigger:
      platform: time
      at: "12:00:00"
    action:
      service: homeassistant.update_entity
      target:
        entity_id: binary_sensor.LATITUDE_LONGITUDE_protection_window
```

To perform an optimal amount of API calls in locations where the amount of daylight
varies, you need to know the total hours of daylight on the longest day of the year. If,
for example, this is 17 hours, you can perform 2 calls around every 45 minutes without
running into the 50 API call limit per day:

{% raw %}
```yaml
automation:
  - alias: "Update OpenUV"
    trigger:
      # Time pattern of /45 will not work as expected, as it will sometimes be true
      # twice per hour (on the whole hour and on the whole hour + 45 minutes); use a
      # more frequent time pattern and a condition to get the intended behavior:
      - platform: time_pattern
        minutes: "/15"
    condition:
      - condition: sun
        after: sunrise
        before: sunset
        # The last call will most likely fall before the sunset, leaving the UV index at
        # something other than 0 for the remainder of the night; to fix this, we allow
        # one more service call after the sun has set:
        before_offset: "+00:45:00"
      - condition: template
        # We check if the last trigger has been 40 minutes or more ago so we don't run
        # into timing issues; by checking for 40 minutes or greater, we ensure this is
        # only true at the 45 minute mark:
        value_template: >- 
          {{
            state_attr('automation.update_openuv', 'last_triggered') == None
            or (
              now() - state_attr('automation.update_openuv', 'last_triggered')
            ) >= timedelta(hours = 0, minutes = 40)
          }}
    action:
      service: homeassistant.update_entity
      target:
        entity_id:
          # Update both UV and protection window data:
          - binary_sensor.LATITUDE_LONGITUDE_protection_window
          - sensor.LATITUDE_LONGITUDE_current_uv_index
```
{% endraw %}
