---
layout: page
title: "iRobot Roomba"
description: "Instructions how to integrate your Wi-Fi enabled Roomba within Home Assistant."
date: 2017-07-24 11:11
sidebar: true
comments: false
sharing: true
footer: true
logo: irobot_roomba.png
ha_category: Hub
ha_release: 0.50
---

The `roomba` component allows you to control your [Roomba](http://www.irobot.com/For-the-Home/Vacuuming/Roomba.aspx).

<p class='note'>
This platform has only been tested with an iRobot Roomba 980, but should work fine
with any Wi-Fi enabled Roomba like the 690, 890 or the 960.
</p>

To enable `roomba` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
roomba:
  hostname: IP_ADDRESS_OR_HOSTNAME
  username: BLID
  password: PASSWORD
```

Configuration variables:

- **hostname** (*Required*): Hostname or IP address of the Roomba.
- **username** (*Required*): Username (BLID).
- **password** (*Required*): Password.
- **certificate** (*Optional*): Path to your certificate store (Default: `/etc/ssl/certs/ca-certificates.crt`)
- **continuous** (*Optional*): Whether to operate in continuous mode (Default: `True`).

<p class='note'>
The Roomba's MQTT server only allows a single connection. Enabling continuous
mode will force the App to connect via the cloud to your Roomba. [More info here](https://github.com/NickWaterton/Roomba980-Python#firmware-2xx-notes)
</p>

### Retrieving your credentials
Please refer to [here](https://github.com/NickWaterton/Roomba980-Python#how-to-get-your-usernameblid-and-password) or [here](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) to retrieve both the BLID (username) and the password.

### Exposed sensors
This component exposes several sensors:
- `battery`: The current battery level.
- `bin_full`: Whether the bin is currently full.
- `position`: The current position (coordinates) of your Roomba.
- `status`: The current state of the roomba (eg: charging).

The sensors will be named after your Roomba. So if you named your Roomba
"Nimbus", the `battery` sensor will be available at `sensor.nimbus_battery`.

### Exposed services
There are also three services:
- `roomba.clean`: Start a cleaning cycle.
- `roomba.dock`: Abort the current cleaning cycle and return to the base.
- `roomba.pause`: Pause the cleaning cycle.

