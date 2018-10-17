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

{% configuration %}
host:
  description: The IP address or hostname of your mFi controller.
  required: true
  type: string
port:
  description: The port of your mFi controller.
  required: false
  default: 6443
  type: integer
username:
  description: The mFi admin username.
  required: true
  type: string
password:
  description: The mFi admin password.
  required: true
  type: string
ssl:
  description: If `true`, use SSL/TLS to contact the mFi controller.
  required: false
  default: true
  type: boolean
verify_ssl:
  description: Set this to `false` if your mFi controller has a self-signed certificate.
  required: false
  default: true
  type: boolean
{% endconfiguration %}
