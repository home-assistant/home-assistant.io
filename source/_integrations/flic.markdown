---
title: Flic
description: Instructions on how to integrate flic buttons within Home Assistant.
ha_category:
  - Binary sensor
ha_iot_class: Local Push
ha_release: 0.35
ha_domain: flic
ha_platforms:
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `flic` {% term integration %} allows you to receive click events from [flic](https://flic.io) smart buttons.

The {% term integration %} does not directly interact with the buttons, *but communicates with a flic service* that manages the buttons. The service can run on the same instance as Home Assistant or any other reachable machine.

## Action setup

If you are using the Home Assistant Operating System, you can run the service locally by [installing](/common-tasks/os#installing-third-party-add-ons) the flicd add-on from [pschmitt's repository](https://github.com/pschmitt/home-assistant-addons).

For instructions on how to install the service manually, visit the GitHub repository of the service for [Linux](https://github.com/50ButtonsEach/fliclib-linux-hci), [macOS](https://github.com/50ButtonsEach/flic-service-osx) or [Windows](https://github.com/50ButtonsEach/fliclib-windows).

## Configuration

To use your flic buttons in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: flic
```

{% configuration %}
host:
  description: The IP or hostname of the flic service server.
  required: false
  type: string
  default: localhost
port:
  description: The port of the flic service.
  required: false
  type: integer
  default: 5551
discovery:
  description: If `true` then the integration is configured to constantly scan for new buttons.
  required: false
  type: boolean
  default: true
ignored_click_types:
  description: List of click types whose occurrence should not trigger a `flic_click` event. Click types are `single`, `double`, and `hold`.
  required: false
  type: list
timeout:
  description: The maximum time in seconds an event can be queued locally on a button before discarding the event.
  required: false
  type: integer
  default: 3
{% endconfiguration %}

## Discovery

If discovery is enabled, you can add a new button by pressing it for at least 7 seconds. The button will be paired with the flic service and added to Home Assistant. Otherwise, you have to manually pair it with the flic service. The Home Assistant platform will not scan for new buttons and will only connect to buttons already paired.

## Timeout

When the flic button is triggered while disconnected from flic service, it will queue all events and try to connect and transmit them as soon as possible. The timeout variable can be used to stop events from triggering if too much time passed between the action and the notification in Home Assistant.

## Events

The flic integration fires `flic_click` events on the bus. You can capture the events and respond to them in automation scripts like this:

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: "Turn on lights in the living room when flic is pressed once"
    triggers:
      - trigger: event
        event_type: flic_click
        event_data:
          button_name: flic_81e4ac74b6d2
          click_type: single
    actions:
      - action: homeassistant.turn_on
        target:
          entity_id: group.lights_livingroom
```

Event data:

- **button_name**: The name of the button, that triggered the event.
- **button_address**: The Bluetooth address of the button, that triggered the event.
- **click_type**: The type of click. Possible values are `single`, `double` and `hold`.
- **queued_time**: The amount of time this event was queued on the button, in seconds.

To help detect and debug flic button clicks, you can use this automation that send a notification on very click type of every button. This example uses the [HTML5 push notification platform](/integrations/html5). Visit the [notification integration page](/integrations/notify/) for more information on setting up notifications.

{% raw %}

```yaml
automation:
  - alias: "FLIC Html5 notify on every click"
    triggers:
      - trigger: event
        event_type: flic_click
    actions:
      - action: notify.html5
        data:
          title: "flic click"
          message: "flic {{ trigger.event.data.button_name }} was {{ trigger.event.data.click_type }} clicked"
```

{% endraw %}

### Ignoring click types

For some purposes it might make sense to exclude a specific click type from triggering click events. For example, when ignoring double clicks, pressing the button twice fast results in two `single` instead of a `double` click event. This is very useful for applications where you want to click fast.
