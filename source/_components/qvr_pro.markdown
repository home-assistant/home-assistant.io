---
layout: page
title: "QVR Pro"
description: "Instructions on how to integrate QVR Pro within Home Assistant."
date: 2020-01-25 21:30
sidebar: true
comments: false
sharing: true
footer: true
logo: qvr_pro.png
ha_category: Camera
ha_release: 0.105
---

The `qvr_pro` component allows you to view your QVR Pro
channels in Home Assistant.

Currently only cameras are supported by this integration.

## {% linkable_title Configuration %}

To enable QVR Pro integration, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
qvr_pro:
  host: 192.168.1.102
  username: pyqvruser
  password: password
  exclude_channels: 2,5,6
  
camera:
  - platform: qvr_pro
```

{% configuration %}
host:
  description: The ip address where QVR Pro is accessible.
  required: true
  type: string
username:
  description: The username for accessing your Ring account.
  required: true
  type: string
password:
  description: The password for accessing your Ring account.
  required: true
  type: string
exclude_channels:
  description: Comma separated list of channel numbers to be excluded.
  required: false
  type: list
{% endconfiguration %}

Enabling the QVR Pro camera platform will add all QVR Pro channels by
default. Please see `exclude_channels` if you would like to exclude
specific channels from showing up in Home Assistant.

<p class="note warning">
The QVR Pro user must have Surveillance Management permission.
</p>
