---
layout: page
title: "Track your battery level"
description: "Basic example how to track the battery level of your mobile devices."
date: 2016-01-29 09:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

### {% linkable_title iOS Devices %}

If you have a device running iOS (iPhone, iPad, etc), The [iCloud](/components/device_tracker.icloud/) is gathering various details about your device including the battery level. To display it in the Frontend use a [template sensor](/components/sensor.template/). You can also the `battery` [sensor device class](/components/sensor/#device-class) to dynamically change the icon with the battery level.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      battery_iphone:
        friendly_name: iPhone Battery
        unit_of_measurement: '%'
        value_template: >-
            {%- if states.device_tracker.iphone.attributes.battery %}
                {{ states.device_tracker.iphone.attributes.battery|round }}
            {% else %}
                {{ states.sensor.battery_iphone.state }}
            {%- endif %}
        device_class: battery
```
{% endraw %}

### {% linkable_title Android and iOS Devices %}

While running the [Owntracks](/components/device_tracker.owntracks/) device tracker you can retrieve the battery level with a MQTT sensor. Replace username with your MQTT username (for the embedded MQTT it's simply homeassistant), and deviceid with the set Device ID in Owntracks.

{% raw %}
```yaml
sensor:
  - platform: mqtt
    state_topic: "owntracks/username/deviceid"
    name: "Battery Tablet"
    unit_of_measurement: "%"
    value_template: '{{ value_json.batt }}'
    device_class: battery
```
{% endraw %}
