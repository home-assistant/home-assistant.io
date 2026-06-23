---
title: "Switch turned on"
trigger: switch.turned_on
domain: switch
description: "Triggers when one or more switches turn on."
related_triggers:
  - switch.turned_off
---

The **Switch turned on** trigger is useful when you want something else to happen as soon as a switch is activated. Use it to start a related device, send a reminder, or begin a timed routine after a switch has been on for a while.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the switch you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Switch turned on**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the switch must stay on before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple switches are targeted, controls whether the trigger fires for **Each** switch, only the **First** switch, or after **All** targeted switches are on.
  required: false
For at least:
  description: How long the switch must stay on before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `switch.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: switch.turned_on
  target:
    entity_id: switch.coffee_machine
{% endexample %}

This fires whenever `switch.coffee_machine` turns on.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple switches are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the switch must stay on before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- A switch in the `unknown` or `unavailable` state does not count as turned on.
- If the switch turns off before the **For at least** time finishes, the timer resets.
- To react when a switch stops instead, use [Switch turned off](/triggers/switch.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: cut power to the iron after it has been on too long

If your iron is plugged into a smart power plug and stays on for more than 15 minutes, this automation cuts the power so it doesn't keep heating unattended.

- **Trigger**: Switch turned on
  - **Target**: Iron power plug
  - **Trigger when**: Each
  - **For at least**: 00:15:00
- **Action**: Turn off switch
  - **Target**: Iron power plug

{% details "YAML example for cutting power to the iron" %}

{% example %}
automation: |
  alias: "Cut power to iron after 15 minutes"
  triggers:
    - trigger: switch.turned_on
      target:
        entity_id: switch.iron_power_plug
      options:
        for: "00:15:00"
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.iron_power_plug
{% endexample %}

{% enddetails %}

### Automation: start the bathroom fan when the shower light turns on

When the shower light goes on, start the bathroom exhaust fan to reduce moisture buildup.

- **Trigger**: Switch turned on
  - **Target**: Shower light switch
- **Action**: Turn on fan
  - **Target**: Bathroom fan

{% details "YAML example for starting the bathroom fan" %}

{% example %}
automation: |
  alias: "Bathroom fan with shower light"
  triggers:
    - trigger: switch.turned_on
      target:
        entity_id: switch.shower_light
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bathroom
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
