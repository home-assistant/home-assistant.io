---
layout: page
title: "pyLoad Sensor"
description: "Instructions how to integrate pyLoad download sensor within Home Assistant."
date: 2017-10-23 9:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pyload.png
ha_category: Downloading
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---


The `pyload` platform allows you to monitor your downloads with [pyLoad](https://pyload.net/) from within Home Assistant and setup automation based on the information.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pyload
    host: IP_ADDRESS
    port: PORT
    username: USERNAME
    password: PASSWORD
```

Configuration variables:

- **host** (*Required*): This is the IP address of your pyLoad download manager, eg. 192.168.0.100.
- **port** (*Optional*): The port your pyLoad interface uses, defaults to 8000.
- **name** (*Optional*): The name to use when displaying this pyLoad instance.
- **username** (*Optional*): Your pyLoad username.
- **password** (*Optional*): Your pyLoad password.


If everything is setup correctly, the download speed will show up in the frontend.

<p class='img'>
  <img src='{{site_root}}/images/components/pyload/pyload_speed.png' />
</p>
