---
title: "Switch turned off"
trigger: switch.turned_off
domain: switch
description: "Triggers after one or more switches turn off."
related_triggers:
  - switch.turned_on
---

The **Switch turned off** trigger is useful when you want to react after a switch is deactivated. Use it to end a related routine, restore another device to its normal state, or send a reminder if a switch shuts down when you did not expect it to.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the switch you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Switch turned off**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the switch must stay off before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple switches are targeted, controls whether the trigger fires for **Each** switch, only the **First** switch, or after **All** targeted switches are off.
  required: false
For at least:
  description: How long the switch must stay off before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `switch.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: switch.turned_off
  target:
    entity_id: switch.porch_light
{% endexample %}

This fires whenever `switch.porch_light` turns off.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple switches are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the switch must stay off before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- A switch in the `unknown` or `unavailable` state does not count as turned off.
- If the switch turns on again before the **For at least** time finishes, the timer resets.
- To react when a switch starts instead, use [Switch turned on](/triggers/switch.turned_on/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: stop the bathroom fan after the shower light turns off

After the shower light has been off for a few minutes, turn the bathroom fan back off to save energy once the moisture has cleared.

- **Trigger**: Switch turned off
  - **Target**: Shower light switch
  - **Trigger when**: Each
  - **For at least**: 00:05:00
- **Action**: Turn off fan
  - **Target**: Bathroom fan

{% details "YAML example for stopping the bathroom fan" %}

{% example %}
automation: |
  alias: "Bathroom fan off after shower light"
  triggers:
    - trigger: switch.turned_off
      target:
        entity_id: switch.shower_light
      options:
        for: "00:05:00"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.bathroom
{% endexample %}

{% enddetails %}

### Automation: notify if a freezer outlet stops drawing power

If a freezer outlet switches off unexpectedly, you want to know quickly so the food stays frozen.

- **Trigger**: Switch turned off
  - **Target**: Freezer outlet
  - **For at least**: 00:01:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a freezer outlet alert" %}

{% example %}
automation: |
  alias: "Freezer outlet turned off"
  triggers:
    - trigger: switch.turned_off
      target:
        entity_id: switch.freezer_outlet
      options:
        for: "00:01:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The freezer outlet has been off for 1 minute."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
