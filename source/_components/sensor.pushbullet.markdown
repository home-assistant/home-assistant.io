---
layout: page
title: "Pushbullet Mirrors"
description: "Instructions how to read user pushes in Home Assitant"
date: 2017-02-23 18:36
sidebar: true
comments: false
sharing: true
footer: true
logo: pushbullet.png
ha_category: Sensor
---

The `pushbullet` sensor platform reads messages from [Pushbullet](https://www.pushbullet.com/), a free service to send information between your phones, browsers, and friends.
This sensor platform provide sensors that show the properties of the latest recevied pushbullet notification mirror.

To enable the Pushbullet sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pushbullet
    api_key: YOUR_API_KEY
    monitored_conditions:
      - body
      - title
      - application_name
```

Configuration variables:

- **api_key** (*Required*): Enter the API key for Pushbullet. Go to [https://www.pushbullet.com/#settings/account](https://www.pushbullet.com/#settings/account) to retrieve your API key/access token.

- **monitored_conditions** array (*Optional*): Properties of the push to display
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
  
  defaults to **application_name**, **body** and **title**.
