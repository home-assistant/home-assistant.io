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


The Join platform exposes services from [Join](http://joaoapps.com/join). In Home Assistant, the Join features are divided up in two locations, the Join component, and the Join notify platform. The notify platform allows us to send messages to Join devices, the the component allows us to access the other special features that Join offers.

In the `configuration.yaml` file you need to provide the device id of the target device. If you want to send to a group of devices, you need to provide an api key.  You can find you device id and api key [here](https://joinjoaomgcd.appspot.com/). 

To set it up, add the following information to your `configuration.yaml` file:

```yaml
notify:
  - platform: joaoapps_join
    device_id: d5asdfasdf54645h45h368761dfe5gt8a
    name: droid                                       *optional
    api_key: asd97823jb628a34fwsdfwefd5384345tf2d     *optional

joaoapps_join:
  - name: android
    device_id: group.android
    api_key: asd97823jb628a34fwsdfwefd5384345tf2d
```

Configuration variables:

- **device_id** (*Required*): The Id of your device.
- **api_key** (*Required*): The API key for Join.

The notify service has a few optional parameters such as icon and small icon.  You can use them like so:

```json
{"message":"Hello!","title":"From Hass","data":{"icon":"https://goo.gl/KVqcYi","smallicon":"http://goo.gl/AU4Wf1"}}
```

The services exposed in the joaoapps_join component can be used with the service data described below:

| Service                      	| Data                                                             	|
|------------------------------	|------------------------------------------------------------------	|
| joaoapps_join/ring           	|                                                                  	|
| joaoapps_join/send_sms       	| {"number":"5553334444", "message":"Hello!"}                      	|
| joaoapps_join/send_tasker    	| {"command":"test"}                                               	|
| joaoapps_join/send_url       	| {"url":"http://google.com"}                                      	|
| joaoapps_join/send_wallpaper 	| {"url":"http://www.planwallpaper.com/static/images/ZhGEqAP.jpg"} 	|
| joaoapps_join/send_file      	| {"url":"http://download.thinkbroadband.com/5MB.zip"}             	|

