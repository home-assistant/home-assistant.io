---
layout: page
title: "NZBGet"
description: "Instructions on how to integrate NZBGet within Home Assistant."
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
  host: YOUR_NZBGET_HOST
  monitored_variables:
    - article_cache
    - download_rate
    - download_paused
```

Configuration variables:

- **host** (*Required*): IP address where your NZBGet installation is running.
- **port** (*Optional*): The port of your NZBGet installation. Defaults to 6789.
- **ssl** (*Optional*): Whether or not to use SSL to access NZBGet. Defaults to false.
- **name** (*Optional*): The prefix to use for your sensor. Defaults to NZBGet.
- **username** (*Optional*): The username to access your NZBGet installation.
- **password** (*Optional*): The password to access your NZBGet installation.
- **monitored_variables** array (*Required*): List of monitored details.
  - **article_cache**: Number of cached articles.
  - **average_download_rate**: Average download rate
  - **download_paused**: Paused downloads
  - **download_rate**: Current download rate
  - **download_size**: The size to download
  - **free_disk_space**: Free disk space at the storage location of NZBGet
  - **post_paused**: Paused posts
  - **remaining_size**: Remaining size to download
  - **uptime**: Uptime of NZBGet

