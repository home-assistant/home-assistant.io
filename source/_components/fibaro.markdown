---
layout: page
title: "Fibaro"
description: "Instructions on how to setup Fibaro Z-Wave hubs (HCL and HC2) and configure devices within Home Assistant."
date: 2018-11-14 20:04
sidebar: true
comments: false
sharing: true
footer: true
logo: fibaro.png
ha_category: Hub
ha_release: 0.83
ha_iot_class: "Local Push"
redirect_from:
 - /components/scene.fibaro/
---

The [Fibaro](http://fibaro.com) hub is a controller mainly connecting to Z-Wave devices.

Binary sensors, switches, lights (including Dimmers), locks, sensors and covers are supported and will be automatically added when Home Assistant connects to your Fibaro controller.

## {% linkable_title Configuration %}

To use Fibaro devices in your installation, add the following to your `configuration.yaml` file using the IP and port number of your Fibaro controller:

```yaml
fibaro:
  url: http://192.168.1.161/api/
  username: your_username
  password: your_password
```

{% configuration %}
url:
  description: The URL for your Fibaro HomeCenter device.
  required: true
  type: url
username:
  description: The username for your Fibaro account.
  required: true
  type: string
password:
  description: The password for your Fibaro account.
  required: true
  type: string
plugins:
  description: Whether to import plugin-generated devices from Fibaro HomeCenter, such as Netatmo and Sonos devices, etc.
  required: false
  type: bool
  default: false
{% endconfiguration %}

<p class='note'>
  It is recommended to assign a static IP address to your Fibaro controller. This ensures that it won't change its IP address, so you won't have to change the `url` if the controller reboots and comes up with a different IP address. See your router's manual for details on how to set this up. If you need the MAC address of your Fibaro, check the label on the bottom.
</p>

### {% linkable_title Using Z-Wave devices in automation %}

If you want to use a Z-Wave device from the Fibaro controller in Home Assistant automation, you'll need the entity id. In the Home Assistant UI you'll find all entities listed under the <img src='/images/screenshots/developer-tool-states-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> icon of the Developer Tools section. Look for entities that contain 'fibaro_id' in their attributes, and you'll find the entity id on the left.
