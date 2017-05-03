---
layout: page
title: "Mosquitto MQTT broker"
description: "Fast and reliable MQTT broker."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Setup a [mosquitto](https://mosquitto.org/) mqtt broker.

```json
{
  "plain": true,
  "ssl": false,
  "anonymous": true,
  "logins": [
    {"username": "testuser", "password": "mypw"}
  ]
}
```

Configuration variables:

- **plain** (*Optional*): default true. Listen broaker on port 1883 without SSL/TLS.
- **ssl** (*Optional*): default false. Listen broker on port 8883 with SSL/TLS. Need to have certificates.
- **anonymous** (*Optional*): default true. Allow anonymous connection. If *logins* is set, anonymous user can only read data.
- **logins** (*Optional*): default empty. A list of user that will be create with *username* and *password*.
