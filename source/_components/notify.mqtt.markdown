---
layout: page
title: "MQTT Notifications"
description: "Instructions on how to add MQTT notifications to Home Assistant."
date: 2016-02-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Notifications
ha_iot_class: depends
---

The MQTT notification support is different than the other [notification](/components/notify/) platforms. It is a service. This means that you don't have to create a configuration entry but you need to provide more details when calling the service.

**Call Service** section from the <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Developer Tools** allows you to send MQTT messages. Choose *mqtt.publish*  from the list of **Available services:** and enter something like the sample below into the **Service Data** field and hit **CALL SERVICE**.

```json
{"payload": "Test message from HA", "topic": "home/notification", "qos": 0, "retain": 0}
```

<p class='img'>
  <img src='/images/screenshots/mqtt-notify.png' />
</p>

The same will work for automations.

<p class='img'>
  <img src='/images/screenshots/mqtt-notify-action.png' />
</p>


## {% linkable_title Examples %}

### {% linkable_title REST API %}

Using the [REST API](https://developers.home-assistant.io/docs/en/external_api_rest.html) to send a message to a given topic.

```bash
$ curl -X POST \
    -H "Authorization: Bearer ABCDEFGH" \
    -H "Content-Type: application/json" \
    -d '{"payload": "Test message from HA", "topic": "home/notification"}' \
    http://IP_ADDRESS:8123/api/services/mqtt/publish
```

### {% linkable_title Automations %}

Use as [`script`](/components/script/) in automations.

{% raw %}
```yaml
automation:
  alias: Send me a message when I get home 
  trigger:
    platform: state 
    entity_id: device_tracker.me 
    to: 'home' 
  action:
    service: script.notify_mqtt
    data:
      target: "me" 
      message: "I'm home" 

script:
  notify_mqtt:
    sequence:
      - service: mqtt.publish
        data_template:
          payload: "{{ message }}"
          topic: home/"{{ target }}"
          retain: true
```
{% endraw %}
