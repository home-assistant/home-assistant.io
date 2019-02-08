---
layout: page
title: "OpenUV"
description: "Instructions on how to integrate OpenUV within Home Assistant."
date: 2018-07-31 22:01
sidebar: true
comments: false
sharing: true
footer: true
logo: openuv.jpg
ha_category:
  - Health
  - Binary Sensor
  - Sensor
ha_release: 0.76
ha_iot_class: "Cloud Polling"
ha_config_flow: true
redirect_from:
  - /components/binary_sensor.openuv/
  - /components/sensor.openuv/
---

The `openuv` component displays UV and Ozone data from [openuv.io](http://openuv.io).

## {% linkable_title Generating an API Key %}

To generate an API key,
[simply log in to the OpenUV website](https://www.openuv.io/auth/google).

<p class='note warning'>
Beginning February 1, 2019, the "Limited" plan (which is what new users are
given by default) is limited to 50 API requests per day. Because different
API plans and locations will have different requirements, the `openuv`
component does not automatically query the API for new data after it initially
loads. To request new data, the `update_data` service may be used.
</p>

## {% linkable_title Configuration %}

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

## {% linkable_title Full Configuration Example %}

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

<p class='note warning'>
The above guidelines constitute estimates and are intended to help informed
decision making. They should not replace analysis, advice or diagnosis from a
trained medical professional.
</p>

## {% linkable_title Services %}

### {% linkable_title `openuv.update_data` %}

Perform an on-demand update of OpenUV data.

## {% linkable_title Examples of Updating Data %}

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

Another method (useful when monitoring locations other than the HASS latitude
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
