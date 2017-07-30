---
layout: page
title: "Lutron Caseta"
description: "Instructions how to use Lutron Caseta devices with Home Assistant."
date: 2017-01-28 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Hub
featured: False
ha_release: 0.41
ha_iot_class: "Local Polling"
---

[Lutron](http://www.lutron.com/) is an American lighting control company. They have several lines of home automation devices that manage light switches/dimmers, occupancy sensors, HVAC controls, etc. The `lutron_caseta` component in Home Assistant is responsible for communicating with the Lutron SmartBridge for these systems.  Both 'pro' and 'standard' models are supported.

This component only supports the Caseta line of products. The current supported Caseta devices are:

- Dimmers as Home Assistant lights
- Wall switches as Home Assistant switches
- Scenes as Home Assistant scenes
- Serena shades (honeycomb and roller) as Home Assistant covers

When configured, the `lutron_caseta` component will automatically discover the currently support devices as setup in the Lutron SmartBridge.

To use Lutron Caseta devices in your installation, add the following to your `configuration.yaml` file using the IP of your lutron Smartbridge:

```yaml
# Example configuration.yaml entry
lutron_caseta:
    host: IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): The IP address of the Lutron SmartBridge.

<p class='note'>
It is recommended to assign a static IP address to your Lutron SmartBridge. This ensures that it won't change IP address, so you won't have to change the `host` if it reboots and comes up with a different IP address.
</p>
