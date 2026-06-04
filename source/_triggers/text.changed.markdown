---
title: "Text changed"
trigger: text.changed
domain: text
description: "Triggers after the value of one or more text entities changes."
---

The **Text changed** trigger fires after the value of a text {% term entity %} changes. It works with both [Text](/integrations/text/) entities exposed by your devices and integrations, and with [Text helpers](/integrations/input_text/). Use it to react when someone enters a new shopping list note, when a device reports a new status string, or when an automation updates a stored value.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Text changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the text entity or text helper you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Text changed**.
6. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `text.changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: text.changed
  target:
    entity_id: input_text.shopping_note
{% endexample %}

This fires whenever the value of `input_text.shopping_note` changes.

{% include triggers/targets.md %}

## Good to know

- The trigger does not fire when a text entity becomes `unknown` or `unavailable`, or when it recovers from those states without a real value change.
- To check that a text entity holds a specific value before continuing, use the [Text is equal to](/conditions/text.is_equal_to/) condition.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: announce a new shopping note

Whenever you update a shopping note helper, send the new value to your phone so you don't forget what you just typed.

- **Trigger**: Text changed
  - **Target**: Shopping note
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The new note value

{% details "YAML example for announcing a new shopping note" %}

{% example %}
automation: |
  alias: "Announce new shopping note"
  triggers:
    - trigger: text.changed
      target:
        entity_id: input_text.shopping_note
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Shopping note updated: {{ states('input_text.shopping_note') }}"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
