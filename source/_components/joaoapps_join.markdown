---
layout: page
title: "Joaoapps Join"
description: "Instructions for how to integrate the Join by Joaoapps service within Home Assistant."
date: 2016-07-12 10:49
sidebar: true
comments: false
sharing: true
footer: true
logo: joaoapps_join.png
ha_category: Hub
ha_release: "0.24"
---

The `joaoapps_join` component exposes services from
[Join](http://joaoapps.com/join). In Home Assistant, the Join features are
divided up in two locations, the Join component, and the Join notify platform.
The notify platform allows us to send messages to Join devices, the component
allows us to access the other special features that Join offers.

In the `configuration.yaml` file you need to provide the api key and device id
or name of the target device. You can find your device id and api key
[here](https://joinjoaomgcd.appspot.com/).

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: joaoapps_join
    api_key: asd97823jb628a34fwsdfwefd5384345tf2d
    device_id: d5asdfasdf54645h45h368761dfe5gt8a
    device_ids: d5asdfasdf54645h45h368761dfe5gt8a, a4asdfasdf54645h45h368761dfe5gt3b
    device_names: Pixel, iPhone
    name: Phones
joaoapps_join:
  - name: android
    device_id: group.android
    api_key: asd97823jb628a34fwsdfwefd5384345tf2d
```

{% configuration %}
api_key:
  description: The API key for Join.
  required: true
  type: string
device_id:
  description: The id of your device.
  required: false
  type: string
device_ids:
  description: Comma separated list of device ids.
  required: false
  type: list
device_names:
  description: Comma separated list of device names.
  required: false
  type: list
{% endconfiguration %}

The notify service has two optional parameters: `icon` and `vibration`.
You can use them like so:

```json
{
	"message": "Hello from Home Assistant!",
	"title": "Home Assistant",
	"data": {
		"icon": "https://goo.gl/xeetdy",
		"vibration": "0,65,706,86,657,95,668,100"
	}
}
```

The services exposed in the `joaoapps_join` component can be used with the
service data described below:

| Service                       | Data                                                               |
|------------------------------ |--------------------------------------------------------------------|
| joaoapps_join/ring            |                                                                    |
| joaoapps_join/send_sms        | `{"number":"5553334444", "message":"Hello!"}`                      |
| joaoapps_join/send_tasker     | `{"command":"test"}`                                               |
| joaoapps_join/send_url        | `{"url":"http://google.com"}`                                      |
| joaoapps_join/send_wallpaper  | `{"url":"http://www.planwallpaper.com/static/images/ZhGEqAP.jpg"}` |
| joaoapps_join/send_file       | `{"url":"http://download.thinkbroadband.com/5MB.zip"}`             |
