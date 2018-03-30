---
layout: page
title: "BMW connected drive"
description: "Instructions on how to setup your BMW connected drive account with Home Assistant."
date: 2018-01-10 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bmw.png
ha_category: Hub
ha_release: 0.64
---

This component lets you retrieve data on your BMW vehicle from the BMW Connected Drive portal. You need to have a working BMW Connected Drive account and a Connected Drive enabled vehicle for this to work.

For compatibility with your BMW vehicle check the (bimmer_connected page)[https://github.com/ChristianKuehnel/bimmer_connected] on github.

To enable this component in your installation, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
bmw_connected_drive:
  name:
    username: USERNAME_BMW_CONNECTED_DRIVE
    password: PASSWORD_BMW_CONNECTED_DRIVE
    region: one of "north_america", "china" , "rest_of_world"
```

{% configuration %}
bmw_connected_drive:
  description: configuration
  required: true
  type: map
  keys:
    name:
      description: Name of your account in Home Assistant.
      required: true
      type: string
    username:
      description: Your BMW Connected Drive username.
      required: true
      type: string
    password:
      description: Your BMW Connected Drive password.
      required: true
      type: string
    region:
      description: "The region of your Connected Drive account. Please use of these values: `north_america`, `china`, `rest_of_world`"
      required: true
      type: string
{% endconfiguration %}

## {% linkable_title Services %}

The `bmw connected drive` component offers several services. In case you need to provide the vehicle identification number (VIN) as parameter, you can see the VIN in the attributes of the device tracker for the vehicle. The VIN is an 17 digit alphanumeric string, e.g. `WBANXXXXXX1234567`.

Using these services will impact the state of your vehicle. So use these services with care!

**Locking and unlocking**

The vehicle can be locked and unlocked via the lock component that is created automatically for each vehicle. Before invoking these services, make sure it's safe to lock/unlock the vehicle in the current situation.

**Air condition**

The air condition of the vehicle can be activated with the service `bmw_connected_drive.activate_air_conditioning`.

What exactly is started here depends on the type of vehicle. It might range from just ventilation over auxilary heating to real air conditioning. If your vehicle is equipped with an auxilary heating, only trigger this service if the vehicle is parked in a location where it is safe to use it (e.g. not in an underground parking). 

The vehicle is identified via the parameter `vin`.

**Sound the horn**

The service `bmw_connected_drive.sound_horn`sounds the horn of the vehicle. Use this feature responsibly, as it might annoy your neighbours. The vehicle is identified via the parameter `vin`. 

**Flash the lights**
Flash the lights of the vehicle. The vehicle is identified via the parameter `vin`.


## {% linkable_title Disclaimer %}

This software is not affiliated with or endorsed by BMW Group. 
