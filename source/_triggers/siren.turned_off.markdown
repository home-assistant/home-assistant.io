---
title: "Siren turned off"
trigger: siren.turned_off
domain: siren
description: "Triggers after one or more sirens turn off."
related_triggers:
  - siren.turned_on
---

The **Siren turned off** trigger is useful when you want Home Assistant to react when a siren stops sounding. You can use it to send an all-clear message, turn off temporary lighting, or reset other parts of an alarm flow after the noise ends.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your siren is in. You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Siren turned off**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sirens are targeted.
7. Under **For at least**, set how long the siren must stay off before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple sirens are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted siren turns off, **First** to fire only when the first targeted siren turns off, or **All** to fire only after every targeted siren has turned off.
For at least:
  description: How long the siren must stay off before the trigger fires. Set to zero to fire right away.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `siren.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: siren.turned_off
  target:
    entity_id: siren.entry
{% endexample %}

This fires every time `siren.entry` turns off.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple sirens are targeted, controls when the trigger fires.
    Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the siren must stay off before the trigger fires.
    Accepts a duration string like `00:05:00`.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a siren changes from a known on state to off.
- If a siren returns from `unavailable` or `unknown`, that recovery does not fire the trigger.
- To react when a siren starts, use [Siren turned on](/triggers/siren.turned_on/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send an all-clear notification when the siren stops

When a siren stops, you may want to know the alarm state has settled down. This automation sends a phone notification as soon as the entry siren turns off.

- **Trigger**: Siren turned off
  - **Target**: Entry siren
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an all-clear notification" %}

{% example %}
automation: |
  alias: "Notify when the siren turns off"
  triggers:
    - trigger: siren.turned_off
      target:
        entity_id: siren.entry
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Siren stopped"
        message: >
          The entry siren has turned off.
{% endexample %}

{% enddetails %}

### Automation: turn off the porch lights after the siren stops

If you turn on extra lights while a siren is active, you can also turn them off when the situation is over. This automation switches off the porch lights after the outdoor siren has been off for 30 seconds.

- **Trigger**: Siren turned off
  - **Target**: Outdoor siren
  - **For at least**: 00:00:30
- **Action**: Turn off light

{% details "YAML example for turning off the porch lights" %}

{% example %}
automation: |
  alias: "Turn off porch lights after the siren stops"
  triggers:
    - trigger: siren.turned_off
      target:
        entity_id: siren.outdoor
      options:
        for: "00:00:30"
  actions:
    - action: light.turn_off
      target:
        area_id: porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
