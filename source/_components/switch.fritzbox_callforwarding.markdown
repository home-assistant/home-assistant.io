---
layout: page
title: "AVM FRITZ!Box Callforwarding Switch"
description: "Instructions on how to control the callforwarding of your AVM FRITZ!Box with Home Assistant."
date: 2017-07-16 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: 0.50
---


The `fritzbox_callforwarding` switch platform allows you to monitor and toggle the callforwardings of your FRITZ!Box via Home Assistant.

Supported devices (tested):

- FRITZ!Box 7490

Supported Firmwares (tested):

- FRITZ!OS: 06.83

To use AVM FRITZ!Box callforwarding switch(es) in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: fritzbox_callforwarding
    password: YOUR_PASSWORD
```

Configuration variables:

- **password** (*Required*): The password for your Fritz!Box.
- **username** (*Optional*): The username for your Fritz!Box. Defaults to `admin`
- **host** (*Optional*): The IP address/hostname of your Fritz!Box. Defaults to `169.254.1.1`.
