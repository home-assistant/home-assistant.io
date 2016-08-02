---
layout: page
title: "MPC-HC"
description: "Instructions how to integrate MPC-HC into Home Assistant."
date: 2016-07-27 21:21
sidebar: true
comments: false
sharing: true
footer: true
logo: mpchc.png
ha_category: Media Player
featured: false
ha_release: 0.25.0
---


The `mpchc` platform allows you to connect a [Media Player Classic Home Cinema](https://mpc-hc.org/) to Home Assistant. It will allow you to see the current playing item, and respond to changes in the player's state.

For this component to function, you will need to enable the Web Interface in the MPC-HC options dialog.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/mpc-hc.png' />
</p>

To add MPC-HC to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: mpchc
    host: http://192.168.0.123
    port: 13579
    name: MPC-HC
```

Configuration variables:

- **host** (*Required*): The host name or address of the device that is running MPC-HC
- **port** (*Required*): The port number, default 13579
- **name** (*Optional*): The name of the device used in the frontend.
