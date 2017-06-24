---
layout: page
title: "Xbox Live"
description: "Instructions on how to set up Xbox Live sensors in Home Assistant."
date: 2016-08-28 02:45
sidebar: true
comments: false
sharing: true
footer: true
logo: xbox-live.png
ha_category: Social
ha_iot_class: "Cloud Polling"
ha_release: 0.28
---

The Xbox Live component is able to track [Xbox](http://xbox.com/) profiles.

To use this sensor you need a free API key from [XboxAPI.com](http://xboxapi.com). Please also make sure to connect your Xbox account on that site.

The configuration requires you to specify XUIDs which are the unique identifiers for profiles. These can be determined on [XboxAPI.com](http://xboxapi.com) by either looking at your own profile page or using their interactive documentation to search for gamertags.

To use the Xbox Live sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: xbox_live
    api_key: YOUR_API_KEY
    xuid:
      - account1
      - account2
```

Configuration variables:

- **api_key** (*Required*): Your API key from [XboxAPI.com](http://xboxapi.com).
- **xuid** (*Required*): Array of profile XUIDs to be tracked.
