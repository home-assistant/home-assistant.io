---
layout: page
title: "mFi Switch"
description: "Instructions on how to integrate mFi switches within Home Assistant."
date: 2016-02-07 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ubiquiti.png
ha_category: Switch
ha_iot_class: "Local Polling"
---


The `mfi` switch platform to allow you to control [mFi Controllable Power Outlets](https://www.ubnt.com/mfi/mpower/).

## {% linkable_title Configuration %}

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mfi
    host: IP_ADDRESS_OF_SWITCH
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of your mFi controller.
- **port** (*Optional*): The port of your mFi controller. Defaults to 6443.
- **username** (*Required*): The mFi admin username.
- **password** (*Required*): The mFi admin user's password.
- **ssl** (*Optional*): If `True`, use SSL/TLS to contact the mFi controller. Defaults to `True`.
- **verify_ssl** (*Optional*): Set this to `False` if your mFi controller has a self-signed certificate. Defaults to `True`.
