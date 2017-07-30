---
layout: page
title: "DirecTV"
description: "Instructions how to integrate DirecTV receivers into Home Assistant."
date: 2016-07-19 01:0+0000
sidebar: true
comments: false
sharing: true
footer: true
logo: directv.png
ha_category: Media Player
ha_release: 0.25
ha_iot_class: "Local Polling"
---

The [DirecTV](http://www.directv.com/) receivers will be automatically discovered if you enable the [discovery component](/components/discovery/).

The `directv` media player platform can also be forced to load by adding the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: directv
```
Configuration variables:

- **host** (*Optional*): Use only if you don't want to scan for devices.
- **port** (*Optional*): The port your receiver is using. Defaults to `8080`.
- **name** (*Optional*): Use to give a specific name to the device.
- **device** (*Optional*): Use to specify a particular receiver in a Genie setup.

In a DirecTV setup with Genie slave boxes, only the master Genie server is currently found via the [discovery component](/components/discovery/). Slave boxes must be manually configured via the `device` configuration variable in order to be used with Home Assistant.

To find valid device IDs, open `http://<IP Address of Genie Server>:8080/info/getLocations` in a web browser. For each Genie slave, you will find a variable `clientAddr` in the response, and this should be used for `device` in `configuration.yaml`

For example, a response such as:

```json
{
  "locations": [
    {
      "clientAddr": "0",
      "locationName": "MASTER GENIE SERVER",
      "tunerBond": true
    },
    {
      "clientAddr": "5009591D6969",
      "locationName": "SOME SLAVE GENIE"
    }
  ],
  "status": {
    "code": 200,
    "commandResult": 0,
    "msg": "OK.",
    "query": "/info/getLocations"
  }
}
```

Could be formatted into `configuration.yaml` like so:

```yaml
media_player:
  - platform: directv
    host: 192.168.1.10
    port: 8080
    name: Main DirecTV Box
    device: 0
  - platform: directv
    host: 192.168.1.10
    port: 8080
    name: Bedroom DirecTV
    device: 5009591D6969
```

It is important to notice that the host and port variables for slave receivers are the same as the master receiver.
