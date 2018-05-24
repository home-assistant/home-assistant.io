---
layout: page
title: "Ryobi GDO Cover"
description: "Instructions on how to integrate Ryobi Garage Door Opener (RyobiGDO) within Home Assistant."
date: 2018-04-22 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ryobi.png
ha_category: Cover
ha_release: 0.68
ha_iot_class: "Cloud Polling"
---


The `ryobi_gdo` cover platform lets you control [Ryobi](https://www.ryobitools.com/gdo/) garage door opener through Home Assistant.

## {% linkable_title Configuration %}

To enable Ryobi_gdo in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: ryobi_gdo
    username: RYOBIGDO_USERNAME
    password: RYOBIGDO_PASSWORD
    device_id:
      - DEVICE_ID_OF_YOUR_COVER#1
      - DEVICE_ID_OF_YOUR_COVER#2
```

Configuration variables:

- **username** (*Required*): Your RyobiGDO account username.
- **password** (*Required*): Your RyobiGDO account password.
- **device_id** array (*Required*): List of your doors.
  - **device** (*Required*): This is the device id from Ryobi (see under for details).

## {% linkable_title Device ID %}

In order to be able to use your Ryobi garage door opener you will have to get the DEVICE_ID_OF_YOUR_COVER (one for each garage door).

The DEVICE_ID_OF_YOUR_COVER can be retrieved using curl, simply use your username and password using the following example. Your DEVICE_ID_OF_YOUR_COVER will be varName:
```text
curl -H "Content-Type: application/json" -X GET -d '{"username":"RYOBIGDO_USERNAME","password":"RYOBIGDO_PASSWORD"}' https://tti.tiwiconnect.com/api/devices
```
