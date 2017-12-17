---
layout: page
title: "MQTT Notifications"
description: "Instructions how to add MQTT notifications to Home Assistant."
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

**Call Service** section from the **Developer Tools** allows you to send MQTT messages. Choose *mqtt/publish*  from the list of **Available services:** and enter something like the sample below into the **Service Data** field and hit **CALL SERVICE**.

```json
{"payload": "Test message from HA", "topic": "home/notification", "qos": 0, "retain": 0}
```

<p class='img'>
  <img src='/images/screenshots/mqtt-notify.png' />
</p>

Using the [REST API](/developers/rest_api/#post-apiservicesltdomainltservice) to send a message to a given topic.

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       -d '{"payload": "Test message from HA", "topic": "home/notification"}' \
       http://IP_ADDRESS:8123/api/services/mqtt/publish
```

