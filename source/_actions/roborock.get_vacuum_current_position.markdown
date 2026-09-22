---
title: "Get current position"
action: roborock.get_vacuum_current_position
domain: roborock
description: "Retrieves the current position of a Roborock vacuum."
related_actions:
  - roborock.set_vacuum_goto_position
  - roborock.set_vacuum_zoned_cleaning
  - roborock.get_maps
---

Use this action to retrieve the current position of a Roborock vacuum as X and Y coordinates.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. It does not move the vacuum.

{% include actions/ui_header.md %}

To get a vacuum's current position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Roborock vacuum whose position you want to retrieve.
6. From the actions shown for that target, select **Get current position**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `roborock.get_vacuum_current_position`. A basic example looks like this:

{% example %}
action: |
  action: roborock.get_vacuum_current_position
  target:
    entity_id: vacuum.roborock_s7
  response_variable: vacuum_position
{% endexample %}

This action has no additional options in YAML.

{% include actions/targets.md domain="vacuum" %}

## Response data

The action returns the X and Y coordinates of the vacuum, keyed by entity ID:

```yaml
vacuum.roborock_s7:
  x: 28081
  y: 25168
```

## Good to know

- This is a cloud call meant for diagnostics, not for automations. Frequent requests can lead to rate limiting.

{% include actions/stuck.md %}

{% include actions/related.md %}
