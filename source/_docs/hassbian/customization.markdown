---
layout: page
title: "Customization"
description: "Instructions to flash the Home Assistant HASSbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/hassbian-customization/
---

To allow you to customize your installation further, we have included a tool called `hassbian-config`. This tool comes with a set of packages that can easily be installed for easier customization of your Home Assistant installation.

  - Install Samba. Allows anyone on your network to edit your configuration from any computer. This share is unsecured and it's usage is not recommended if you share your network with others.
  - Install Libcec. Adds local [HDMI CEC support][cec].
  - Install Mosquitto MQTT server. Installs the latest Mosquitto package and client tools from the Mosquitto projects offical repository. Now includes websocket support.
  - Install Open Z-Wave. Installs Open Z-Wave and prepares for using a USB or GPIO ZWave controller.
  - Install Hue. hue: Configures the Python executable to allow usage of low numbered ports for use with Emulated Hue component thats used with Amazon Echo, Google Home and Mycroft.ai.
  - Install Tellstick. Installs the Tellstick package for controling and using a connected Tellstick.

The tool is available by running `hassbian-config`. To view the available packages run `hassbian-config show` and `sudo hassbian-config install PACKAGENAME`.
For more information about this tool have a look at the [hassbian-scripts repository][hassbian-repo].

[hassbian-repo]: https://github.com/home-assistant/hassbian-scripts
[cec]: /components/hdmi_cec/
