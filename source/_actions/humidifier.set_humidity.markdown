---
title: "Set humidifier target humidity"
action: humidifier.set_humidity
domain: humidifier
description: "Sets the target humidity of a humidifier."
related_actions:
  - humidifier.set_mode
  - humidifier.turn_on
  - humidifier.turn_off
  - humidifier.toggle
---

Use this action to set the target humidity of a humidifier, for example to keep a room at a comfortable level.

{% include actions/ui_header.md %}

To set the target humidity from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the humidifier you want to set.
6. From the actions shown for that target, select **Set humidifier target humidity**.
7. Set the **Humidity** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Humidity:
  description: The target humidity as a percentage, from 0 to 100.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `humidifier.set_humidity`. A basic example looks like this:

{% example %}
action: |
  action: humidifier.set_humidity
  target:
    entity_id: humidifier.bedroom
  data:
    humidity: 60
{% endexample %}

This sets the target humidity of `humidifier.bedroom` to 60%.

### Options in YAML

{% options_yaml %}
humidity:
  description: The target humidity as a percentage, from 0 to 100.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with humidifier entities.
- The accepted humidity range can be narrower than 0 to 100, depending on your humidifier. The action fails if the value is outside the range your device supports.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: raise the target humidity in the morning

Set a humidifier to a specific target humidity at a set time.

- **Trigger**: Time: 07:15
- **Action**: Set humidifier target humidity
  - **Target**: Bedroom humidifier
  - **Humidity**: 60

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Raise the bedroom humidity in the morning"
    triggers:
      - trigger: time
        at: "07:15:00"
    actions:
      - action: humidifier.set_humidity
        target:
          entity_id: humidifier.bedroom
        data:
          humidity: 60
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
