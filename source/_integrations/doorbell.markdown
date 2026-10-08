---
title: Doorbell
description: This integration provides a doorbell automation trigger.
ha_category:
  - Automation
ha_release: 2026.5
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: doorbell
ha_integration_type: system
---

The **Doorbell** {% term integration %} provides an automation trigger for [event entities](/integrations/event/) with the [doorbell device class](/integrations/event/#device-class).

## Supported entities

The **Doorbell** integration supports the following entity types:

- Event entities with the doorbell device class.

## Configuration

The **Doorbell** integration does not require any configuration.

## Supported functionality

The **Doorbell** integration provides the following automation trigger for doorbell event entities.

{% include integrations/triggers.md %}

## Doorbell automation examples

You can use this trigger to get a notification when someone is at the door, or to turn on a light when someone rings.

{% include docs/paste_yaml_tip.md %}

### Automation: send a notification when someone rings the doorbell

Get a notification on your phone when someone rings the front door, so you know someone is there even when you can't hear the chime.

- **Trigger**: Doorbell rang
  - **Target**: Front door doorbell
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a doorbell notification" %}

{% example %}
automation: |
  alias: "Notify when someone rings the doorbell"
  triggers:
    - trigger: doorbell.rang
      target:
        entity_id: event.front_door_doorbell
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Someone rang the front door doorbell."
{% endexample %}

{% enddetails %}

### Automation: turn on the porch light when someone rings after sunset

When someone rings the doorbell after sunset, turn on the porch light so you can see who is at the door.

- **Trigger**: Doorbell rang
  - **Target**: Front door doorbell
- **Condition**: State
  - **Entity**: Sun
  - **State**: Below horizon
- **Action**: Turn on light
  - **Target**: Porch light

{% details "YAML example for turning on the porch light" %}

{% example %}
automation: |
  alias: "Turn on the porch light when someone rings after sunset"
  triggers:
    - trigger: doorbell.rang
      target:
        entity_id: event.front_door_doorbell
  conditions:
    - condition: state
      entity_id: sun.sun
      state: "below_horizon"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}
