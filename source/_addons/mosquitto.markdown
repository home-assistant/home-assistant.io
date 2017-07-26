---
layout: page
title: "Mosquitto MQTT broker"
description: "Fast and reliable MQTT broker."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
featured: true
---

Set up a [mosquitto](https://mosquitto.org/) MQTT broker.

```json
{
  "plain": true,
  "ssl": false,
  "anonymous": true,
  "logins": [
    {"username": "testuser", "password": "mypw"}
  ],
  "customize": {
    "active": false,
    "folder": "mosquitto",
  }
}
```

<p class='note'>Make sure you use logins and disable anonymous access if you want to secure the system.</p>

Configuration variables:

- **plain** (*Optional*): Listen to broker on port 1883 without SSL/TLS. Defaults to `true`.
- **ssl** (*Optional*): Listen to broker on port 8883 with SSL/TLS. This requires certificates. Defaults to `false`.
- **anonymous** (*Optional*): Allow anonymous connection. If *logins* is set, anonymous user can only read data. Defaults to `true`.
- **logins** (*Optional*): A list of user that will be created with *username* and *password*.
- **customize** (*Optional*): If you enable it, it read additional config files (`*.conf`) from `/share/mosquitto`.

### {% linkable_title Home Assistant configuration %}

```yaml
# Example configuration.yaml entry
mqtt:
  broker: 172.17.0.1
```
