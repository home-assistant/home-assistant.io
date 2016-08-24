---
layout: page
title: "NZBGet"
description: "Instructions how to integrate NZBGet within Home Assistant."
date: 2016-04-08 19:59
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Downloading
logo: nzbget.png
ha_iot_class: "Local Polling"
ha_release: 0.17
---

The `nzbget` platform will allow you to monitor your downloads with [NZBGet](http://NZBGet.net) from within Home Assistant and setup automation based on the information.

To use NZBGet with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: nzbget
  host: 192.168.1.18
  port: 6789
  username: apiuser
  password: apipass
  monitored_variables:
    - article_cache
    - average_download_rate
    - download_paused
    - download_rate
    - download_size
    - free_disk_space
    - post_paused
    - remaining_size
    - uptime
```

Configuration variables:

- **host** (*Required*): The ip address or hostname of your NZBGet installation.
- **port** (*Optional*): The port to access your NZBGet installation. (default 6789)
- **username** (*Optional*): The username to access your NZBGet installation.
- **password** (*Optional*): The password to access your NZBGet installation.
- **monitored_variables** (*Required*): Array of monitored details.
