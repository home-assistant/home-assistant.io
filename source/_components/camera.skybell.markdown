---
layout: page
title: "Skybell Camera"
description: "Instructions on how to integrate your Skybell HD devices within Home Assistant."
date: 2017-10-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: skybell.png
ha_category: Camera
ha_release: 0.56
ha_iot_class: "Cloud Polling"
---

To get your [Skybell.com](https://www.skybell.com/) cameras working within Home Assistant, please follow the instructions for the general [Skybell component](/components/skybell).

## {% linkable_title Configuration %}

Once you have enabled the [Skybell component](/components/skybell), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: skybell
```

{% configuration %}
monitored_conditions:
  description: The camera images to display. Default is `avatar`. The full list is `avatar`, `activity`.
  required: false
  type: list
avatar_name:
  description: Name to append to the device name for the avatar image. Default is empty string.
  required: false
  type: string
activity_name:
  description: Name to append to the device name for the last activity image. Default is empty string.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Camera Types %}

There are two available camera types "Avatar", which is the default, displays the Skybell avatar image.
It is periodically updated with a fresh image. The other type is "Activity", which displays a snapshot from
the latest event (motion, bell, or on demand) captured by the camera. You may show either camera, or both, by
specifying its name under monitored_condtions. It's recommended, but not required, to set either avatar_name or activity_name
if you are showing both cameras so you can tell them apart. The name will be appended to the skybell device name.


```yaml
# Example configuration.yaml with both images
camera:
  - platform: skybell
    monitored_conditions:
    - avatar
    - activity
    activity_name: "Last Activity"
```

```yaml
# Example configuration.yaml with just last activity image
camera:
  - platform: skybell
    monitored_conditions:
    - activity
```