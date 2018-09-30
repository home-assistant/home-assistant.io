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
The "Limited" plan (which is what new users are given by default) is limited to 500 API requests per day. In order to leave a buffer, the `openuv` component queries the API every 30 minutes by default. This value can be modifed (via the `scan_interval` key), but please note that over-running the API will require
you to upgrade to a paid plan (and may disable your access in the meantime).
</p>

## {% linkable_title Base Configuration %}

To retrieve data from OpenUV, add the following to your `configuration.yaml`
file:

```yaml
openuv:
  api_key: YOUR_OPENUV_API_KEY
```

To configure additional functionality, add configuration options beneath a `binary_sensor` and/or `sensor` key within the `openuv` section of `configuration.yaml` as below:

```yaml
openuv:
  api_key: YOUR_OPENUV_API_KEY
  binary_sensors:
    # binary sensor configuration options...
  sensors:
    # sensor configuration options...
```

{% configuration %}
api_key:
  description: your OpenUV API key
  required: true
  type: string
scan_interval:
  description: the frequency (in seconds) between data updates
  required: false
  type: int
  default: 1800
binary_sensors:
  description: binary sensor-related configuration options
  required: false
  type: map
  keys:
    monitored_conditions:
      description: the conditions to create sensors from
      required: false
      type: list
      default: all (`uv_protection_window`)
sensors:
  description: sensor-related configuration options
  required: false
  type: map
  keys:
    monitored_conditions:
      description: the conditions to create sensors from
      required: false
      type: list
      default: all ( `current_ozone_level`, `current_uv_index`, `current_uv_level`, `max_uv_index`, `safe_exposure_time_type_1`, `safe_exposure_time_type_2`, `safe_exposure_time_type_3`, `safe_exposure_time_type_4`, `safe_exposure_time_type_5`, `safe_exposure_time_type_6` )
{% endconfiguration %}

## {% linkable_title Binary Sensor Types %}

### {% linkable_title `uv_protection_window` %}

This sensor displays `true` if UV protection (sunscreen, etc.) is recommended at the current date and time; displays `false` otherwise.

## {% linkable_title Sensor Types %}

### {% linkable_title `current_ozone_level` %}

This sensor displays the current ozone level in du (Dobson Units).

### {% linkable_title `current_uv_index` %}

This sensor displays the current UV index.

### {% linkable_title `current_uv_level` %}

This sensor displays the level of current UV index, which is calculated based on [UV Index Levels & Colors](https://www.openuv.io/kb/uv-index-levels-colors).

### {% linkable_title `max_uv_index` %}

This sensor displays the maximum UV index that will be encountered that day (at solar noon).

### {% linkable_title `safe_exposure_time_type_X` %}

These sensors display the approximate number of minutes a particular skin type can be exposed to the sun before burning/tanning starts. Each sensor depicts a skin type based on the
[Fitzpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale):

* Skin Type I
* Skin Type II
* Skin Type III
* Skin Type IV
* Skin Type V
* Skin Type VI

<p class='note warning'>
The above guidelines constitude estimates and are intended to help informed decision making. They should not replace analysis, advice, or diagnosis from a trained medical professional.
</p>
