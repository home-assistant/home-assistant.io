---
layout: page
title: "Honeywell evohome CH/DHW Controller"
description: "Instructions on how to integrate a Honeywell evohome controllers within Home Assistant."
date: 2018-09-10 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category: Climate
ha_release: TBA (post 0.78)
ha_iot_class: "Cloud Polling" 
---

The `evohome` climate platform lets you control EU-based [Honeywell Connect Comfort](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW controllers from Home Assistant.  

It uses the [evohomeclient](https://pypi.org/project/evohomeclient/) client library.  Currently, Heating zones, and DHW controllers are not supported (they will be added at a later time).

To set it up, add the following information to your `configuration.yaml` file:

```yaml
evohome:
  - username: YOUR_USERNAME
    password: YOUR_PASSWORD
```
Configuration variables:

- **username** (*Required*): The username (email address).
- **password** (*Required*): The password.
- **location_idx** (*Optional*): The location to use if the account hass access to more than one location.  You cannot have multiple locations active at the one time.
