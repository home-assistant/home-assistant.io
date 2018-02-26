---
layout: page
title: "Pushbullet Mirrors"
description: "Instructions how to read user pushes in Home Assistant"
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

The `pushbullet` sensor platform reads messages from [Pushbullet](https://www.pushbullet.com/), a free service to send information between your phones, browsers, and friends.
This sensor platform provides sensors that show the properties of the latest received Pushbullet notification mirror.

Notification Mirroring allows users to see their Android device's notifications on their computer. It must be first enabled in the app and is currently only available on the Android platform. For more information, please see [this announcement](https://blog.pushbullet.com/2013/11/12/real-time-notification-mirroring-from-android-to-your-computer/) on the Pushbullet Blog.

To enable the Pushbullet sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pushbullet
    api_key: YOUR_API_KEY
    monitored_conditions:
      - body
```

Configuration variables:

- **api_key** (*Required*): Enter the API key for Pushbullet. Go to [https://www.pushbullet.com/#settings/account](https://www.pushbullet.com/#settings/account) to retrieve your API key/access token.

- **monitored_conditions** array (*Optional*): Properties of the push to monitor.  Defaults to `body` and `title`.
  - **application_name**: The application sending the push.
  - **body**: Body of the message.
  - **notification_id**: ID of the notification.
  - **notification_tag**: Tag (if the application sending supports it).
  - **package_name**: Name of the sender's package.
  - **receiver_email**: The email of the push's target.
  - **sender_email**: The sender of the push.
  - **source_device_iden**: ID of the sender's device.
  - **title**: Title of the push.
  - **type**: Type of push.
  
 
All properties will be displayed as attributes. The properties array are just for logging the sensor readings for multiple properties.
