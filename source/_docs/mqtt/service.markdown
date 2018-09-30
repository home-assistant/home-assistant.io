---
layout: page
title: "MQTT Publish service"
description: "Instructions on how to setup the MQTT Publish service within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
---

The MQTT component will register the service `mqtt.publish` which allows publishing messages to MQTT topics. There are two ways of specifying your payload. You can either use `payload` to hard-code a payload or use `payload_template` to specify a [template](/topics/templating/) that will be rendered to generate the payload.

```json
{
  "topic": "home-assistant/light/1/command",
  "payload": "on"
}
```

{% raw %}
```json
{
  "topic": "home-assistant/light/1/state",
  "payload_template": "{{ states('device_tracker.paulus') }}"
}
```
{% endraw %}

`payload` must be a string. If you want to send JSON then you need to format/escape it properly. Like:

```json
{
  "topic": "home-assistant/light/1/state",
  "payload":"{\"Status\":\"off\", \"Data\":\"something\"}"
}
``` 
