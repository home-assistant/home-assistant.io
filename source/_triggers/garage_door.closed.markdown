---
title: "Garage door closed"
trigger: garage_door.closed
domain: garage_door
description: "Triggers when one or more garage doors close."
related_triggers:
  - garage_door.opened
---

The **Garage door closed** trigger fires when a targeted garage door changes to closed. Use it when you want an automation to wait for the garage door to finish closing before it continues.

This trigger is useful for turning lights off after you park, resuming a security routine after the garage is shut, and confirming that a close cycle has finished.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Garage door closed**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your garage door is in, like your garage or driveway. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the garage door must stay closed before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple garage doors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted garage door closes, **First** to fire only when the first targeted garage door closes, or **All** to fire only after every targeted garage door is closed.
  required: false
  default: Each
For at least:
  description: How long the garage door must stay closed before the trigger fires. Set it to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `garage_door.closed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: garage_door.closed
  target:
    entity_id: cover.garage_door
{% endexample %}

This fires when `cover.garage_door` closes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple garage doors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the garage door must stay closed before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a garage door contact sensor with the garage door device class or a garage door cover with the garage device class.
- If an entity comes back from **Unavailable** or **Unknown**, that recovery does not count as the garage door closing.
- The **For at least** option only fires the automation if the garage door stays closed for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the garage lights after the garage door has been closed for 2 minutes

After you finish unloading the car, this automation gives you a little time to walk inside before it turns off the garage lights.

- **Trigger**: Garage door closed
  - **Target**: Garage door
  - **For at least**: 00:02:00
- **Action**: Turn off light

{% details "YAML example for turning off the garage lights" %}

{% example %}
automation: |
  alias: "Turn off the garage lights after the garage door has been closed for 2 minutes"
  triggers:
    - trigger: garage_door.closed
      target:
        entity_id: cover.garage_door
      options:
        for: "00:02:00"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.garage_lights
{% endexample %}

{% enddetails %}

### Automation: close the interior entry lock after the garage door closes

If you use the garage as your main entrance, this automation can lock the interior entry door after the garage door finishes closing.

- **Trigger**: Garage door closed
  - **Target**: Garage door
- **Action**: Lock lock

{% details "YAML example for locking the interior entry door" %}

{% example %}
automation: |
  alias: "Lock the interior entry door after the garage door closes"
  triggers:
    - trigger: garage_door.closed
      target:
        entity_id: binary_sensor.garage_door_contact
  actions:
    - action: lock.lock
      target:
        entity_id: lock.garage_entry_door
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
