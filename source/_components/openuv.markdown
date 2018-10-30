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
ha_category: Health
ha_release: 0.76
ha_iot_class: "Cloud Polling"
---

The `openuv` component displays UV and Ozone data from [openuv.io](http://openuv.io).

## {% linkable_title Generating an API Key %}

To generate an API key, [simply log in to the OpenUV website](https://www.openuv.io/auth/google).

<p class='note warning'>
The "Limited" plan (which is what new users are given by default) is limited to 500 API requests per day. In order to leave a buffer, the `openuv` component queries the API every 30 minutes by default. This value can be modifed (via the `scan_interval` key), but please note that over-running the API will require you to upgrade to a paid plan (and may disable your access in the meantime).
</p>

## {% linkable_title Configuration %}

To retrieve data from OpenUV, add the following to your `configuration.yaml` file:

```yaml
openuv:
  api_key: YOUR_OPENUV_API_KEY
```

{% configuration %}
api_key:
  description: The OpenUV API key.
  required: true
  type: string
scan_interval:
  description: the frequency (in seconds) between data updates.
  required: false
  type: integer
  default: 1800
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

The approximate number of minutes of a particular skin type can be exposed to the sun before burning/tanning starts is based on the [Fitzpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale).

## {% linkable_title Full example %}

To configure additional functionality, add configuration options beneath a `binary_sensor` and/or `sensor` key within the `openuv` section of the `configuration.yaml` file as below:

```yaml
openuv:
  api_key: YOUR_OPENUV_API_KEY
  binary_sensors:
    - uv_protection_window
  sensors:
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
The above guidelines constitute estimates and are intended to help informed decision making. They should not replace analysis, advice or diagnosis from a trained medical professional.
</p>
