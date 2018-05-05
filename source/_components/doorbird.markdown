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
  devices:
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      hass_url_override: HASS_IP
      name: Front Door
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      hass_url_override: HASS_IP
      name: Driveway Gate
```

Device Configuration Variables:

- **host** (*Required*): The LAN IP address or hostname of your device. You can find this by going to the [DoorBird Online check](http://www.doorbird.com/checkonline) and entering the information from the paper that was included in the box.
- **username** (*Required*): The username of a non-administrator user account on the device.
- **password** (*Required*): The password for the user specified.
- **name** (*Optional*): Custom name for this device.
- **hass_url_override** (*Optional*): If your DoorBird cannot connect to the machine running Home Assistant because you are using dynamic DNS or some other HTTP configuration (such as HTTPS), specify the LAN IP of the machine here to force a LAN connection.

The configuration above is used by the other components and does nothing on its own.  You must also enable one of the following DoorBird components:
- [Binary Sensor](../binary_sensor.doorbird) - Track motion and doorbell events
- [Camera](../camera.doorbird) - View live and historical event based images
- [Switch](../switch.doorbird) - Enable control of relays and camera night vision