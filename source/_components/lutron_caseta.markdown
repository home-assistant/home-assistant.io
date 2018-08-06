---
layout: page
title: "Lutron Caseta"
description: "Instructions on how to use Lutron Caseta devices with Home Assistant."
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

When configured, the `lutron_caseta` component will automatically discover the currently supported devices as setup in the Lutron Smart Bridge. The name assigned in the Lutron mobile app will be used to form the `entity_id` used in Home Assistant. e.g., a dimmer called 'Bedroom Lamp' becomes `light.bedroom_lamp` in Home Assistant.

To use Lutron Caseta devices in your installation, you must first log in to your Lutron account and generate a certificate that allows Home Assistant to connect to your bridge. This can be accomplished by downloading and executing [this script](/assets/get_lutron_cert.zip), which will generate three files: caseta.key, caseta.crt, caseta-bridge.crt when you run it. See the instructions at the top of the script for more information.

Once you have the three necessary files, place them in your configuration directory and add the following to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
lutron_caseta:
    host: IP_ADDRESS
    keyfile: caseta.key
    certfile: caseta.crt
    ca_certs: caseta-bridge.crt
```

Configuration variables:

- **host** (*Required*): The IP address of the Lutron Smart Bridge.
- **keyfile** (*Required*): The private key that Home Assistant will use to authenticate to the bridge.
- **certfile** (*Required*): The certificate chain that Home Assistant will use to authenticate to the bridge.
- **ca_certs** (*Required*): The list of certificate authorities (usually only one) that Home Assistant will expect when connecting to the bridge.

<p class='note'>
It is recommended to assign a static IP address to your Lutron Smart Bridge. This ensures that it won't change IP address, so you won't have to change the `host` if it reboots and comes up with a different IP address.
<br>
Use a DHCP reservation on your router to reserve the address or in the PRO model of the Smart Bridge, set the IP address under Network Settings in the Advanced / Integration menu in the mobile app.
</p>
