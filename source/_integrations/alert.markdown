---
title: Alert
description: Instructions on how to setup automatic alerts within Home Assistant.
ha_category:
  - Automation
ha_release: 0.38
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: alert
ha_codeowners:
  - '@home-assistant/core'
  - '@frenck'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `alert` integration is designed to notify you when problematic issues arise.
For example, if the garage door is left open, the `alert` integration can be used
to remind you of this by sending you repeating notifications at customizable
intervals. This is also used for low battery sensors,
water leak sensors, or any condition that may need your attention.

Alerts will add an entity to the front end.
This entity allows you to silence an alert until it is resolved and has three
possible states:

| State  | Description                                                  |
| ------ | ------------------------------------------------------------ |
| `idle` | The condition for the alert is false.                        |
| `on`   | The condition for the alert is true.                         |
| `off`  | The condition for the alert is true but it was acknowledged. |

### Basic example

The `alert` integration makes use of any of the `notification` integrations. To
setup the `alert` integration, first, you must set up a [notification integration](/integrations/notify).
Then, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
alert:
  garage_door:
    name: Garage is open
    done_message: Garage is closed
    entity_id: input_boolean.garage_door
    state: "on"
    repeat: 30
    can_acknowledge: true
    skip_first: true
    notifiers:
      - ryans_phone
      - kristens_phone
```

{% configuration %}
name:
  description: The friendly name of the alert.
  required: true
  type: string
entity_id:
  description: The ID of the entity to watch.
  required: true
  type: string
title:
  description: >
    A title to be used for the notification if the notifier supports it
    with [template](/docs/configuration/templating/) support.
  required: false
  type: template
state:
  description: The problem condition for the entity.
  required: false
  type: string
  default: on
repeat:
  description: >
    Number of minutes before the notification should be repeated.
    Can be either a number or a list of numbers.
  required: true
  type: [integer, list]
can_acknowledge:
  description: Control whether the notification can be acknowledged; set to `false` if the alert should not be acknowledgeable.
  required: false
  type: boolean
  default: true
skip_first:
  description: >
    Controls whether the notification should be
    sent immediately or after the first delay.
  required: false
  type: boolean
  default: false
message:
  description: >
    A message to be sent after an alert transitions from `idle` to `on`
    with [template](/docs/configuration/templating/) support.
  required: false
  type: template
done_message:
  description: >
    A message sent after an alert transitions from `on` or `off` to `idle` with
    [template](/docs/configuration/templating/) support. Is only sent if an alert notification
    was sent for transitioning from `idle` to `on`.
  required: false
  type: template
notifiers:
  description: "List of `notification` integrations to use for alerts."
  required: false
  type: list
data:
  description: "Dictionary of extra parameters to send to the notifier."
  required: false
  type: list  
{% endconfiguration %}

In this example, the garage door status (`input_boolean.garage_door`) is watched
and this alert will be triggered when its status is equal to `on`.
This indicates that the door has been opened. Because the `skip_first` option
was set to `true`, the first notification will not be delivered immediately.
However, every 30 minutes, a notification will be delivered until either
`input_boolean.garage_door` no longer has a state of `on` or until the alert is
acknowledged using the Home Assistant frontend.

For notifiers that require other parameters (such as `twilio_sms` which requires
you specify a `target` parameter when sending the notification), you can use the
`group` notification to wrap them for an alert.
Simply create a `group` notification type with a single notification member
(such as `twilio_sms`) specifying the required parameters other than `message`
provided by the `alert` integration:

```yaml
- platform: group
  name: john_phone_sms
  services:
    - action: twilio_sms
      data:
        target: !secret john_phone
```

```yaml
alert:
  freshwater_temp_alert:
    name: "Warning: I have detected a problem with the freshwater tank temperature"
    entity_id: binary_sensor.freshwater_temperature_status
    state: "on"
    repeat: 5
    can_acknowledge: true
    skip_first: false
    notifiers:
      - john_phone_sms
```

### Complex alert criteria

By design, the `alert` integration only handles very simple criteria for firing.
That is, it only checks if a single entity's state is equal to a value. At some
point, it may be desirable to have an alert with a more complex criteria.
Possibly, when a battery percentage falls below a threshold. Maybe you want to
disable the alert on certain days. Maybe the alert firing should depend on more
than one input. For all of these situations, it is best to use the alert in
conjunction with a `Template Binary Sensor`. The following example does that.

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: "Motion Battery is Low"
        state: "{{ state_attr('sensor.motion', 'battery') | float(default=0) < 15 }}"
        device_class: battery

alert:
  motion_battery:
    name: Motion Battery is Low
    entity_id: binary_sensor.motion_battery_is_low
    repeat: 30
    notifiers:
      - ryans_phone
      - kristens_phone
```

{% endraw %}

This example will begin firing as soon as the entity `sensor.motion`'s `battery`
attribute falls below 15. It will continue to fire until the battery attribute
raises above 15 or the alert is acknowledged on the frontend.

### Dynamic notification delay times

It may be desirable to have the delays between alert notifications dynamically
change as the alert continues to fire. This can be done by setting the `repeat`
configuration key to a list of numbers rather than a single number.
Altering the first example would look like the following.

```yaml
# Example configuration.yaml entry
alert:
  garage_door:
    name: Garage is open
    entity_id: input_boolean.garage_door
    state: "on"   # Optional, 'on' is the default value
    repeat:
      - 15
      - 30
      - 60
    can_acknowledge: true  # Optional, default is true
    skip_first: true  # Optional, false is the default
    notifiers:
      - ryans_phone
      - kristens_phone
```

Now the first message will be sent after a 15 minute delay, the second will be
sent 30 minutes after that, and a 60 minute delay will fall between every
following notification.
For example, if the garage door opens at 2:00, a notification will be
sent at 2:15, 2:45, 3:45, 4:45, etc., continuing every 60 minutes.

### Message templates

It may be desirable to have the alert notifications include information
about the state of the entity. [Templates][template]
can be used in the message or name of the alert to make it more relevant.
The following will show for a plant how to include the problem `attribute`
of the entity.

{% raw %}

```yaml
# Example configuration.yaml entry
alert:
  office_plant:
    name: Plant in office needs help
    entity_id: plant.plant_office
    state: "problem"
    repeat: 30
    can_acknowledge: true
    skip_first: true
    message: "Plant {{ states.plant.plant_office }} needs help ({{ state_attr('plant.plant_office', 'problem') }})"
    done_message: Plant in office is fine
    notifiers:
      - ryans_phone
      - kristens_phone
```

{% endraw %}

The resulting message could be `Plant Officeplant needs help (moisture low)`.

### Additional parameters for notifiers

Some notifiers support more parameters (e.g., to set text color or action
  buttons). These can be supplied via the `data` parameter:

```yaml
# Example configuration.yaml entry
alert:
  garage_door:
    name: "Garage is open"
    message: "The garage door is still open"
    done_message: "The garage door is closed"
    entity_id: input_boolean.garage_door
    state: "on"   # Optional, 'on' is the default value
    repeat:
      - 15
      - 30
      - 60
    can_acknowledge: true  # Optional, default is true
    skip_first: true  # Optional, false is the default
    data:
      inline_keyboard:
        - 'Close garage:/close_garage, Acknowledge:/garage_acknowledge'
    notifiers:
      - frank_telegram
```

This particular example relies on the `inline_keyboard` functionality of
Telegram, where the user is presented with buttons to execute certain actions.

Based on the example above you can make an automation to stop further messages,
but you will still receive the done message.

```yaml
- alias: "Telegram callback to stop alerts for garage door"
  triggers:
    - trigger: event
      event_type: telegram_callback
      event_data:
        data: "/garage_acknowledge"
  actions:
    - action: alert.turn_off
      target:
        entity_id: alert.garage_door
```

Notifications sent to Home Assistant Companion apps support [replacing](https://companion.home-assistant.io/docs/notifications/notifications-basic/#replacing) and [clearing](https://companion.home-assistant.io/docs/notifications/notifications-basic/#replacing) notifications. To use these functions with alerts, set a `tag` in the message data, send `clear_notification` as the `done_message`, and use `mobile_app_*` as the notifier:

```yaml
alert:
  garage_door:
    name: Garage is open
    done_message: clear_notification
    entity_id: input_boolean.garage_door
    state: "on"
    repeat: 30
    can_acknowledge: true
    skip_first: true
    notifiers:
      - mobile_app_ryan
      - mobile_app_kristen
    data:
      tag: garage-door
```

[template]: /docs/configuration/templating/
