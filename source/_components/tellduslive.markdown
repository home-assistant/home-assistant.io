---
layout: page
title: "Telldus Live"
description: "Instructions how to integrate Telldus Live into Home Assistant."
date: 2016-01-17 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: telldus.png
ha_category: Hub
featured: false
ha_release: 0.11
---

The `tellduslive` component let you connect to [Telldus Live](https://live.telldus.com). It's cloud platform that connects to your Tellstick connected gear at home.

Home Assistant will automatically discover its presence on your local network, if `discovery:` is present in your configuration.yaml file. To manually integrate your Telldus Live with Home Assistant - if your device is on another network/in another location - add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tellduslive:
```

Configuration variables:

- **update_interval** (*Optional*): Interval (in seconds) for polling the Telldus Live server (or the local server).

The component will offer configuration through the Home Assistant user interface where it will let you associate it with your Telldus Live account.
