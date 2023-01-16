---
title: Last.fm
description: Instructions on how to integrate Last.fm sensors into Home Assistant.
ha_category:
  - Social
ha_iot_class: Cloud Polling
ha_release: '0.20'
ha_domain: lastfm
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `lastfm` sensor platform will allow you to see whenever a user starts scrobbling, their play count, last song played, and top song played on [Last.fm](https://www.last.fm/).

## Setup

To get an API key you need to create an [API account](https://www.last.fm/api/account/create).

## Configuration

To use Last.fm sensor with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lastfm
    api_key: YOUR_API_KEY
    users:
      - user1
      - user2
```

{% configuration %}
api_key:
  description: Your Last.fm API key.
  required: true
  type: string
users:
  description: List of users.
  required: true
  type: list
  keys:
    username:
      description: Username of the user to monitor.
{% endconfiguration %}
