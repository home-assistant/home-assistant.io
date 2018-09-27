---
layout: page
title: "Honeywell evohome"
description: "Instructions on how to integrate Honeywell evohome devices with Home Assistant."
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

The `evohome` platform is the main component to set up and integrate all supported evohome devices.

It uses the [evohomeclient](https://pypi.org/project/evohomeclient/) client library and so will let you control (only) _EU-based_ [Honeywell Connect Comfort](https://international.mytotalconnectcomfort.com/Account/Login) systems.

Currently, only Controllers are supported; support for Heating zones and DHW controllers will be added at a later time.

It is related to the [honeywell](/components/climate.honeywell/) climate component, which allows limited integration with evohome Heating zones.  These two components should be usuable side-by-side, but YMMV.


## {% linkable_title Configuration %}

To use this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
evohome:
  - username: YOUR_USERNAME
    password: YOUR_PASSWORD
    location_idx: 0
```
This is a IoT cloud-polling device, and the `scan_interval` is currently fixed at 3 minutes.  Testing has indicated that this is a safe interval that - by itself - shouldn't cause you to be rate-limited by Honeywell.


### {% linkable_title Configuration variables %}

{% configuration %}
username:
  description: The username (email address) that has access to [Honeywell Connect Comfort](https://international.mytotalconnectcomfort.com/Account/Login) web site.
  required: true
  type: string
password:
  description: The password corresponding to the above username.
  required: true
  type: string
location_idx:
  description: Used to select which location to use, if your login has access to more than one location.  Multiple locations are not supported.
  required: false
  type: int
  default: 0
{% endconfiguration %}
