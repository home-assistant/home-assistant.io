---
title: "Siren turned on"
trigger: siren.turned_on
domain: siren
description: "Triggers when one or more sirens turn on."
related_triggers:
  - siren.turned_off
---

The **Siren turned on** trigger is useful when you want Home Assistant to react as soon as a siren starts sounding. You can use it to send an alert, turn on lights, or start another automation the moment a siren changes from off to on.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your siren is in. You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Siren turned on**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sirens are targeted.
7. Under **For at least**, set how long the siren must stay on before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple sirens are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted siren turns on, **First** to fire only when the first targeted siren turns on, or **All** to fire only after every targeted siren has turned on.
  required: false
For at least:
  description: How long the siren must stay on before the trigger fires. Set to zero to fire right away.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `siren.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: siren.turned_on
  target:
    entity_id: siren.entry
{% endexample %}

This fires every time `siren.entry` turns on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple sirens are targeted, controls when the trigger fires.
    Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the siren must stay on before the trigger fires.
    Accepts a duration string like `00:05:00`.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a siren changes from a known off state to on.
- If a siren returns from `unavailable` or `unknown`, that recovery does not fire the trigger.
- To react when a siren stops, use [Siren turned off](/triggers/siren.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a phone alert when the siren starts

If a siren turns on while you are outside or in another room, a phone alert helps you notice it right away. This automation sends a notification as soon as the entry siren starts.

- **Trigger**: Siren turned on
  - **Target**: Entry siren
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a siren start notification" %}

{% example %}
automation: |
  alias: "Notify when the siren turns on"
  triggers:
    - trigger: siren.turned_on
      target:
        entity_id: siren.entry
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Siren started"
        message: >
          The entry siren just turned on.
{% endexample %}

{% enddetails %}

### Automation: turn on the porch lights when the siren starts

At night, a siren can be easier to deal with if the area around your home is lit. This automation turns on the porch lights when the outdoor siren starts, making it easier to check what is happening.

- **Trigger**: Siren turned on
  - **Target**: Outdoor siren
  - **For at least**: 00:00:05
- **Action**: Turn on light

{% details "YAML example for lighting the porch when the siren starts" %}

{% example %}
automation: |
  alias: "Turn on porch lights when the siren starts"
  triggers:
    - trigger: siren.turned_on
      target:
        entity_id: siren.outdoor
      options:
        for: "00:00:05"
  actions:
    - action: light.turn_on
      target:
        area_id: porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
