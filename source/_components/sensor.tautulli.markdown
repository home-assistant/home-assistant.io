---
layout: page
title: "Tautulli activity sensor"
description: "Instructions on how to set up Tautulli sensors in Home Assistant."
date: 2018-10-27 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tautulli.png
ha_category: Sensor
ha_release: 0.82
ha_iot_class: "Local Polling"
---

The `tautulli` sensor platform will monitor activity on a given [Tautulli Server][tautulli]. It will create a sensor that shows the number of currently active streams as the state. If you click the sensor for more details it will show you more statistics, the following stats are available by default:

- LAN bandwidth
- Number of direct plays
- Number of direct streams
- Stream count
- Top Movie
- Top TV Show
- Top User
- Total bandwidth
- Transcode count
- WAN bandwidth

More user statistics can be added with the `monitored_conditions` configuration option, this will add one attribute per user in addition to the users current `activity`.

## {% linkable_title Setup %}

To find your `api_key` open the Tautulli web interface and navigate to `Settings` and then to `Web interface`, the `api_key` will be at the bottom of that page.

## {% linkable_title Configuration %}

If you want to enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tautulli
    api_key: TAUTULLI_API_KEY
    host: TAUTULLI_HOST
```

{% configuration %}
api_key:
  description: The API key for your Tautulli server.
  required: true
  type: string
host:
  description: The DNS name or IP Address of the server running Tautulli.
  required: true
  type: string
port:
  description: The port of your Tautulli server.
  required: false
  default: 8181
  type: integer
path:
  description: The Base Url path of your Tautulli server.
  required: false
  type: string
ssl:
  description: Use HTTPS to connect to Tautulli server. *NOTE* A host *cannot* be an IP address when this option is enabled.
  required: false
  default: false
  type: boolean
monitored_users:
  description: A list of Tautulli users you want to monitor, if not set this will monitor **all** users.
  required: false
  type: list
monitored_conditions:
  description: A list of attributes to expose for each Tautulli user you monitor, every key in the `session` [section here][tautulliapi] can be used.
  required: false
  type: list
{% endconfiguration %}

## {% linkable_title Full example for the configuration %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tautulli
    api_key: TAUTULLI_API_KEY
    host: TAUTULLI_HOST
    monitored_users:
      - USER_1
      - USER_2
    monitored_conditions:
      - ATTRIBUTE_1
      - ATTRIBUTE_2
```

[tautulli]: https://tautulli.com
[tautulliapi]: https://github.com/Tautulli/Tautulli/blob/master/API.md#get_activity
