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
ha_release: 0.82
---

The [Fibaro](http://fibaro.com) hub is a controller mainly connecting to Z-Wave devices.

Switches, Lights (inc Dimmers), Locks, Sensors, Binary sensors, Coverss are supported - and will be automatically added when HA connects to your Fibaro controller.

## {% linkable_title Configuration %}

To use Fibaro devices in your installation, add the following to your configuration.yaml file using the IP and port number of your Fibaro controller:

```yaml
fibaro:
  url: http://192.168.1.161/api/
  username: your_username
  password: your_password
```

{% configuration %}
url:
  description: The URL for your Fibaro device.
  required: true
  type: string
{% endconfiguration %}

<p class='note'>
  It is recommended to assign a static IP address to your Fibaro Controller. This ensures that it won't change IP addresses, so you won't have to change the `url` if it reboots and comes up with a different IP address. See your router's manual for details on how to set this up. If you need the MAC address of your Fibaro, check the label on the bottom.
</p>

### {% linkable_title Configure devices %}


### {% linkable_title Using Z-Wave devices in automation %}

If you want to use a Z-Wave device from the Fibaro controller in Home Assistant automation, you'll need the entity id. In the Home Assistant UI you'll find all entities listed under the <img src='/images/screenshots/developer-tool-states-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> icon of the Developer Tools section. Look for entities that contain 'Fibaro Device Id' in their attributes, and you'll find the entity id on the left.
