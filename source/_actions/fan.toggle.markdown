---
title: "Toggle fan"
action: fan.toggle
domain: fan
description: "Toggle a fan on or off."
related_actions:
  - fan.turn_on
  - fan.turn_off
---

The **Toggle fan** action is useful when you want one control to flip a fan between on and off. Use it when the current state can vary and you want a single action that handles both directions.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Toggle fan**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.toggle`. A basic example looks like this:

{% example %}
action: |
  action: fan.toggle
  target:
    entity_id: fan.guest_room
{% endexample %}

This flips `fan.guest_room` from off to on, or from on to off.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- `fan.toggle` works with fan entities even if other fan features are not supported.
- Because it flips the current state, it is best when you do not need to know in advance whether the fan is on or off.
- If you need a specific result, use [Turn on fan](/actions/fan.turn_on/) or [Turn off fan](/actions/fan.turn_off/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle the guest room fan at bedtime

If the fan is usually off at night but sometimes already running, a toggle lets one automation handle both cases.

- **Trigger**: Time: 22:15
- **Action**: Toggle fan
- **Target**: Guest room fan

{% details "YAML example for a bedtime toggle" %}

{% example %}
automation: |
  alias: "Toggle guest room fan at bedtime"
  triggers:
    - trigger: time
      at: "22:15:00"
  actions:
    - action: fan.toggle
      target:
        entity_id: fan.guest_room
{% endexample %}

{% enddetails %}

### Automation: toggle the patio fan when the deck light turns on

If you use the deck in the evening, the patio fan can follow the deck light with a single action.

- **Trigger**: State: Deck light changes to on
- **Action**: Toggle fan
- **Target**: Patio fan

{% details "YAML example for a patio fan toggle" %}

{% example %}
automation: |
  alias: "Toggle patio fan with deck light"
  triggers:
    - trigger: state
      entity_id: light.deck
      to: "on"
  actions:
    - action: fan.toggle
      target:
        entity_id: fan.patio
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
