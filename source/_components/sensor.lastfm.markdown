---
layout: page
title: "Last.fm"
description: "Instructions on how to integrate Last.fm sensors into Home Assistant."
date: 2016-05-18 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lastfm.png
ha_category: Social
ha_iot_class: "Cloud Polling"
ha_release: "0.20"
---


The `lastfm` sensor platform will allow you to see whenever a user starts scrobbling, their play count, last song played, and top song played on [Last.fm](http://www.last.fm).

To get an API key you need to create an [API account](http://www.last.fm/api/account/create).

To use Last.fm with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lastfm
    api_key: YOUR_API_KEY
    users:
      - user1
      - user2
```

Configuration variables:

- **api_key** (*Required*): Your API key.
- **users** array (*Required*): Array of users.
  - **username** (*Required*): Username of the user.

