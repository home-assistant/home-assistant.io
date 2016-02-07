---
layout: page
title: "SABnzbd"
description: "Instructions how to integrate SABnzbd within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: sabnzbd.png
ha_category: Sensor
---


The `sabnzbd` platform will allow you to monitor your downloads with [SABnzbd](http://sabnzbd.org) from within Home Assistant and setup automation based on the information.

To use sabnzbd with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: sabnzbd
  name: SAB
  api_key: YOUR_API_KEY
  base_url: YOUR_SABNZBD_BASE_URL
  monitored_variables:
    - type: 'current_status'
    - type: 'speed'
    - type: 'queue_size'
    - type: 'queue_remaining'
    - type: 'disk_size'
    - type: 'disk_free'
```

Configuration variables:

- **base_url** (*Required*): This is the base URL of your SABnzbd instance including the port number if not running on 80, eg. http://192.168.1.32:8124/
- **api_key** (*Required*): Name that will be used in the frontend for the pin.
- **name** (*Optional*): The name to use when displaying this SABnzbd instance.
- **monitored_variables** (*Required*): Array of the monitored variables.
  - **type** (*Required*): Valid entries are: *'current_status'*, *'speed'*, *'queue_size'*, *'queue_remaining'*, *'disk_size'*, and *'disk_free'*

