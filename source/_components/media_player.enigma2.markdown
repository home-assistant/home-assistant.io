---
layout: page
title: "Enigma2 Media Player"
description: "How to set up the Enigma2 media player platform"
date: 2017-04-07
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Media Player
ha_release: 0.43
---

The `Enigma2` platform allows you to control [Enigma2](http://wiki.blue-panel.com/index.php/Enigma2_(en)) linux based settopboxes through web API from Home Assistant.

To test if your web api works: Navigate your browser at http://192.168.1.x/web/powerstate, you should see there an XML output.
x - put ip address of your box

To add Enigma2 player to your installation, add the following to your `configuration.yaml` file.

```yaml
# Example configuration.yaml entry
media_player:
  - platform: enigma
    host: 192.168.1.x
    port: 80
```

Configuration variables:

- **name** (*Optional*): Name of the device
- **host** (*Required*): IP address of the device
- **port** (*Required*): Port number of the device
- **username** (*Optional*): Your settopbox username
- **password** (*Optional*): Your settopbox password

