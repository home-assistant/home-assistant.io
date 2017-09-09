---
layout: page
title: "Demo platforms"
description: "Instructions how to use the Platform demos with Home Assistant."
date: 2016-02-24 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
---


The `demo` platform allows you to use components which are providing a demo of their implementation. The demo entities are dummies but show you how the actual platform looks like. This way you can run own demonstration instance like the online [Home Assistant demo](https://home-assistant.io/demo/) or `hass --demo-mode` but combined with your own real/functional platforms.

Available demo platforms:

- [Alarm control panel](/components/alarm_control_panel/) (`alarm_control_panel`)
- [Binary sensor](/components/binary_sensor/) (`binary_sensor`)
- [Camera](/components/camera/) (`camera`)
- [Climate](/components/climate/) (`climate`)
- [Cover](/components/cover/) (`cover`)
- [Fan](/components/fan/) (`fan`)
- [Image Processing](/components/image_processing/) (`image_processing`)
- [Light](/components/light/) (`light`)
- [Lock](/components/lock/) (`lock`)
- [Notification](/components/notify/) (`notify`)
- [Remote](/components/remote/) (`remote`)
- [Sensor](/components/sensor/) (`sensor`)
- [Switch](/components/switch/) (`switch`)
- [Text-to-speech](/components/tts/) (`tts`)
- [Weather](/components/weather/) (`weather`)
- [Mailbox](/components/mailbox/) (`mailbox`)

To integrate a demo platform in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
[component]:
  - platform: demo
```

Configuration variables:

- **[component]** (*Required*): The name of the component as stated in the listing above the configuration example.
