---
title: "Set humidifier mode"
action: humidifier.set_mode
domain: humidifier
description: "Sets the mode of a humidifier."
related_actions:
  - humidifier.set_humidity
  - humidifier.turn_on
  - humidifier.turn_off
  - humidifier.toggle
---

Use this action to set the operating mode of a humidifier, for example to switch it to an eco or away mode. This action only works if your humidifier supports several modes. The available modes and what each one does depend on the device.

{% include actions/ui_header.md %}

To set the mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the humidifier you want to set.
6. From the actions shown for that target, select **Set humidifier mode**.
7. Set the **Mode** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: The operation mode to set. It must be one of the modes your humidifier supports, for example "normal", "eco", or "away".
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `humidifier.set_mode`. A basic example looks like this:

{% example %}
action: |
  action: humidifier.set_mode
  target:
    entity_id: humidifier.bedroom
  data:
    mode: "eco"
{% endexample %}

This sets `humidifier.bedroom` to the `eco` mode.

### Options in YAML

{% options_yaml %}
mode:
  description: The operation mode to set. It must be one of the modes your humidifier supports, for example "normal", "eco", or "away".
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with humidifier entities that support modes.
- The action fails if the mode you provide is not one your humidifier supports. Check the documentation of the integration that provides the humidifier for its available modes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch a humidifier to eco mode in the morning

Set a humidifier to a specific mode at a set time, for example to run it more quietly during the day.

- **Trigger**: Time: 07:15
- **Action**: Set humidifier mode
  - **Target**: Bedroom humidifier
  - **Mode**: eco

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch the bedroom humidifier to eco mode"
    triggers:
      - trigger: time
        at: "07:15:00"
    actions:
      - action: humidifier.set_mode
        target:
          entity_id: humidifier.bedroom
        data:
          mode: "eco"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
