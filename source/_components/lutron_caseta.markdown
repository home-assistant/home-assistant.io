---
layout: page
title: "Lutron_Caseta"
description: "Instructions how to use Lutron_Caseta devices with Home Assistant."
date: 2017-01-28 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Hub
featured: False
ha_release: 0.40
---

[Lutron](http://www.lutron.com/) is an American lighting control company. They have several lines of home automation devices that manage light switches/dimmers, occupancy sensors, HVAC controls, etc. The `lutron_caseta` component in Home Assistant is responsible for communicating with the Lutron SmartBridge for these systems.

This component only supports the Caseta line of products.  Current only supports dimmers as Home Assistant lights.  

When configured, the `lutron_caseta` component will automatically discover dimmers as setup in the Lutron SmartBridge

To use Lutron Caseta devices in your installation, add the following to your configuration.yaml file using the IP of your lutron Smartbridge:

``` yaml
light:
  - platform: lutron_caseta
    host: <ip_address_of_your_smartbridge>
    user: lutron
    password: integration
```

Configuration variables:

- **host** (*Required*): The IP address of the Lutron SmartBridge.
- **user** (*Required*): The login name of the user. The user `lutron` always exists.
- **password** (*Required*): The password for the user specified above. `integration` is the password for the always-present `lutron` user.

<p class='note'>
  It is recommended to assign a static IP address to your Lutron SmartBridge. This ensures that it won't change IP addresses, so you won't have to change the `lutron_ip` if it reboots and comes up with a different IP address.
</p>
