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

Set up [Mosquitto](https://mosquitto.org/) as MQTT broker.

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
    "folder": "mosquitto"
  },
  "certfile": "fullchain.pem",
  "keyfile": "privkey.pem"
}
```

<p class='note'>
Make sure you use logins and disable anonymous access if you want to secure the system.
</p>

Configuration variables:

- **plain** (*Optional*): Listen on port 1883 without SSL/TLS. Defaults to `true`.
- **ssl** (*Optional*): Listen on port 8883 with SSL/TLS. This requires certificates. Defaults to `false`.
- **anonymous** (*Optional*): Allow anonymous connections. If *logins* is set, the anonymous user can only read data. Defaults to `true`.
- **logins** (*Optional*): A list of users that will be created with *username* and *password*.
- **customize** (*Optional*): If you enable it, it reads additional configuration files (`*.conf`) from `/share/mosquitto`.

### {% linkable_title Home Assistant configuration %}

To use the Mosquitto as [broker](/docs/mqtt/broker/#run-your-own) add the following entry to the `configuration.yaml` file.

```yaml
# Example configuration.yaml entry
mqtt:
  broker: core-mosquitto
```

If username and password are set up in add-on, your `configuration.yaml` file should contain that data.

```yaml
mqtt:
  broker: core-mosquitto
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

### {% linkable_title Listening simultaneously on SSL/TLS (8883) and insecure (1883) ports %}

1. Configure SSL/TLS as normal.
2. Set `customize` flag to `true` in your configuration.
3. Create a file in `/share/mosquitto` named `insecure.conf` with the following contents:

```text
listener 1883
protocol mqtt
```

4. Restart MQTT

<p class='note warning'>
It's recommened that you only open your firewall to the SSL/TLS port (8883) and only use the insecure port (1883) for local devices.
</p>
