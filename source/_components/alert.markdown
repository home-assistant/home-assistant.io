---
layout: page
title: "Alert"
description: "Instructions how to setup automatic alerts within Home Assistant."
date: 2017-01-15 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.37
---

The `alert` component is designed to notify you when problematic issues arise.
For example, if the garage door is left open, the `alert` component can be
used remind you of this by sending you repeating notifications at customizable
intervals. This is also useful for low battery sensors, water leak sensors,
or any condition that may need your attention.

Alerts will add an entity to the front end only when they are firing. This
entity allows you to silence an alert until it is resolved.

### {% linkable_title Basic Example %}

The `alert` component makes use of any of the `notifications` components.
To setup the `alert` component, first, you must setup a `notification`
component. Then, add the following to your configuration file:

```yaml
# Example configuration.yaml entry
alert:
  garage_door:
    name: Garage is open
    entity_id: input_boolean.garage_door
    state: 'on'   # Optional, 'on' is the default value
    repeat: 30
    backoff: 1.0  # Optional, default is 1
    max_repeat: 120  # Optional, default is 1440
    min_repeat: 15  # Optional, default is 1
    can_acknowledge: True  # Optional, default is True
    skip_first: True  # Optional, false is the default
    notifiers:
      - ryans_phone
      - kristens_phone
```
Configuration variables:

- **name** (*Required*): The friendly name of the alert.
- **entity_id** (*Required*): The ID of the entity to watch.
- **state** (*Optional*): The problem condition for the entity.
- **repeat** (*Required*): Number of minutes the notification should be repeated.
- **backoff** (*Optional*): Factor to allow the repeat delay to be dynamically changed.
- **max_repeat** (*Optional*): Maximum possible delay when `backoff` is used.
- **min_repeat** (*Optional*): Minimum possible delay when `backoff` is used.
- **can_acknowledge** (*Optional*): Allows the alert to be unacknowledgable.
- **skip_first** (*Optional*): Controls whether the notification should be sent immediately.
- **notifiers** (*Required*): List of `notification` components to use for alerts.

In this example, the garage door status (`input_boolean.garage_door`) is
watched and this alert will be triggered when its status is equal to `on`.
This indicates that the door has been opened. Because the `skip_first`
option was set to `True`, the first notification will not be delivered
immediately. However, every 30 minutes, a notification will be delivered until
either `input_boolean.garage_door` no longer has a state of `on` or until the
alert is acknowledged using the Home Assistant frontend.

### {% linkable_title Complex Alert Criteria %}

By design, the `alert` component only handles very simple criteria for firing.
That is, is only checks if a single entity's state is equal to a value. At some
point, it may be desireable to have an alert with a more complex criteria.
Possibly, when a battery percentage falls below a threshold. Maybe you want to
disable the alert on certain days. Maybe the alert firing should depend on more
than one input. For all of these situations, it is best to use the alert in
conjunction with a `Template Binary Sensor`. The following example does that.

```yaml
binary_sensor:
  - platform: template
    sensors:
      motion_battery_low:
        value_template: {% raw %}'{{ states.sensor.motion.attributes.battery < 15 }}'{% endraw %}
        friendly_name: 'Motion battery is low'

alert:
  motion_battery:
    - name: Motion Battery is Low
      entity_id: binary_sensor.motion_battery_low
      repeat: 30
      notifiers:
        - ryans_phone
        - kristens_phone
```

This example will begin firing as soon as the entity `sensor.motion`'s
`battery` attribute falls below 15. It will continue to fire until the battery
attribute raises above 15 or the alert is acknowledged on the frontend.

### {% linkable_title Dynamic Notification Delay Times %}

In some use cases, you may desire a notification to become either more or less
frequent every time it is sent. The alert component supports this with a
configuration option called `backoff`. This is a factor that the repeat
interval is multiplied by every time the notification is sent. A `backoff`
factor greater than 1 will elongate the delays between notifications.
Similarly, a backoff factor less than 1 will make the notification more
frequent as time goes on. To prevent the notifications from becoming too
freequent or too far apart, the `min_repeat` and `max_repeat` options are used.
By default, the notifications are allowed as frequently as every minute or as
infrequently as one per day.

If you desire you delays to become incresingly further apart, start with a
`backoff` factor of 1.5 and adjust to fit your needs. If you desire reducing
delays, start with a factor of 0.75 and tweak as necessary.
