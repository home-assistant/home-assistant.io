---
layout: page
title: "Vera"
description: "Instructions how to setup Vera hubs within Home Assistant."
date: 2015-03-23 20:04
sidebar: true
comments: false
sharing: true
footer: true
logo: vera.png
ha_category: Hub
ha_release: pre 0.7
---

The [Vera](http://getvera.com) hub is a controller mainly connecting to Z-Wave devices.

Switches, Lights (inc Dimmers), Locks, Sensors and Binary sensors are supported - and will be automatically added when HA connects to your Vera controller.

To use  Vera devices in your installation, add the following to your configuration.yaml file using the IP and port number of your Vera controller:

```yaml
vera:
  vera_controller_url: http://192.168.1.161:3480/
```

Configuration variables:

- **vera_controller_url** (*Required*): The URL for your Vera device.

<p class='note'>
  It is recommended to assign a static IP address to your Vera Controller. This ensures that it won't change IP addresses, so you won't have to change the `vera_controller_url` if it reboots and comes up with a different IP address. See your router's manual for details on how to set this up. If you need the MAC address of your Vera, check the label on the bottom.
</p>

By default your switches will be added to Home Assistant as switches, however if some of them are light switches, you can tell Home Assistant this using the optional `lights` parameter as shown below.

Vera imports detailed zwave devices into Home Assistant. This can include system devices and other devices that you don't use, you can tell Home Assistant not to load these devices using the `exclude:` parameter as shown below.

You can find the vera device id either by looking at your vera controller or by checking the `Vera Device Id` attribute on each device imported into Home Assistant.

```yaml
vera:
  vera_controller_url: http://192.168.1.161:3480/
  # Optional to exclude devices - this is a list of vera device ids
  exclude: [ 13, 14, 16, 20, 23, 72, 73, 74, 75, 76, 77, 78, 88, 89, 99]
  # Optional to import switches as lights - this is a list of vera device ids
  lights: [15, 17, 19, 21, 22, 24, 26, 43, 64, 70, 87]
```

