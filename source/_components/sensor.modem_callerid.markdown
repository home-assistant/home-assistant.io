---
layout: page
title: "Caller ID Sensor"
description: "Instructions how to integrate the Caller ID sensor into Home Assistant."
date: 2017-02-20 22:10
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: "0.40"
ha_iot_class: "Local Polling"
---

The `modem_callerid` sensor platform uses an available modem for collecting caller ID information. It requires a Hayes AT compatible modem that supports caller ID detection (via AT+VCID=1).

To enable the sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: modem_callerid
```

Configuration variables:

- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `modem_callerid`.
- **device** (*Optional*): Device port name. Defaults to `/dev/ttyACM0`.

To find the path of your USB modem, run:

`$ ls /dev/ttyACM*`

If Home Assistant (`hass`) runs with another user (e.g., `homeassistant` on Hassbian) give access to the stick with:

`$ sudo usermod -a -G dialout homeassistant`

Depending on what's plugged into your USB ports, the name found above may change. You can lock in a name, such as `/dev/modem`, by following [these instructions](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/).

When the sensor detects a new call, its state changes to 'ring' for each ring and 'callerid' when caller id information is received. It returns to 'idle' once ringing stops. The state event includes an attribute payload that includes the time of the call, name and number.

Some example automations:
```yaml
{% raw %}automation:
  - alias: Notify CallerID
    trigger: 
      platform: state
      entity_id: sensor.modem_callerid
      to: "callerid"
    action:
      service: notify.notify
      data:
        message: 'Call from {{ states.sensor.modem_callerid.attributes.cid_name }} at {{ states.sensor.modem_callerid.attributes.cid_number }} '
  - alias: Notify CallerID webui
    trigger: 
      platform: state
      entity_id: sensor.modem_callerid
      to: "callerid"
    action:
      service: persistent_notification.create
      data:
        title: "Call from"
        message: '{{ states.sensor.modem_callerid.attributes.cid_time.strftime("%I:%M %p") }} {{ states.sensor.modem_callerid.attributes.cid_name }}  {{ states.sensor.modem_callerid.attributes.cid_number }} '
  - alias: Say CallerID
    trigger: 
      platform: state
      entity_id: sensor.modem_callerid
      to: "callerid"
    action:
      service: tts.google_say
      data_template:
        message: 'Call from {{ states.sensor.modem_callerid.attributes.cid_name }} '{% endraw %}
```

