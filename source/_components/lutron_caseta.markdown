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

[Lutron](http://www.lutron.com/) is an American lighting control company. They have several lines of home automation devices that manage light switches, dimmers, occupancy sensors, HVAC controls, etc. The `lutron_caseta` component in Home Assistant is responsible for communicating with the Lutron Caseta Smart Bridge for the [Caseta](http://www.casetawireless.com) product line of dimmers, switches and shades.

This component only supports the [Caseta](http://www.casetawireless.com) line of products. Both Smart Bridge (L-BDG2-WH) and Smart Bridge PRO (L-BDGPRO2-WH) models are supported. For the RadioRA 2 product line, see the [Lutron component](/components/lutron/).

The currently supported Caseta devices are:

- Wall and plug-in dimmers as Home Assistant [lights](/components/light.lutron_caseta/)
- Wall switches as Home Assistant [switches](/components/switch.lutron_caseta/)
- Scenes as Home Assistant [scenes](/components/scene.lutron_caseta/)
- Lutron shades as Home Assistant [covers](/components/cover.lutron_caseta/)

When configured, the `lutron_caseta` component will automatically discover the currently supported devices as setup in the Lutron Smart Bridge. The name assigned in the Lutron mobile app will be used to form the `entity_id` used in Home Assistant. e.g. a dimmer called 'Bedroom Lamp' becomes `light.bedroom_lamp` in Home Assistant.

To use Lutron Caseta devices in your installation, add the following to your `configuration.yaml` file using the IP of your Smart Bridge:

```yaml
# Example configuration.yaml entry
lutron_caseta:
    host: IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): The IP address of the Lutron Smart Bridge.

<p class='note'>
It is recommended to assign a static IP address to your Lutron Smart Bridge. This ensures that it won't change IP address, so you won't have to change the `host` if it reboots and comes up with a different IP address.
<br>
Use a DHCP reservation on your router to reserve the address or in the PRO model of the Smart Bridge, set the IP address under Network Settings in the Advanced / Integration menu in the mobile app.
</p>
