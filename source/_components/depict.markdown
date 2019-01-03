---
layout: page
title: "Depict"
description: "Instructions on how to integrate your Depict Art Frame within Home Assistant."
date: 2019-01-02 19:45
sidebar: true
comments: false
sharing: true
footer: true
logo: depict.png
ha_category: Hub
featured: false
ha_release: 0.85
ha_iot_class: "Local Polling"
---

The [Depict](https://depict.com/) integration for Home Assistant allows you to observe and control your Depict art frame.

Each frame appears in Home Assistant as a Light and a Media Player.

The light can be used to sleep/wake the frame or adjust the brightness and contrast of the screen.

The media player can be used to sleep/wake the frame or set which image is displayed.

There are two ways to configure this component. For the automatic discovery of your frame(s), simply add the following to your `configuration.yaml`:

```yaml
# This will auto-detect all Depict frames on your local network.
depict:
```

Auto-detection can be a little slow, so if your frame has a fixed IP address or hostname, you may add a list of frames in your `configuration.yaml`. For example:

```yaml
# This will skip auto-detection and add only the listed tables
depict:
  - name: 'FRAME_NAME'
    host: 'FRAME_IP_OR_HOSTNAME'
  - name: 'ANOTHER_FRAME_NAME'
    host: 'ANOTHER_FRAME_IP_OR_HOSTNAME'
```

{% configuration %}
name:
  description: The name by which the frame should appear in Home Assistant
  required: true
  type: string
host:
  description: The hostname or IP address of the frame
  required: true
  type: string
{% endconfiguration %}

## {% linkable_title Services %}

### {% linkable_title Service `set_contrast` %}

Sets the display contrast of a frame.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that are `entity_id`s of Depict Frame light entities. |
| `value` | no | Integer contrast value (0-255) |
