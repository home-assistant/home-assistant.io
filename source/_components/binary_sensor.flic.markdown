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
ha_release: 0.35
---

The `flic` platform allows you to connect with multiple [flic](https://flic.io) smart buttons.

The platform does not directly interact with the buttons, but communicates with the flic service that manages the buttons. The service can run on the same instance as Home Assistant or any other reachable machine. For setup instructions visit the GitHub repository of the service for [Linux](https://github.com/50ButtonsEach/fliclib-linux-hci), [OS X](https://github.com/50ButtonsEach/flic-service-osx) or [Windows](https://github.com/50ButtonsEach/fliclib-windows).

To use your flic buttons in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: flic
```

Configuration variables:

- **host** (*Optional*): The IP or hostname of the flic service server. Defaults to `localhost`.
- **port** (*Optional*): The port of the flic service. Defaults to `5551`.
- **discovery** (*Optional*): If `true` then the component is configured to constantly scan for new buttons. Defaults to  `true`.
- **ignored_click_types**: List of click types whose occurrence should not trigger a `flic_click` event. Click types are `single`, `double`, and `hold`.
- **timeout** (*Optional*): Maximum time in seconds an event can be queued locally on a button before discarding the event. Defaults to 3.

#### {% linkable_title Discovery %}

If discovery is enabled, you can add a new button by pressing it for at least 7 seconds. The button will be paired with the flic service and added to Home Assistant. Otherwise, you have to manually pair it with the flic service. The Home Assistant platform will not scan for new buttons and will only connect to buttons already paired.

#### {% linkable_title Timeout %}
 When the flic button is triggered while disconnected from flic service, it will queue all events and try to connect and transmit them as soon as possible. The timeout variable can be used to stop events from triggering if too much time passed between the action and the notification in Home Assistant.

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
- **button_address**: The Bluetooth address of the button, that triggered the event.
- **click_type**: The type of click. Possible values are `single`, `double` and `hold`.
- **queued_time**: The amount of time this event was queued on the button, in seconds.

##### {% linkable_title Ignoring Click Types %}

For some purposes it might make sense to exclude a specific click type from triggering click events. For example when ignoring double clicks, pressing the button twice fast results in two `single` instead of a `double` click event. This is very useful for applications where you want to click fast.
