---
title: "Door closed"
trigger: door.closed
domain: door
description: "Triggers when one or more doors close."
related_triggers:
  - door.opened
---

The **Door closed** trigger fires when a targeted door changes to closed. Use it when you want an automation to run only after a door is shut, like locking up, turning lights off, or resuming another routine.

This trigger is especially useful for routines that should wait for a clear end state, such as a garage door finishing its close cycle or a back door being fully shut before you lock it.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Door closed**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your door is in, like your entryway or garage. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the door must stay closed before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple doors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted door closes, **First** to fire only when the first targeted door closes, or **All** to fire only after every targeted door is closed.
For at least:
  description: How long the door must stay closed before the trigger fires. Set it to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `door.closed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: door.closed
  target:
    entity_id: binary_sensor.back_door
{% endexample %}

This fires when `binary_sensor.back_door` closes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple doors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the door must stay closed before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a door contact sensor or door cover that uses the `door` device class.
- If an entity comes back from `unavailable` or `unknown`, that recovery does not count as the door closing.
- The `for` option only fires the automation if the door stays closed for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lock the back door after it has been closed for 30 seconds

This automation waits until the back door has stayed closed for 30 seconds, then locks it. That short delay gives you time to come inside without the lock engaging immediately.

- **Trigger**: Door closed
- **Target**: Back door sensor
- **For at least**: 00:00:30
- **Action**: Lock: Lock

{% details "YAML example for locking the back door after it closes" %}

{% example %}
automation: |
  alias: "Lock back door after it closes"
  triggers:
    - trigger: door.closed
      target:
        entity_id: binary_sensor.back_door
      options:
        for: "00:00:30"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.back_door
{% endexample %}

{% enddetails %}

### Automation: turn off the hallway light after the garage door closes

If you turn on a nearby hallway light while bringing things in from the car, there is no reason to leave it on once the garage is shut again. This automation turns the light off after the garage door has stayed closed for a minute.

- **Trigger**: Door closed
- **Target**: Garage door
- **For at least**: 00:01:00
- **Action**: Turn off light

{% details "YAML example for turning off the hallway light" %}

{% example %}
automation: |
  alias: "Turn off hallway light after garage door closes"
  triggers:
    - trigger: door.closed
      target:
        entity_id: cover.garage_door
      options:
        for: "00:01:00"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
