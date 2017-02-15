---
layout: page
title: "Customization"
description: "Instructions to flash the Home Assistant HASSbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

To allow you to customize your installation further, we have included a set of Hassbian scripts.

  - Install Samba. Allows anyone on your network to edit your configuration from any computer. This share is unsecured and it's usage is not recommended if you share your network with others.
  - Install Libcec. Adds local [HDMI CEC support][cec].
  - Install Mossquitto MQTT server. Installs the latest Mosquitto package and client tools from the Mosquitto projects offical repository. Now includes websocket support.
  - Install Open Z-Wave. Installs Open Z-Wave and prepares for using a USB or GPIO ZWave controller.

All of these scripts are available in the directory `/home/pi/hassbian-scripts/`. For more information about these scripts have a look at the [hassbian-scripts repository][hassbian-repo].

[hassbian-repo]: https://github.com/home-assistant/hassbian-scripts#the-included-scripts
[cec]: /components/hdmi_cec/
