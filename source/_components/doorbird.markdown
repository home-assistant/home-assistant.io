---
layout: page
title: "DoorBird"
description: "Instructions on how to integrate your DoorBird video doorbell with Home Assistant."
date: 2017-08-06 11:30
sidebar: true
comments: false
sharing: true
footer: true
logo: doorbird.png
ha_category: Hub
ha_release: "0.54"
ha_iot_class: "Local Polling"
---

The `doorbird` implementation allows you to integrate your [DoorBird](http://www.doorbird.com/) device in Home Assistant.

To connect your device, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
doorbird:
  host: IP_OR_HOSTNAME
  username: abcdef0001
  password: xxxxxxxxxx
```

Configuration variables:

- **host** (*Required*): The LAN IP address or hostname of your device. You can find this by going to the [DoorBird Online check](http://www.doorbird.com/checkonline) and entering the information from the paper that was included in the box.
- **username** (*Required*): The username of a non-administrator user account on the device.
- **password** (*Required*): The password for the user specified.
