---
title: "Automation Examples"
description: "Some automation examples to get you started."
redirect_from: /getting-started/automation-examples/
---

Just some sample automation rules to get you started.

{% raw %}
```yaml
# Example of entry in configuration.yaml
automation:
# Turns on lights 1 hour before sunset if people are home
# and if people get home between 16:00-23:00
  - alias: 'Rule 1 Light on in the evening'
    trigger:
      # Prefix the first line of each trigger configuration
      # with a '-' to enter multiple
      - platform: sun
        event: sunset
        offset: '-01:00:00'
      - platform: state
        entity_id: all
        to: 'home'
    condition:
      # Prefix the first line of each condition configuration
      # with a '-'' to enter multiple
      - condition: state
        entity_id: all
        state: 'home'
      - condition: time
        after: '16:00:00'
        before: '23:00:00'
    action:
      # With a single service call, we don't need a '-' before service - though you can if you want to
      service: homeassistant.turn_on
      entity_id: group.living_room

# Turn off lights when everybody leaves the house
  - alias: 'Rule 2 - Away Mode'
    trigger:
      platform: state
      entity_id: all
      to: 'not_home'
    action:
      service: light.turn_off
      entity_id: all

# Notify when Paulus leaves the house in the evening
  - alias: 'Leave Home notification'
    trigger:
      platform: zone
      event: leave
      zone: zone.home
      entity_id: device_tracker.paulus
    condition:
      condition: time
      after: '20:00'
    action:
      service: notify.notify
      data:
        message: 'Paulus left the house'

# Send a notification via Pushover with the event of a Xiaomi cube. Custom event from the Xiaomi component.
  - alias: 'Xiaomi Cube Action'
    initial_state: false
    trigger:
      platform: event
      event_type: cube_action
      event_data:
        entity_id: binary_sensor.cube_158d000103a3de
    action:
      service_template: notify.pushover
      data_template: 
        title: "Cube event detected"
        message: "Cube has triggered this event: {{ trigger.event }}"
```
{% endraw %}
