---
layout: page
title: "Honeywell evohome/TCC systems"
description: "Instructions on how to integrate a Honeywell evohome/TCC system with Home Assistant."
date: 2018-09-25 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category: Hub
ha_release: 0.80
ha_iot_class: "Cloud Polling"
---

The `evohome` component is the main component to set up and integrate all _non-US_ [Honeywell Total Connect Comfort (TCC)](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW systems, primarily the Honeywell evohome multi-zone CH/DHW system.  It does not support the home security functionality of TCC.

It uses v2 of the [evohome-client](https://github.com/watchforstock/evohome-client) client library and so will let you control (only) EU/international systems. It _does not_ leverage the [somecomfort](https://github.com/kk7ds/somecomfort) client library as used by US-based systems; for those, you may find what you need at the [honeywell climate platform](/components/climate.honeywell/).

Currently, only Controllers and Heating zones are supported; support for DHW controllers will be added at a later time. More information is available on the [evohome climate platform](/components/climate.evohome/) page.

## {% linkable_title Configuration %}

To use this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
evohome:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username (email address) that has access to [Honeywell TCC](https://international.mytotalconnectcomfort.com/Account/Login) web site.
  required: true
  type: string
password:
  description: The password corresponding to the above username.
  required: true
  type: string
location_idx:
  description: Used to select which location to use, if your login has access to more than one location. Multiple locations at one time are not supported.
  required: false
  type: int
  default: 0
scan_interval:
  description: How often updates are retreived from Honeywell's web servers. The minimum value is 180 seconds, rounded up to the nearest minute.
  required: false
  type: int
  default: 300
{% endconfiguration %}

This is an IoT cloud-polling device, and the recommended minimum `scan_interval` is 300 seconds. Testing has indicated that this is a safe interval that - by itself - shouldn't cause you to be rate-limited by Honeywell.

