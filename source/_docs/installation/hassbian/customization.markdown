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

To allow you to customize your installation further, we have included a tool called `hassbian-config`. This tool comes with a set of packages that can easily be installed or upgraded for easier customization of your Home Assistant installation.
The tool is available by running `hassbian-config`. 

### Install scripts
To view the available packages run `hassbian-config show` and `sudo hassbian-config install PACKAGENAME`.
 - Install Hue. Configures the Python executable to allow usage of low numbered ports for use with Emulated Hue component thats used with Amazon Echo, Google Home and Mycroft.ai.
 - Install MariaDB. This script installs MariaDB and it's dependencies for use with the recorder component in Home Assistant. No database or database user is created during this setup and will need to be created manually.
 - Install Mosquitto MQTT server. Installs the latest Mosquitto package and client tools from the Mosquitto projects official repository. Now includes websocket support.
 - Install Libcec. Adds local [HDMI CEC support][cec]. *This scipt is currently brooken upstream since it currently doesn't build properly for Python >3.4*
 - Install Samba. Allows anyone on your network to edit your configuration from any computer. This share is unsecured and it's usage is not recommended if you share your network with others.
 - Install Tradfri. Installs dependencies for using IKEA Trådfri.
 - Install Duck DNS auto renewal. This script adds an cron job to auto update you the WAN IP address for the defined domain. Before running this script you should already have an Duck DNS account, during the installation you will be asked to supply your domain name and the token for your account.
 - Install an web terminal for easy access to ssh in an web browser. This script installs an web terminal called 'shellinabox' to you system that give you SSH access in you web browser.

#### Upgrade scripts
To view the available packages run `hassbian-config show` and `sudo hassbian-config upgrade PACKAGENAME`.
- Upgrade your Home Assistant installation.
- Upgrade your HASSbian installation.
- Upgrade HASSbian-scripts. 
- Upgrade HASSbian-scripts from dev branch. 

For more information about this tool have a look at the [hassbian-scripts repository][hassbian-repo].

[hassbian-repo]: https://github.com/home-assistant/hassbian-scripts
[cec]: /components/hdmi_cec/
