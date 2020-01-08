---
title: Openuv
description: Instructions on how to integrate OpenUV within Home Assistant.
logo: openuv.jpg
ha_category:
  - Health
  - Binary Sensor
  - Sensor
ha_release: 0.76
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
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

Each use of the `update_data` service will consume 1 or 2 API calls, depending
on which monitored conditions are configured.

If the OpenUV integration is configured through the Home Assistant UI (via the
`Configuration >> Integrations` panel), each service call will consume 2 API
calls from the daily quota.

If the OpenUV integration is configured via `configuration.yaml`, service calls
will consume 2 API calls if `monitored_conditions` contains both
`uv_protection_window` and any other condition; any other scenarios will only
consume 1 API call.

Ensure that you understand these specifications when calling the `update_data`
service.

</div>

## Configuration

To retrieve data from OpenUV, add the following to your `configuration.yaml`
file:

```yaml
openuv:
  api_key: YOUR_OPENUV_API_KEY
```

{% configuration %}
api_key:
  description: The OpenUV API key.
  required: true
  type: string
binary_sensors:
  description: The binary sensor-related configuration options.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: The conditions to create sensors from.
      required: false
      type: list
      default: all
      keys:
        uv_protection_window:
          description: Displays if UV protection (sunscreen, etc.) is recommended at the current date and time.
sensors:
  description: The sensor-related configuration options.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: The conditions to create sensors from.
      required: false
      type: list
      default: all
      keys:
        current_ozone_level:
          description: The current ozone level in du (Dobson Units).
        current_uv_index:
          description: The current UV index.
        current_uv_level:
          description: "The level of current UV index, which is calculated based on [UV Index Levels & Colors](https://www.openuv.io/kb/uv-index-levels-colors)."
        max_uv_index:
          description: The maximum UV index that will be encountered that day (at solar noon).
        safe_exposure_time_type_1:
          description: The approximate exposure time for skin type I.
        safe_exposure_time_type_2:
          description: The approximate exposure time for skin type II.
        safe_exposure_time_type_3:
          description: The approximate exposure time for skin type III.
        safe_exposure_time_type_4:
          description: The approximate exposure time for skin type IV.
        safe_exposure_time_type_5:
          description: The approximate exposure time for skin type V.
        safe_exposure_time_type_6:
          description: The approximate exposure time for skin type VI.
{% endconfiguration %}

The approximate number of minutes of a particular skin type can be exposed to
the sun before burning/tanning starts is based on the
[Fitzpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale).

## Full Configuration Example

To configure additional functionality, add configuration options beneath a
`binary_sensor` and/or `sensor` key within the `openuv` section of the
`configuration.yaml` file as below:

```yaml
openuv:
  api_key: YOUR_OPENUV_API_KEY
  binary_sensors:
    monitored_conditions:
      - uv_protection_window
  sensors:
    monitored_conditions:
      - current_ozone_level
      - current_uv_index
      - current_uv_level
      - max_uv_index
      - safe_exposure_time_type_1
      - safe_exposure_time_type_2
      - safe_exposure_time_type_3
      - safe_exposure_time_type_4
      - safe_exposure_time_type_5
      - safe_exposure_time_type_6
```

<div class='note warning'>
The above guidelines constitute estimates and are intended to help informed
decision making. They should not replace analysis, advice or diagnosis from a
trained medical professional.
</div>

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
  - alias: Update OpenUV every 30 minutes during the daytime
    trigger:
      platform: time_pattern
      minutes: '/30'
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

Update only the sensors every 20 minutes while the sun is at least 10 degrees above the horizon:

```yaml
automation:
  - alias: Update OpenUV every 20 minutes while the sun is at least 10 degrees above the horizon
    trigger:
      platform: time_pattern
      minutes: '/20'
    condition:
      condition: numeric_state
      entity_id: sun.sun
      value_template: '{{ state.attributes.elevation }}'
      above: 10
    action:
      service: openuv.update_uv_index_data
```

Update the protection window once a day:
```yaml
automation:
  - alias: Update OpenUV protection window once a day
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
  - alias: Update OpenUV every hour (24 of 50 calls per day)
    trigger:
      platform: time_pattern
      minutes: '/60'
    action:
      service: openuv.update_data
```
