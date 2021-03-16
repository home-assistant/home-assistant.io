---
title: OpenUV
description: Instructions on how to integrate OpenUV within Home Assistant.
ha_category:
  - Health
  - Binary Sensor
  - Sensor
ha_release: 0.76
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: openuv
ha_platforms:
  - binary_sensor
  - sensor
---

The `openuv` integration displays UV and Ozone data from [openuv.io](https://www.openuv.io/).

## Generating an API Key

To generate an API key,
[simply log in to the OpenUV website](https://www.openuv.io/auth/google).

<div class='note warning'>
Beginning February 1, 2019, the "Limited" plan (which is what new users are
given by default) is limited to 50 API requests per day. Because different
API plans and locations will have different requirements, the `openuv`
component does not automatically query the API for new data after it initially
loads. To request new data, the `update_data` service may be used.
</div>

<div class='note warning'>
Each use of the `update_data` service will consume 2 API calls from the daily quota
(since it performs the same tasks as back-to-back calls of the `update_uv_index_data` and
the `update_protection_data` services).
</div>

{% include integrations/config_flow.md %}

## Sensors

| Name | Type | Value |
|------|------|-------|
| Current Ozone Level | Sensor | ozone level in du (Dobson Units) |
| Current UV Index | Sensor | UV Index (numerical value) |
| Current UV Level | Sensor | UV Level (as literal) |
| Max UV Index | Sensor | max UV Index for the day (at solar noon) |
| Protection Window | Binary Sensor | 'On' when protection window is needed |

### The Fitzpatrick Scale

The approximate number of minutes of a particular skin type can be exposed to
the sun before burning/tanning starts is based on the
[Fitzpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale).

<div class='note warning'>
The above guidelines constitute estimates and are intended to help informed
decision making. They should not replace analysis, advice or diagnosis from a
trained medical professional.
</div>

OpenUV integration provide sensors for safe exposure time (in minutes) based on skin type:

- Skin Type 1 Safe Exposure Time
- Skin Type 2 Safe Exposure Time
- Skin Type 3 Safe Exposure Time
- Skin Type 4 Safe Exposure Time
- Skin Type 5 Safe Exposure Time
- Skin Type 6 Safe Exposure Time

## Services

### `openuv.update_data`

Perform an on-demand update of OpenUV data.

### `openuv.update_uv_index_data`

Perform an on-demand update of OpenUV sensor data including current UV index, but not the `uv_protection_window`, saving an API call over `update_data`.

### `openuv.update_protection_data`

Perform an on-demand update of OpenUV `uv_protection_window` data, but not the sensors, saving an API call.

## Examples of Updating Data

One method to retrieve data every 30 minutes and still leave plenty of API key
usage is to only retrieve data during the daytime:

```yaml
automation:
  - alias: "Update OpenUV every 30 minutes during the daytime"
    trigger:
      platform: time_pattern
      minutes: "/30"
    condition:
      condition: and
      conditions:
        - condition: sun
          after: sunrise
        - condition: sun
          before: sunset
    action:
      service: openuv.update_data
```

Update the UV index data every 20 minutes while the sun is at least 10 degrees above the horizon:

{% raw %}

```yaml
automation:
  - alias: "Update OpenUV every 20 minutes while the sun is at least 10 degrees above the horizon"
    trigger:
      platform: time_pattern
      minutes: "/20"
    condition:
      condition: numeric_state
      entity_id: sun.sun
      value_template: "{{ state.attributes.elevation }}"
      above: 10
    action:
      service: openuv.update_uv_index_data
```

{% endraw %}

Update the protection window once a day:

```yaml
automation:
  - alias: "Update OpenUV protection window once a day"
    trigger:
      platform: time
      at: "02:12:00"
    action:
      service: openuv.update_protection_data
```

Another method (useful when monitoring locations other than the Home Assistant latitude
and longitude, in locations where there is a large amount of sunlight per day,
etc.) might be to simply query the API less often:

```yaml
automation:
  - alias: "Update OpenUV every hour (24 of 50 calls per day)"
    trigger:
      platform: time_pattern
      minutes: "/60"
    action:
      service: openuv.update_data
```
