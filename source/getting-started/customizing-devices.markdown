---
layout: page
title: "Customizing devices and services"
description: "Simple customization for devices and services in the frontend."
date: 2016-04-20 06:00
sidebar: true
comments: false
sharing: true
footer: true
---
 
By default, all of your devices will be visible and have a default icon determined by their domain. You can customize the look and feel of your front 
page by altering some of these parameters. This can be done by adding the following configuration inside the `homeassistant:` section.

Devices that you don't want to have visible can be hidden with `hidden`.  
`entity_picture`entries, badges, `device_tracker` pictures, etc. can either be external URLs (e.g. `http://example.com/example.jpg`) or 
of the form `/local/filename.jpg`, where `/local` represents the directory `www` in the HASS configuration directory. 
You may have to create the `www` directory yourself as it is not made automatically.

You can also use `icon` and refer to any icon from [MaterialDesignIcons.com](http://MaterialDesignIcons.com).

```yaml
# Example configuration.yaml entry
homeassistant:

  # Add this to your existing configuration
  # Only the `entity_id` is required.  All other options are optional.
  customize:
    sensor.living_room_motion:
      hidden: true
    thermostat.family_roomfamily_room:
      entity_picture: https://dl.dropboxusercontent.com/u/12345/images/nest.jpg
      friendly_name: Nest
    switch.wemo_switch_1:
      friendly_name: Toaster
      entity_picture: /local/toaster.jpg
    switch.wemo_switch_2:
      friendly_name: Kitchen kettle
      icon: mdi:kettle
```

### [Next step: Setting up presence detection &raquo;](/getting-started/presence-detection/)
