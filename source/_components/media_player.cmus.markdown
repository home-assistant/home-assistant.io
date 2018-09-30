---
layout: page
title: "cmus"
description: "Instructions on how to integrate cmus Music Player into Home
Assistant."
date: 2016-06-17 18:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Media Player
ha_iot_class: "Local Polling"
---


The `cmus` platform allows you to control a [cmus](https://cmus.github.io/) music player on a remote or local machine from Home Assistant.

To add cmus to your installation, add the following to your `configuration.yaml` file if running locally it will look like:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: cmus
```

If cmus is running on a remote server:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: cmus
    host: IP_ADDRESS_OF_CMUS_PLAYER
    password: YOUR_PASSWORD
```

Configuration variables:

- **host** (*Optional*): Hostname or IP address of the machine running cmus. Note if a remote cmus is configured that instance must be configured to listen to remote connections, which also requires a password to be set.
- **password** (*Required if host is set*): Password for your cmus player.
- **port** (*Optional*): Port of the cmus socket, defaults to 3000.
- **name** (*Optional*): The name you'd like to give the cmus player in Home Assistant
