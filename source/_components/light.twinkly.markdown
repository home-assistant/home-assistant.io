---
layout: page
title: "Twinkly - Smart Decoration LED lights for Christmas"
description: "Instructions for how to integrate the LEDWORKS Twinkly within Home Assistant."
date: 2018-09-12 22:05
sidebar: true
comments: false
sharing: true
footer: true
logo: ledworks.png
ha_category: Light
ha_release: "0.85"
ha_iot_class: "Local Push"
---

The `twinkly` component allows you to integrate LEDWORKS [Twinkly](https://www.twinkly.com/) devices into Home Assistant.

### {% linkable_title Initial setup %}
<p class='note'>
Before trying to control your light through Home Assistant, you have to setup your lights using Twinkly app. ( [Android](https://play.google.com/store/apps/details?id=com.twinkly), [IOS](https://itunes.apple.com/us/app/twinkly/id1132187056?mt=8) ).
Configure lights to connect to your Wi-Fi network.
</p>

## {% linkable_title Setup %}

Twinkly devices will be automatically discovered if you enable [the discovery component](/components/discovery/).

### {% linkable_title Example configuration %}

If you don't have discovery component enabled add the following lines to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: twinkly
    devices:
      Twinkly_33AAFF:
        name: Living Room
        host: 192.168.4.1
```

{% configuration %}
devices:
  required: true
  description: List of Twinkly devices.
  type: map
  keys:
    id:
      description: Unique identifier of the device. Usually in the form of Twinkly_33AAFF.
      required: true
      type: map
      keys:
        name:
          description: A friendly name for the device.
          required: false
          type: string
        host:
          description: IP address or hostname of the device.
          required: true
          type: map
{% endconfiguration %}
#### {% linkable_title Supported Devices %}

- LEDWORKS Twinkly Strings
