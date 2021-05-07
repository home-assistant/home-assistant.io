---
title: Apple iTunes
description: Instructions on how to integrate iTunes into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.7.3
ha_iot_class: Local Polling
ha_domain: itunes
ha_platforms:
  - media_player
---

The `itunes` media player platform allows you to control [iTunes](https://apple.com/itunes/) from Home Assistant. It uses a 3rd party server that you run on your Mac called [itunes-api](https://github.com/maddox/itunes-api). Play, pause or skip songs remotely on iTunes running on your Mac.

In addition to controlling iTunes, your available AirPlay endpoints will be added as media players as well. You can then individually address them and turn them on, turn them off or adjust their volume.

## Configuration

To add iTunes to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: itunes
    host: 192.168.1.50
```

{% configuration %}
host:
  description: The IP of the itunes-api API, e.g., 192.168.1.50.
  required: true
  type: string
port:
  description: The port where itunes-api is accessible, e.g., 8181.
  required: false
  default: 8181
  type: integer
{% endconfiguration %}
