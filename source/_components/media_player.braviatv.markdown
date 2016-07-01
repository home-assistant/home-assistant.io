---
layout: page
title: "Sony Bravia TV"
description: "Instructions on how to integrate a Sony Bravia TV into Home Assistant."
date: 2016-07-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bravia.png
ha_category: Media Player
ha_release: 0.23
---

The `braviatv` platform allows you to control a [Sony Bravia TV](http://www.sony.com).

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: braviatv
  host: 192.168.0.10
```

Configuration variables:

- **host** (*Required*): The IP of the Sony Bravia TV, eg. 192.168.0.10

