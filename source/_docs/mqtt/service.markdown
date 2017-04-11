---
layout: page
title: "MQTT Publish service"
description: "Instructions how to setup the MQTT Publish service within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
redirect_from: /components/mqtt/#publish-service
---

The MQTT component will register the service `publish` which allows publishing messages to MQTT topics. There are three ways of specifying your payload. You can use `payload` to hard-code a payload, use `payload_template` to specify a [template](/topics/templating/) that will be rendered to generate the payload, and `payload_file_path` to specify a local file to be published as binary payload.

```json
{
  "topic": "home-assistant/light/1/command",
  "payload": "on"
}
```

```json
{
  "topic": "home-assistant/light/1/state",
  "payload_template": "{% raw %}{{ states('device_tracker.paulus') }}{% endraw %}"
}
```

```json
{
  "topic": "home-assistant/webcam/snapshot",
  "payload_file_path": "/home/user/snapshot.jpg"
}
```

You can call this service from automations or scripts. For example, in a script:

```
script:
  send_mqtt_notification:
    alias: Send MQTT notification
    sequence:
      service: mqtt.publish
      data_template:
        topic: 'home-assistant/{{ title }}/notification'
        payload: '{{ message }}'
        qos: 1
        retain: 0

automation:
  - alias: When Alarm is triggered
    trigger:
      platform: state
      entity_id: alarm_control_panel.ha_alarm
      to: 'triggered'
    action:
      - service: script.send_mqtt_notification
        data:
         title: 'Triggered Alarm!"
         message: "Your home alarm was triggered."
```

Call from an automation example:
```
automation:
  - alias: Send snapshot
    trigger:
      platform: state
      entity_id: input_boolean.send_snapshot
      from: 'off'
      to: 'on'
    action:
      - service: mqtt.publish
        data:
          topic: 'home-assistant/webcam/snapshot'
          payload_file_path: '/home/user/snapshot.jpg'
```
