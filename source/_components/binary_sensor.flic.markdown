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

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: flic
```

Configuration variables:

- **host** (*Optional*): The IP or hostname of the flic service server. (default: `localhost`)
- **port** (*Optional*): The port of the flic service. (default: `5551`)
- **discovery** (*Optional*): If `true`, the component is configured to constantly scan for new buttons. (default: `true`)


#### {% linkable_title Discovery %}

If discovery is enabled, you can add a new button by pressing it for at least 7s. The button will be paired with the flic service and added to Home Assistant. Otherwise, you have to manually pair it with the flic service. The Home Assistant platform will not scan for new buttons and will only connect to buttons already paired.


#### {% linkable_title Events %}

The flic component fires `flic_click` events on the bus. You can capture the events and respond to them in automation scripts like this:

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: Turn on lights in living room if flic is pressed once
    trigger:
      platform: event
      event_type: flic_click
      event_data:
        button_name: flic_81e4ac74b6d2
        click_type: single
    action:
      service: homeassistant.turn_off
      entity_id: group.lights_livingroom
```

Event data:

- **button_name**: The name of the button, that triggered the event.
- **button_address**: The bluetooth address of the button, that triggered the event.
- **click_type**: The type of click. Possible values are `single`, `double` and `hold`.
