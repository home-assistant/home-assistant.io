---
layout: page
title: "Pushbullet Mirrors"
description: "Instructions on how to read user pushes in Home Assistant"
date: 2017-04-20 16:44
sidebar: true
comments: false
sharing: true
footer: true
logo: pushbullet.png
ha_category: Sensor
ha_release: 0.44
ha_iot_class: "Cloud Polling"
---

The `pushbullet` sensor platform reads messages from [Pushbullet](https://www.pushbullet.com/), a free service to send information between your phones, browsers, and friends. This sensor platform provides sensors that show the properties of the latest received Pushbullet notification mirror.

## {% linkable_title Setup %}

Notification Mirroring allows users to see their Android device's notifications on their computer. It must be first enabled in the app and is currently only available on the Android platform. For more information, please see [this announcement](https://blog.pushbullet.com/2013/11/12/real-time-notification-mirroring-from-android-to-your-computer/) on the Pushbullet Blog.

Go to [https://www.pushbullet.com/#settings/account](https://www.pushbullet.com/#settings/account) to retrieve your API key/access token.

## {% linkable_title Configuration %}

To enable the Pushbullet sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pushbullet
    api_key: YOUR_API_KEY
    monitored_conditions:
      - body
```

{% configuration %}
api_key:
  description: Your Pushbullet API key.
  required: true
  type: string
monitored_conditions:
  description: Properties of the push to monitor.
  required: false
  default: "`body` and `title`"
  type: list
  keys:
    application_name:
      description: The application sending the push.
    body:
      description: Body of the message.
    notification_id:
      description: ID of the notification.
    notification_tag:
      description: Tag (if the application sending supports it).
    package_name:
      description: Name of the sender's package.
    receiver_email:
      description: The email of the push's target.
    sender_email:
      description: The sender of the push.
    source_device_iden:
      description: ID of the sender's device.
    title:
      description: Title of the push.
    type:
      description: Type of push.
{% endconfiguration %}

All properties will be displayed as attributes. The properties array are just for logging the sensor readings for multiple properties.
