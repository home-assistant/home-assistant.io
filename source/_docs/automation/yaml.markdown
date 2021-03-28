---
title: "Automation YAML"
description: "How to use the automation integration with YAML."
---

Automations are created in Home Assistant via the UI, but are stored in a YAML format. If you want to edit the YAML of an automation, go to edit the automation, click on the menu button in the top right and turn on YAML mode.

The UI will write your automations to `automations.yaml`. This file is managed by the UI and should not be edited manually.

It is also possible to write your automations directly inside `configuration.yaml` or other YAML files. You can do this by adding a labeled `automation` block to your `configuration.yaml`:

```yaml
# The configuration required for the UI to work
automation: !include automations.yaml

# Labeled automation block
automation kitchen:
  - trigger:
    - platform: ...
```

You can add as many labeled `automation` blocks as you want.

## YAML Example

Example of a YAML based automation that you can add to `configuration.yaml`.

{% raw %}

```yaml
# Example of entry in configuration.yaml
automation my_lights:
# Turns on lights 1 hour before sunset if people are home
# and if people get home between 16:00-23:00
  - alias: "Rule 1 Light on in the evening"
    trigger:
      # Prefix the first line of each trigger configuration
      # with a '-' to enter multiple
      - platform: sun
        event: sunset
        offset: "-01:00:00"
      - platform: state
        entity_id: all
        to: "home"
    condition:
      # Prefix the first line of each condition configuration
      # with a '-'' to enter multiple
      - condition: state
        entity_id: all
        state: "home"
      - condition: time
        after: "16:00:00"
        before: "23:00:00"
    action:
      # With a single service call, we don't need a '-' before service - though you can if you want to
      - service: homeassistant.turn_on
        target:
          entity_id: group.living_room

# Turn off lights when everybody leaves the house
  - alias: "Rule 2 - Away Mode"
    trigger:
      - platform: state
        entity_id: all
        to: "not_home"
    action:
      - service: light.turn_off
        target:
          entity_id: all

# Notify when Paulus leaves the house in the evening
  - alias: "Leave Home notification"
    trigger:
      - platform: zone
        event: leave
        zone: zone.home
        entity_id: device_tracker.paulus
    condition:
      - condition: time
        after: "20:00"
    action:
      - service: notify.notify
        data:
          message: "Paulus left the house"

# Send a notification via Pushover with the event of a Xiaomi cube. Custom event from the Xiaomi component.
  - alias: "Xiaomi Cube Action"
    initial_state: false
    trigger:
      - platform: event
        event_type: cube_action
        event_data:
          entity_id: binary_sensor.cube_158d000103a3de
    action:
      - service: notify.pushover
        data:
          title: "Cube event detected"
          message: "Cube has triggered this event: {{ trigger.event }}"
```

{% endraw %}

## Extra options

When writing automations directly in YAML, you will have access to advanced options that are not available in the user interface.

### Automation initial state

At startup, automations by default restore their last state of when Home Assistant ran. This can be controlled with the `initial_state` option. Set it to `false` or `true` to force initial state to be off or on.

```yaml
automation:
- alias: "Automation Name"
  initial_state: false
  trigger:
    - platform: ...
```

## Migrating your YAML automations to `automations.yaml`

If you want to migrate your manual automations to use the editor, you'll have to copy them to `automations.yaml`. Make sure that `automations.yaml` remains a list! For each automation that you copy over, you'll have to add an `id`. This can be any string as long as it's unique.

{% raw %}

```yaml
# Example automations.yaml entry. Note, automations.yaml is always a list!
- id: my_unique_id  # <-- Required for editor to work, for automations created with the editor the id will be automatically generated.
  alias: "Hello world"
  trigger:
    - platform: state
      entity_id: sun.sun
      from: below_horizon
      to: above_horizon
  condition:
    - condition: numeric_state
      entity_id: sensor.temperature
      above: 17
      below: 25
      value_template: "{{ float(state.state) + 2 }}"
  action:
    - service: light.turn_on
```

{% endraw %}

### Deleting Automations

When automations remain visible in the Home Assistant Dashboard, even after having deleted in the YAML file, you have to delete them in the UI.

To delete them completely, go to UI **{% my entities title="Configuration -> Entities" %}** and find the automation in the search field or by scrolling down.

Check the square box aside of the automation you wish to delete and from the top-right of your screen, select 'REMOVE SELECTED'.
