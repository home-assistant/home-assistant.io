---
layout: page
title: "Cisco Mobility Express"
description: "Instructions on how to integrate Cisco Mobility Express wireless controllers into Home Assistant."
date: 2019-02-27 11:59
sidebar: true
comments: false
sharing: true
footer: true
logo: cisco.png
ha_category: Presence Detection
ha_release: 0.89
---

This is a presence detection scanner for [Cisco](https://www.cisco.com) Mobility Express wireless controllers.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: cisco_mobility_express
    host: CONTROLLER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your controller, e.g., 192.168.10.150.
  required: true
  type: string
username:
  description: The username of an user with administrative privileges.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
