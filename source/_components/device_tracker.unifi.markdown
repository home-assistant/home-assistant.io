---
layout: page
title: "Ubiquiti Unifi WAP"
description: "Instructions how to use a Unifi WAP controller as a device tracker module."
date: 2016-02-19 20:59
sidebar: true
comments: false
sharing: true
footer: true
logo: ubiquiti.png
ha_category: Presence Detection
---


This platform allows you to detect presence by looking at connected devices to a [Ubiquiti](http://ubnt.com/) [Unifi](https://www.ubnt.com/enterprise/#unifi) controller.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: unifi
  host: CONTROLLER
  port: PORT
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Optional*): The hostname or IP address of your controller. Defaults to localhost.
- **port** (*Optional*): The port of your controller's web interface. Defaults to 8443.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
