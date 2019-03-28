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
ha_category:
  - Hub
  - Notifications
ha_release: 0.24
redirect_from:
  - /components/notify.joaoapps_join/
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
    api_key: YOUR_API_KEY
    device_id: DEVICE_ID
    device_ids: DEVICE_ID_1, DEVICE_ID_2
    device_names: DEVICE_1_NAME, DEVICE_2_NAME
    name: NAME
joaoapps_join:
  - name: NAME_OF_GROUP
    device_id: GROUP.GROUP_NAME
    api_key: YOUR_API_KEY
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
  type: string
device_names:
  description: Comma separated list of device names.
  required: false
  type: string
{% endconfiguration %}

The notify service has two optional parameters: `icon`, `smallicon`, `image`, `sound`, `url`, `notification_id`, `tts`, `tts_language` and `vibration`.
You can use them like so:

```json
{
	"message": "Hello from Home Assistant!",
	"title": "Home Assistant",
	"data": {
		"icon": "https://goo.gl/xeetdy",
		"smallicon": "https://goo.gl/xeetdy",
		"vibration": "0,65,706,86,657,95,668,100",
		"image": "https://www.home-assistant.io/images/favicon-192x192-full.png",
		"sound": "https://goo.gl/asasde.mp3",
		"url": "https://home-assistant.io",
		"notification_id": "hass-notification",
		"tts": "Notification from Home Assistant",
		"tts_language": "english"
	}
}
```

The services exposed in the `joaoapps_join` component can be used with the
service data described below:

| Service                       | Data                                                              |
|------------------------------ |------------------------------------------------------------------ |
| joaoapps_join/ring            |                                                                   |
| joaoapps_join/send_sms        | `{"number":"5553334444", "message":"Hello!"}`                       |
| joaoapps_join/send_tasker     | `{"command":"test"}`                                                |
| joaoapps_join/send_url        | `{"url":"http://google.com"}`                                       |
| joaoapps_join/send_wallpaper  | `{"url":"http://www.planwallpaper.com/static/images/ZhGEqAP.jpg"}`  |
| joaoapps_join/send_file       | `{"url":"http://download.thinkbroadband.com/5MB.zip"}`              |
