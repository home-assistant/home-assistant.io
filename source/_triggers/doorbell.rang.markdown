---
title: "Doorbell rang"
trigger: doorbell.rang
domain: doorbell
description: "Triggers when one or more doorbells ring."
related_triggers:
  - event.received
---

The **Doorbell rang** trigger reacts when someone rings a doorbell. It works with [event entities](/integrations/event/) that have the doorbell device class, such as the doorbell button of a video doorbell.

Use it to get a notification when someone is at the door, or to turn on a light at the front door when someone rings.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Doorbell rang**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the doorbell you want to monitor, or the area it is in, like your hallway or entrance. You can also select a floor, a device, a specific entity, or a label.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `doorbell.rang`. A basic example looks like this:

{% example %}
trigger: |
  trigger: doorbell.rang
  target:
    entity_id: event.front_door_doorbell
{% endexample %}

This reacts every time someone rings the doorbell of `event.front_door_doorbell`.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md domain="event" %}

## Good to know

- If you select a device, an area, a floor, or a label, Home Assistant only watches the doorbell event entities behind that target, and skips entities marked as configuration or diagnostic entities.
- The trigger only reacts to the **Ring** event type. Other event types of the same entity don't start the automation.
- If you select several doorbells, the trigger reacts every time any one of them rings.
- The first ring after Home Assistant starts also counts, even if the doorbell showed **Unknown** before. If a doorbell comes back from **Unavailable**, that recovery doesn't count as a ring.
- To react to other event types that your integration provides, use the [Event received](/triggers/event.received/) trigger instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

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

{% include triggers/stuck.md %}

{% include triggers/related.md %}
