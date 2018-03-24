---
layout: page
title: "IMAP Unread E-mail"
description: "Instructions on how to integrate IMAP unread email into Home Assistant."
date: 2016-07-11 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: smtp.png
ha_category: Sensor
ha_release: 0.25
ha_iot_class: "Cloud Push"
---


The `imap` sensor platform is observing your [IMAP server](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) and reporting the amount of unread emails.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: imap
    server: imap.gmail.com
    port: 993
    username: USERNAME
    password: PASSWORD
```

Configuration variables:

- **server** (*Required*): The IP address or hostname of the IMAP server.
- **port** (*Optional*): The port where the server is accessible.
- **name** (*Optional*): Name of the IMAP sensor.
- **username** (*Required*): Username for the IMAP server.
- **password** (*Required*): Password for the IMAP server.
- **folder** (*Optional*): The IMAP folder to watch.
