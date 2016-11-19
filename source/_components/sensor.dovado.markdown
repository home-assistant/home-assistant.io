---
layout: page
title: "Dovado"
description: "How to integrate Dovado sensors within Home Assistant."
date: 2016-11-05 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: dovado.png
ha_release: 0.32
---

The `dovado` platform let you monitor your router from [Dovado](http://www.dovado.com/)

To add a Dovado sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dovado
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    host: IP_ADDRESS
    port: PORT
    sensors:
      - network
```

Configuration variables:

- **username** (*Required*): Your username.
- **password** (*Required*): Your password.
- **host** (*Optional*): The IP address of your router, e.g. `192.168.1.1`.
- **port** (*Optional*): The port number of your router, e.g. `999`.
- **sensors** array (*Required*): Conditions to display in the frontend.
  - **network**: Network state.
  - **signal**: The signal strength.
  - **download**: The download speed.
  - **upload**: The upload speed.
  - **sms**: Unread text messages

