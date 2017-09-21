---
layout: page
title: "Customization"
description: "Instructions to flash the Home Assistant HASSbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /docs/hassbian/customization/
---

To allow you to customize your installation further, we have included a tool called `hassbian-config`. This tool comes with a set of packages that can easily be installed for easier customization of your Home Assistant installation.

 - Install Hue. Configures the Python executable to allow usage of low numbered ports for use with Emulated Hue component thats used with Amazon Echo, Google Home and Mycroft.ai.
 - Install Mosquitto MQTT server. Installs the latest Mosquitto package and client tools from the Mosquitto projects official repository. Now includes websocket support.
 - Install Libcec. Adds local [HDMI CEC support][cec].
 - Install Open Z-Wave-pip. Installs Python Open Z-Wave from a pip package. This is the quickest and recommended way of installing Z-Wave support but does not OZWCP pre-installed.
 - Install Open Z-Wave. Installs Python Open Z-Wave and OZWCP from git.
 - Install Samba. Allows anyone on your network to edit your configuration from any computer. This share is unsecured and it's usage is not recommended if you share your network with others.
 - Install Tellstick. Installs the Tellstick package for controlling and using a connected Tellstick.
 - Install Tradfri. Installs dependencies for using IKEA Trådfri.

The tool is available by running `hassbian-config`. To view the available packages run `hassbian-config show` and `sudo hassbian-config install PACKAGENAME`.
For more information about this tool have a look at the [hassbian-scripts repository][hassbian-repo].

[hassbian-repo]: https://github.com/home-assistant/hassbian-scripts
[cec]: /components/hdmi_cec/
