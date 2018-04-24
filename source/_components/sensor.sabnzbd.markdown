---
layout: page
title: "SABnzbd"
description: "Instructions on how to integrate SABnzbd within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: sabnzbd.png
ha_category: Downloading
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---


The `sabnzbd` platform will allow you to monitor your downloads with [SABnzbd](http://sabnzbd.org) from within Home Assistant and setup automation based on the information.

If SABnzbd is discovered on your network you can enter your API Key in the Configurator Press "CONFIGURE" to do it.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/sabnzbd-configure.png' />
</p>

This will enable a minimal setup where `sensor.sabnzbd_status` is enabled.


For more advanced usage, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: sabnzbd
  host: YOUR_SABNZBD_HOST
  api_key: YOUR_API_KEY
  monitored_variables:
    - 'current_status'
    - 'speed'
    - 'queue_size'
    - 'queue_remaining'
    - 'disk_size'
    - 'disk_free'
    - 'queue_count'
```

Configuration variables:

- **host** (*Required*): The host where your SABnzbd instance is running, eg. 192.168.1.32
- **port** (*Optional*): The port to use with SABnzbd instance. Defaults to `8080`.
- **api_key** (*Required*): Name that will be used in the frontend for the pin.
- **name** (*Optional*): The name to use when displaying this SABnzbd instance.
- **ssl** (*Optional*): Use `https` instead of `http` to connect. Defaults to False.
- **monitored_variables** array (*Required*): List of the monitored variables.
  - **current_status**: Current status of the SABnzbd instance
  - **speed**: Current speed.
  - **queue_size**: Size of the queue
  - **queue_remaining**: Remaining elements in the queue
  - **disk_size**: Disk size of the storage location
  - **disk_free**: Free disk space at the storage location
  - **queue_count**: Number of items in the queue

Note that this will create the following sensors:

```
 - sensor.sabnzbd_status
 - sensor.sabnzbd_speed
 - sensor.sabnzbd_queue
 - sensor.sabnzbd_left
 - sensor.sabnzbd_disk
 - sensor.sabnzbd_disk_free
 - sensor.sabnzbd_queue_count
```

As always, you can determine the names of sensors by looking at the dev-state page `< >` in the web interface.
