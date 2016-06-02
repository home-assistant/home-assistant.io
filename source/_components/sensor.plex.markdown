---
layout: page
title: "Plex Sensor"
description: "How to add a Plex sensor to Home Assistant."
date: 2016-06-3 08:19
sidebar: true
comments: false
sharing: true
footer: true
logo: plex.png
ha_category: Sensor
ha_release: 0.21
---

This sensor platform will monitor activity on a given Plex Media Server.  It will create a sensor that shows the number of
currently watching users as the state.  If you click the sensor for more details it will show you who is watching what.

If your plex server is on the same local network as Home Assistant, all you need to provide in the configuration.yaml
is the host or ip address.  If you want to access a remote plex server, you must provide the plex username, password,
and optionally the server name of the remote plex server.  If no server name is given it will use the first server listed.

Example Configuration:
```yaml
sensor:
  platform: plex
  name: Plex Spy         *optional, default Plex
  host: 192.168.1.100    *optional, default localhost
  port: 32400            *optional, default 32400
  username: plexuser     *optional, use for remote access
  password: plexpw       *optional, use for remote access
  server: MyPlexServer   *optional, use for remote access
```

