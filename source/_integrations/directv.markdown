---
title: DirecTV
description: Instructions on how to integrate DirecTV receivers into Home Assistant.
logo: directv.png
ha_category:
  - Media Player
ha_release: 0.25
ha_iot_class: Local Polling
---

Master [DirecTV](https://www.directv.com/) receivers (ie: those that have tuners) will be automatically discovered if you enable the [discovery integration](/integrations/discovery/) and the receiver is powered-on. Slave/RVU client/Genie boxes will also be discovered, but only if they are also online at the time of discovery.

To ensure that your DirecTV boxes are always found and configured, they should be added into your `configuration.yaml`.

```yaml
# Example configuration.yaml entry
media_player:
  - platform: directv
```

{% configuration %}
host:
  description: The IP address or the hostname of the device. Use only if you don't want to scan for devices.
  required: false
  type: string
port:
  description: The port your receiver is using.
  required: false
  default: 8080
  type: integer
name:
  description: Use to give a specific name to the device.
  required: false
  default: DirecTV Receiver
  type: string
device:
  description: Use to specify a particular receiver in a Genie setup.
  required: false
  type: string
{% endconfiguration %}

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

It is important to notice that the host and port variables for slave/Genie receivers are the same as the master receiver.

## Services

### Media control services

Available services: turn_on, turn_off, media_play, media_pause, media_stop, media_next_track, media_previous_track, play_media

#### Service `media_player.play_media`

| Service data attribute | Optional | Description                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.                                                                                                                       |
| `media_content_id`     |       no | The channel number to change to.                   |
| `media_content_type`   |       no | A media type. Has to be `channel`.
