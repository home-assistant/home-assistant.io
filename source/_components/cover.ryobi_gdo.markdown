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
ha_release: 0.71
ha_iot_class: "Cloud Polling"
---


The `ryobi_gdo` cover platform lets you control [Ryobi](https://www.ryobitools.com/gdo/) garage door opener through Home Assistant.

## {% linkable_title Setup %}

In order to be able to use your Ryobi garage door opener, you will have to get the DEVICE_ID_OF_YOUR_COVER (one for each garage door).

The DEVICE_ID_OF_YOUR_COVER can be retrieved using `curl`, simply use your username and password using the following example. Your `DEVICE_ID_OF_YOUR_COVER` will be `varName`:

```bash
$ curl -H "Content-Type: application/json" -X GET \
    -d '{"username":"RYOBIGDO_USERNAME","password":"RYOBIGDO_PASSWORD"}' \
    https://tti.tiwiconnect.com/api/devices
```

## {% linkable_title Configuration %}

To enable Ryobi covers in your installation, add the following to your `configuration.yaml` file:

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

{% configuration %}
username:
  description: Your RyobiGDO account username.
  required: true
  type: string
password:
  description: Your RyobiGDO account password.
  required: true
  type: string
device_id:
  description: List of your doors.
  required: true
  type: list
{% endconfiguration %}
