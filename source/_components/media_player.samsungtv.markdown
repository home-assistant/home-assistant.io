---
layout: page
title: "Samsung Smart TV"
description: "Instructions on how to integrate a Samsung Smart TV into Home Assistant."
date: 2016-02-13 12:02
sidebar: true
comments: false
sharing: true
footer: true
logo: samsung.png
ha_category: Media Player
featured: false
ha_release: 0.13
ha_iot_class: "Local Polling"
---

The `samsungtv` platform allows you to control a [Samsung Smart TV](http://www.samsung.com/uk/consumer/tv-audio-video/televisions/).

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: samsungtv
    host: 192.168.0.10
```

Configuration variables:

- **host** (*Required*): The IP of the Samsung Smart TV, eg. `192.168.0.10`.
- **port** (*Optional*): The port of the Samsung Smart TV. Defaults to 55000. If set to 8001, the new websocket connection will be used (required for 2016+ TVs).
- **name** (*Optional*): The name you would like to give to the Samsung Smart TV.
- **timeout** (*Optional*): The time-out for the communication with the TV. Defaults to 0.


Currently known supported models:

- C7700
- D7000
- D8000
- ES5500
- ES6800
- F6300
- F6500
- EH5600
- F6400AF
- D6505
- D6300SF

Currently tested but not working models:

- J5200 - Unable to see state and unable to control
 
If your model is not on the list then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.github.io/tree/current/source/_components/media_player.samsungtv.markdown).
The first letter (U, P, L, H & K) represent the screen type, e.g. LED or Plasma. The second letter represents the region, E is Europe, N is North America and A is Asia & Australia. The two numbers following that represent the screen size.
If you add your model remember to remove these before adding them to the list.

Currently the ability to select a source is not implemented.

There's currently a [known issue](https://github.com/home-assistant/home-assistant/issues/2098) with some TV's receiving a *Key press UP* that can interrupt certain applications. 
