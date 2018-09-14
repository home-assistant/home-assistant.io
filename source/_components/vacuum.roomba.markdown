---
layout: page
title: "iRobot Roomba"
description: "Instructions on how to integrate your Wi-Fi enabled Roomba within Home Assistant."
date: 2017-08-04 20:43
sidebar: true
comments: false
sharing: true
footer: true
logo: irobot_roomba.png
ha_category: Vacuum
ha_release: 0.51
---

The `roomba` component allows you to control your [iRobot Roomba](http://www.irobot.com/For-the-Home/Vacuuming/Roomba.aspx) vacuum.

<p class='note'>
This platform has only been tested with an iRobot Roomba 980 but should work find with any Wi-Fi enabled Roomba like the 690, 890 or the 960.
</p>

To add your Roomba vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: roomba
    host: IP_ADDRESS_OR_HOSTNAME
    username: BLID
    password: PASSWORD
```

Configuration variables:

- **host** (*Required*): Hostname or IP address of the Roomba.
- **username** (*Required*): The username (BLID) for your device.
- **password** (*Required*): The password for your device.
- **name** (*Optional*): The name of the vacuum.
- **certificate** (*Optional*): Path to your certificate store. Defaults to `/etc/ssl/certs/ca-certificates.crt`.
- **continuous** (*Optional*): Whether to operate in continuous mode. Defaults to `True`.

<p class='note'>
The Roomba's MQTT server only allows a single connection. Enabling continuous mode will force the App to connect via the cloud to your Roomba. [More info here](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes)
</p>

### {% linkable_title Retrieving your credentials %}

Please refer to [here](https://github.com/NickWaterton/Roomba980-Python#how-to-get-your-usernameblid-and-password) or [here](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) to retrieve both the BLID (username) and the password.
