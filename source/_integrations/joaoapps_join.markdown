---
title: Joaoapps Join
description: Instructions for how to integrate the Join by Joaoapps service within Home Assistant.
ha_category:
  - Hub
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.24
ha_domain: joaoapps_join
ha_platforms:
  - notify
ha_integration_type: integration
---

The `joaoapps_join` integration exposes services from
[Join](https://joaoapps.com/join). In Home Assistant, the Join features are
divided up in two locations, the Join component, and the Join notify platform.
The notify platform allows us to send messages to Join devices, the component
allows us to access the other special features that Join offers. When in doubt, you can reference the [API documentation](https://joaoapps.com/join/api/) this is based on.

In the `configuration.yaml` file you need to provide the API key and device id
or name of the target device. You can find your device id and API key
[here](https://joinjoaomgcd.appspot.com/).

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: joaoapps_join
    api_key: YOUR_API_KEY
    device_id: DEVICE_ID
    device_ids: DEVICE_ID_1,DEVICE_ID_2
    device_names: DEVICE_1_NAME,DEVICE_2_NAME
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
  description: The id of your device or group
  required: false
  type: string
device_ids:
  description: Comma separated list of device ids or groups.
  required: false
  type: string
device_names:
  description: Comma separated list of device names.
  required: false
  type: string
name:
  description: The name parameter is optional but needed if you want to use multiple notification platforms.  The platform will be exposed as service `notify.<name>`. The name will default to `notify` if not supplied. See the [Notifications Component](/integrations/notify) for more details.
  required: false
  type: string
{% endconfiguration %}

Use only one of `device_id`, `device_ids`, or `device_names`, this will determine the notification recipient(s).

```yaml
# Example configuration.yaml entry
notify:
  - platform: joaoapps_join
    api_key: YOUR_API_KEY
    device_id: DEVICE_ID1
    name: NAME1
  - platform: joaoapps_join
    api_key: YOUR_API_KEY
    device_id: DEVICE_ID2
    name: NAME2
```

The notify service has several optional parameters: `icon`, `smallicon`, `image`, `sound`, `url`, `notification_id`, `category`, `tts`, `tts_language` and `vibration`.
You can use them like so:

```yaml
message: Hello from Home Assistant!
title: Home Assistant
data:
  icon: https://goo.gl/xeetdy
  smallicon: https://goo.gl/xeetdy
  vibration: 0,65,706,86,657,95,668,100
  image: https://www.home-assistant.io/images/favicon-192x192-full.png
  sound: https://goo.gl/asasde.mp3
  url: https://home-assistant.io
  notification_id: hass-notification
  category: Custom Notification Category
  tts: Notification from Home Assistant
  tts_language: english
  actions:
    Netflix:
    Tweet:
      - Tweet from HASS!
    Sleep:
```

The services exposed in the `joaoapps_join` integration can be used with the
service data described below:

| Service                       | Data                                                              |
|------------------------------ |------------------------------------------------------------------ |
| joaoapps_join/ring            |                                                                   |
| joaoapps_join/send_sms        | `{"number":"5553334444", "message":"Hello!"}`                       |
| joaoapps_join/send_tasker     | `{"command":"test"}`                                                |
| joaoapps_join/send_url        | `{"url":"http://google.com"}`                                       |
| joaoapps_join/send_wallpaper  | `{"url":"http://www.planwallpaper.com/static/images/ZhGEqAP.jpg"}`  |
| joaoapps_join/send_file       | `{"url":"http://download.thinkbroadband.com/5MB.zip"}`              |
