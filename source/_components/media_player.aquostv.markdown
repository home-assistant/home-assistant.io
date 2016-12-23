---
layout: page
title: "Sharp Aquos TV"
description: "Instructions on how to integrate a Sharp Aquos TV into Home Assistant."
date: 2016-11-02 12:02
sidebar: true
comments: false
sharing: true
footer: true
logo: sharp_aquos.jpg
ha_category: Media Player
featured: false
ha_release: 0.35
ha_iot_class: "Local Polling"
---

The `aquostv` platform allows you to control a [Sharp Aquos TV](http://www.sharp.ca/en-CA/ForHome/HomeEntertainment/LEDTV/QuattronPlus.aspx).

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: aquostv
    host: 192.168.0.10
```

Configuration variables:

- **host** (*Required*): The IP/Hostname of the Samsung Smart TV, eg. `192.168.0.10`.
- **port** (*Optional*): The port of the Samsung Smart TV. Defaults to 10002.
- **username** (*Optional*): The username of the Samsung Smart TV. Defaults to admin.
- **password** (*Optional*): The password of the Samsung Smart TV. Defaults to password.
- **name** (*Optional*): The name you would like to give to the Sharp Aquos TV.


Currently known supported models:

- LC-40LE830U
- LC-46LE830U
- LC-52LE830U
- LC-60LE830U
- LC-52LE925UN
- LC-60LE925UN
- LC-60LE857U

If your model is not on the list then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.github.io/tree/current/source/_components/media_player.aquostv.markdown).
