---
title: "Track your phone battery level"
description: "Basic example how to track the battery level of your mobile devices."
ha_category: Automation Examples
---

## Android and iOS Devices

The [Home Assistant Companion Apps](https://companion.home-assistant.io/) for iOS and Android pass the current battery level to Home Assistant with every location update. The default name of the sensor used is `sensor.battery_level`.

### iOS Devices

If you have a device running iOS (iPhone, iPad, etc), The [iCloud](/integrations/icloud) integration is gathering various details about your device including the battery level. To display it in the Frontend use a [template sensor](/integrations/template). You can also use the `battery` [sensor device class](/integrations/sensor/#device-class) to dynamically change the icon with the battery level.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      battery_iphone:
        friendly_name: iPhone Battery
        unit_of_measurement: "%"
        value_template: >-
            {%- if state_attr('device_tracker.iphone', 'battery') %}
                {{ state_attr('device_tracker.iphone', 'battery')|round }}
            {% else %}
                {{ states('sensor.battery_iphone') }}
            {%- endif %}
        device_class: battery
```

{% endraw %}

### Android Devices

On your Android device, once the official [Home Assistant Companion app](https://companion.home-assistant.io/) is installed and connected to your Home Assistance instance, you will be able to display the battery level in the frontend by adding a [template sensor](/integrations/template) to your configuration YAML file. You can also use the battery [sensor device class](/integrations/sensor/#device-class) to dynamically change the icon with the battery level.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      battery_phone:
        friendly_name: AndroidPhone Battery
        unit_of_measurement: "%"
        value_template: >-
            {%- if state_attr('device_tracker.xxxxx', 'battery_level') %}
                {{ state_attr('device_tracker.xxxxx', 'battery_level')|round }}
            {% else %}
                {{ states('device_tracker.xxxxx') }}
            {%- endif %}
        device_class: battery
```

{% endraw %}

Replace 'device_tracker.xxxxx' with your phone name as shown under Configuration/Devices Device Info/Entities, for example: 'device_tracker.mi_a1'

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
    value_template: "{{ value_json.batt }}"
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
        unit_of_measurement: "%"
```

{% endraw %}
