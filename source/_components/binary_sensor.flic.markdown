---
layout: page
title: Flic Smart Button
description: "Instructions how to integrate flic buttons within Home Assistant."
date: 2016-12-02 22:03
sidebar: true
comments: false
sharing: true
footer: true
logo: flic.png
ha_category: Binary Sensor
ha_iot_class: "Local Push"
ha_release: 0.33.4
---

The `flic` platform allows you to connect with multiple [flic](https://flic.io) smart buttons.

The platform does not directly interact with the buttons, but communicates with the flic service that manages the buttons. The service can run on the same instance as home assistant or any other reachable machine. For setup instructions visit the [GitHub repository](https://github.com/50ButtonsEach/fliclib-linux-hci#quick-start) of the service.

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: flic
```

Configuration variables:

- **host** (*Optional*): The IP or hostname of the flic service server. (default: `localhost`)
- **port** (*Optional*): The port of the flic service. (default: `5551`)
- **double_click_threshold** (*Optional*): The maximum number of seconds between to clicks to identify them as double click. (default: `0.5`)
- **long_click_threshold** (*Optional*): The minimum number of seconds a button has to be pressed to identify click as long click. (default: `0.3`)
- **auto_scan** (*Optional*): If `true`, the server is configured to constantly scan for new buttons. (default: `true`)

A few notes:

- If auto scan is enabled, you can add a new button by pressing it for at least 7s. The button will be paired with the flic service and added to Home Assistant. Otherwise, you have to manually pair it with the flic service. The Home Assistant platform will not scan for new buttons and will only connect to buttons already paired.
- For each of the three click types (single, double and long click) a event is fired by the device. The event data contains the name and bluetooth address of the button.
