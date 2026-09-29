---
title: "Text is equal to"
condition: text.is_equal_to
domain: text
description: "Tests if one or more text entities are equal to a specified value."
---

The **Text is equal to** condition passes when a text {% term entity %} holds a specific value. It works with both [Text](/integrations/text/) entities and [Text helpers](/integrations/input_text/). Use it to branch an automation based on a stored note, only continue when a device reports a known status string, or check that a code helper matches an expected value.

{% include conditions/ui_header.md %}

To use **Text is equal to** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the text entity or text helper you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Text is equal to**.
6. Under **Value**, enter the text the entity must match.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Under **For at least**, set how long the entity must have held the value.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Value:
  description: The text the entity must match for the condition to pass. The comparison is exact and case-sensitive.
  required: true
Condition passes if:
  description: When multiple text entities are targeted, controls whether **Any** targeted entity must match the value or **All** targeted entities must match.
  required: false
For at least:
  description: How long the entity must have held the value for the condition to pass. The default is zero (no minimum duration).
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `text.is_equal_to`. A basic example looks like this:

{% example %}
condition: |
  condition: text.is_equal_to
  target:
    entity_id: input_text.house_mode
  options:
    value: "away"
{% endexample %}

This passes when `input_text.house_mode` is set to `away`.

### Options in YAML

{% options_yaml %}
value:
  description: The text the entity must match for the condition to pass. The comparison is exact and case-sensitive.
  required: true
  type: string
behavior:
  description: When multiple text entities are targeted, controls whether `any` or `all` targeted entities must match the value.
  required: false
  type: string
  default: any
for:
  description: How long the entity must have held the value for the condition to pass. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The comparison is exact and case-sensitive: `Away` and `away` are not equal.
- A text entity in the `unknown` or `unavailable` state never matches a value.
- To react when a text value changes instead of testing the current value, use the [Text changed](/triggers/text.changed/) trigger.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only run a goodbye routine when the house mode is set to away

When you leave home, this automation checks that the **house mode** helper is set to `away` before turning off the lights and locking the door.

- **Trigger**: State: Person leaves home
- **Condition**: Text is equal to
  - **Target**: House mode
  - **Value**: `away`
- **Action**: Turn off light
  - **Target**: Living room light
- **Action**: Lock lock
  - **Target**: Front door

{% details "YAML example for an away-mode goodbye routine" %}

{% example %}
automation: |
  alias: "Goodbye routine when house mode is away"
  triggers:
    - trigger: state
      entity_id: person.me
      from: "home"
  conditions:
    - condition: text.is_equal_to
      target:
        entity_id: input_text.house_mode
      options:
        value: "away"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.living_room
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
