---
layout: page
title: "Lutron"
description: "Instructions how to use Lutron devices with Home Assistant."
date: 2017-01-28 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Hub
featured: False
ha_release: 0.37
---

[Lutron](http://www.lutron.com/) is an American lighting control company. They have several lines of home automation devices that manage light switches/dimmers, occupancy sensors, HVAC controls, etc. The `lutron` component in Home Assistant is responsible for communicating with the main hub for these systems.

Presently, there's only support for communicating with the [RadioRA 2](http://www.lutron.com/en-US/Products/Pages/WholeHomeSystems/RadioRA2/Overview.aspx) Main Repeater and only handle light switches and dimmers.

When configured, the `lutron` component will automatically discover the rooms and their associated switches/dimmers as configured by the RadioRA 2 software from Lutron. Each room will be treated as a separate group.

To use Lutron RadioRA 2 devices in your installation, add the following to your configuration.yaml file using the IP of your RadioRA 2 Main Repeater:

``` yaml
lutron:
  lutron_host: <ip>
  lutron_user: lutron
  lutron_password: integration
```

Configuration variables:

- **lutron_ip** (*Required*): The IP address of the Main Repeater.
- **lutron_user** (*Required*): The login name of the user. The user `lutron` always exists, but other users can be added via RadioRA 2 software.
- **lutron_password** (*Required*): The password for the user specified above. `integration` is the password for the always-present `lutron` user.

<p class='note'>
  It is recommended to assign a static IP address to your Main Repeater. This ensures that it won't change IP addresses, so you won't have to change the `lutron_ip` if it reboots and comes up with a different IP address.
</p>
