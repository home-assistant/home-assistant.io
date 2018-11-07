---
layout: page
title: "Dweet.io"
description: "Instructions on how to integrate Dweet.io sensors within Home Assistant."
date: 2015-12-10 10:15
sidebar: true
comments: false
sharing: true
footer: true
logo: dweet.png
ha_category: Sensor
ha_release: "0.10"
ha_iot_class: "Cloud Polling"
---

The `dweet` sensor platform allows you to get details from your devices which are publishing their values to [Dweet.io](https://dweet.io/).

## {% linkable_title Configuration %}

To use Dweet.io sensors in your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: dweet
    device: THING_NAME
    value_template: '{{ value_json.VARIABLE }}'
```
{% endraw %}

{% configuration %}
device:
  description: Identification of the device (also known as `thing`).
  required: true
  type: string
value_template:
  description: The variable to extract a value from the content.
  required: true
  type: template
name:
  description: Let you overwrite the name of the device in the frontend.
  required: false
  default: Dweet.io Sensor
  type: string
unit_of_measurement:
  description: Defines the unit of measurement of the sensor, if any.
  required: false
  type: string
{% endconfiguration %}

### {% linkable_title Full configuration sample %}

A full configuration entry could look like the sample below.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: dweet
    name: Temperature
    device: THING_NAME
    value_template: '{{ value_json.VARIABLE }}'
    unit_of_measurement: "°C"
```
{% endraw %}

### {% linkable_title Interacting with Dweet.io %}

You can easily send dweets from the command-line to test your sensor with `curl`.

```bash
$ curl -H 'Content-Type: application/json' -d '{"temperature": 40, "humidity": 65}' https://dweet.io/dweet/for/ha-sensor
```

will give you a response like the one below:

```json
{"this":"succeeded","by":"dweeting","the":"dweet","with":{"thing":"ha-sensor","created":"2015-12-10T09:43:31.133Z","content":{"temperature":40,"humidity":65}}}
```

The [dweepy](https://github.com/paddycarey/dweepy) module gives you another option to work with [Dweet.io](https://dweet.io/).

Send a dweet.

```bash
$ python3
>>> import dweepy
>>> dweepy.dweet_for('ha-sensor', {'temperature': '23', 'humiditiy':'81'})
{'thing': 'ha-sensor', 'created': '2015-12-10T09:46:08.559Z', 'content': {'humiditiy': 81, 'temperature': 23}}
```

Receive the latest dweet.

```bash
>>> dweepy.get_latest_dweet_for('ha-sensor')
[{'thing': 'ha-sensor'', 'created': '2015-12-10T09:43:31.133Z', 'content': {'humidity': 65, 'temperature': 40}}]
```
