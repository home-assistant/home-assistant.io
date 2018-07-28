---
layout: page
title: "Plex Activity Monitor"
description: "How to add a Plex sensor to Home Assistant."
date: 2016-06-3 08:19
sidebar: true
comments: false
sharing: true
footer: true
logo: plex.png
ha_category: Media Player
ha_release: 0.22
ha_iot_class: "Local Polling"
---

The `plex` sensor platform will monitor activity on a given [Plex Media Server](https://plex.tv/). It will create a sensor that shows the number of currently watching users as the state. If you click the sensor for more details it will show you who is watching what.

If your Plex server is on the same local network as Home Assistant, all you need to provide in the `configuration.yaml` is the host or IP address. If you want to access a remote Plex server, you must provide the Plex username, password, and optionally the server name of the remote Plex server. If no server name is given it will use the first server listed. If you use the username and password, all servers in that account are monitored.

If you don't know your token, see [Finding your account token / X-Plex-Token](https://support.plex.tv/hc/en-us/articles/204059436).

If you want to enable the plex sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: plex
```

Configuration variables:

- **host** (*Optional*): The IP address of your Plex server. Defaults to `localhost`.
- **port** (*Optional*): The port of your Plex Server. Defaults to `32400`.
- **name** (*Optional*): Name of the Plex server. Defaults to "Plex".
- **username** (*Optional*): The username for the remote Plex server.
- **password** (*Optional*): The password for your given account on the remote Plex server.
- **server** (*Optional*): The name of your remote Plex server.
- **token** (*Optional*): X-Plex-Token of your remote Plex server.
- **ssl** (*Optional*): Use HTTPS to connect to Plex server, *NOTE* host *must not* be an IP when this option is enabled. Defaults to `false`.
