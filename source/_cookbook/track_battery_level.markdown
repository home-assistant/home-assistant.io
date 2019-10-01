---
title: "Track your phone battery level"
description: "Basic example how to track the battery level of your mobile devices."
ha_category: Automation Examples
---

### iOS Devices

If you have a device running iOS (iPhone, iPad, etc), The [iCloud](/integrations/icloud) integration is gathering various details about your device including the battery level. To display it in the Frontend use a [template sensor](/integrations/template). You can also use the `battery` [sensor device class](/integrations/sensor/#device-class) to dynamically change the icon with the battery level.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      battery_iphone:
        friendly_name: iPhone Battery
        unit_of_measurement: '%'
        value_template: >-
            {%- if state_attr('device_tracker.iphone', 'battery') %}
                {{ state_attr('device_tracker.iphone', 'battery')|round }}
            {% else %}
                {{ states('sensor.battery_iphone') }}
            {%- endif %}
        device_class: battery
```
{% endraw %}

### Android and iOS Devices
While running the [Owntracks](/integrations/owntracks) device tracker you can retrieve the battery level. 
How you achieve this depends on how you have configured your Owntracks instance. 

#### MQTT
If you have configured Owntracks to send reports via MQTT you can use the received data via a MQTT sensor.
Replace username with your MQTT username (for the embedded MQTT it's simply homeassistant), and deviceid with the set Device ID in Owntracks.

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

#### HTTP

If you have configured Owntracks to send reports to your Home Assistant instance via HTTP you can use a template sensor. 
Replace `deviceid` with the set Device ID in Owntracks.

{% raw %}
```yaml
sensor:
- platform: template
    sensors:
      your_battery_sensor_name:
        value_template: "{{ state_attr('device_tracker.deviceid', 'battery_level') }}"
        unit_of_measurement: '%'
```
{% endraw %}
