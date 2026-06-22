---
title: "Invoke custom function"
action: envisalink.invoke_custom_function
domain: envisalink
description: "Triggers a PGM output on a DSC alarm panel."
related_actions:
  - envisalink.alarm_keypress
---

Use this action to trigger a PGM (Programmable) output on a DSC alarm panel, for example to activate a relay or an auxiliary output wired to your panel.

{% include actions/ui_header.md %}

To trigger a PGM output from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Envisalink: Invoke custom function**.
6. Enter the **Partition** and the **PGM** output number to trigger.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Partition:
  description: The alarm panel partition to trigger the PGM output on. This is typically 1.
  required: true
PGM:
  description: The PGM output number to trigger on the alarm panel (1-4).
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `envisalink.invoke_custom_function`:

{% example %}
action: |
  action: envisalink.invoke_custom_function
  data:
    partition: "1"
    pgm: 2
{% endexample %}

This triggers PGM output 2 on partition 1.

### Options in YAML

{% options_yaml %}
partition:
  description: The alarm panel partition to trigger the PGM output on. This is typically 1.
  required: true
  type: string
pgm:
  description: The PGM output number to trigger on the alarm panel (1-4).
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- This action only works with DSC panels.
- You must set the alarm panel's `code` parameter in the integration configuration for this action to work.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: trigger an auxiliary output

Trigger a PGM output to activate an auxiliary output wired to your panel, for example a relay that opens a gate, when an input boolean is turned on.

- **Trigger**: State: Gate button turns on
- **Action**: Envisalink: Invoke custom function
  - **Partition**: `1`
  - **PGM**: `2`

{% details "Show example YAML" %}

{% example %}
automation: |
    alias: "Open the gate with a PGM output"
    triggers:
      - trigger: state
        entity_id: input_boolean.gate_button
        to: "on"
    actions:
      - action: envisalink.invoke_custom_function
        data:
          partition: "1"
          pgm: 2
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
