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

If you have a device running iOS (iPhone, iPad, etc), The [iCloud](/components/device_tracker.icloud/) is gathering various details about your device including the battery level. To display it in the Frontend use a [template sensor](/components/sensor.template/).

```yaml
sensor:
  - platform: template
    sensors:
      battery_iphone:
        unit_of_measurement: '%'
        value_template: >-
            {% raw %}{%- if states.device_tracker.iphone.attributes.battery %}
                {{ states.device_tracker.iphone.attributes.battery }}
            {% else %}
                {{ states.sensor.battery_iphone.state }}
            {%- endif %}{% endraw %}
```

The `else` part is used to have the sensor keep it's last state if the newest [iCloud](/components/device_tracker.icloud/) update doesn't have any battery state in it (which happens sometimes). Otherwise the sensor will be blank.

### {% linkable_title Android and iOS Devices %}

While running the [Owntracks](/components/device_tracker.owntracks/) device tracker you can retrieve the battery level with a MQTT sensor.

```yaml
sensor:
  - platform: mqtt
    state_topic: "owntracks/tablet/tablet"
    name: "Battery Tablet"
    unit_of_measurement: "%"
    value_template: {% raw %}'{{ value_json.batt }}'{% endraw %}
```

