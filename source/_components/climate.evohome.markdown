---
layout: page
title: "Honeywell evohome Controller"
description: "Instructions on how to setup the Honeywell evohome component in Home Assistant."
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

It uses the [evohomeclient](https://pypi.org/project/evohomeclient/) client library. Currently, Heating zones and DHW controllers are not supported (they will be added at a later time).

## {% linkable_title Configuration %}

To use this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
evohome:
  - username: YOUR_USERNAME
    password: YOUR_PASSWORD
    scan_interval: 300
```
<p class='note'>
Having a scan_interval to short may result in too-frequent polling and cause you to rate-limited by Honeywell.
</p>

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
scan_interval:
  description: How often the web site is polled for data, in seconds. It is rounded up to nearest minute, and the minimum value is 180.  The recommended value is 300.
  required: false
  type: int
  default: 180
{% endconfiguration %}
