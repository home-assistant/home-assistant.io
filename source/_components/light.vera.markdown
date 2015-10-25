---
layout: page
title: "Vera lights support"
description: "Instructions how to integrate Vera lights into Home Assistant."
date: 2015-10-20 21:00
sidebar: false
comments: false
sharing: true
footer: true
logo: vera.png
ha_category: Light
---

<img src='/images/supported_brands/vera.png' class='brand pull-right' />
This vera light platform allows you to control your [Vera](http://getvera.com/) lights.

This platform is useful if you wish for switches connected to your Vera controller to appear as lights in Home Assistant. All switches will be added as a light unless you exclude them in the configuration file.

To use your Vera lights in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  platform: vera
  vera_controller_url: http://YOUR_VERA_IP:3480/
  device_data:
    12:
      name: My awesome sensor
      exclude: true
    13:
      name: Another sensor
```

Configuration variables:

- **vera_controller_url** (*Required*): This is the base URL of your vera controller including the port number if not running on 80, eg. http://192.168.1.21:3480/
- **device_data** array (*Optional*):This contains an array additional device information for your Vera devices. It is not required and if not specified all sensors configured in your Vera controller will be added with default values. You should use the id of your Vera device as the key for the device within `device_data`.
  - **name** (*Optional*):This parameter allows you to override the name of your Vera device in the frontend, if not specified the value configured for the device in your Vera will be used.
  - **exclude** (*Optional*): This parameter allows you to exclude the specified device, it should be set to "True" if you want this device excluded.
