---
layout: page
title: "Sharp Aquos TV"
description: "Instructions on how to integrate a Sharp Aquos TV into Home Assistant."
date: 2016-11-02 12:02
sidebar: true
comments: false
sharing: true
footer: true
logo: sharp_aquos.png
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

- **host** (*Required*): The IP/Hostname of the Sharp Aquos TV, eg. `192.168.0.10`.
- **port** (*Optional*): The port of the Sharp Aquos TV. Defaults to 10002.
- **username** (*Optional*): The username of the Sharp Aquos TV. Defaults to admin.
- **password** (*Optional*): The password of the Sharp Aquos TV. Defaults to password.
- **name** (*Optional*): The name you would like to give to the Sharp Aquos TV.
- **power_on_enabled** (*Optional*): If you want to be able to turn on your TV. Defaults to False.

<p class='note warning'>
When you set **power_on_enabled** as True, you have to turn on your TV on the first time with the remote.
Then you will be able to turn on with Home-Assistant.
Also, with **power_on_enabled** as True, the Aquos logo on your TV will stay on when you turn off the TV and your TV could consumes more power.
</p>


Currently known supported models:

- LC-40LE830U
- LC-46LE830U
- LC-52LE830U
- LC-60LE830U
- LC-52LE925UN
- LC-60LE925UN
- LC-60LE857U
- LC-60EQ10U
- LC-60SQ15U

If your model is not on the list then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.github.io/tree/current/source/_components/media_player.aquostv.markdown).
