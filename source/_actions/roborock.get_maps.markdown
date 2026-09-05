---
title: "Get maps"
action: roborock.get_maps
domain: roborock
description: "Retrieves the map and room information of a Roborock vacuum."
related_actions:
  - roborock.set_vacuum_goto_position
  - roborock.set_vacuum_zoned_cleaning
  - roborock.get_vacuum_current_position
---

Use this action to retrieve the maps available on a Roborock vacuum, along with details about any named rooms on each map. This returns the name of each map and the name and ID number of each room.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. It does not move the vacuum.

{% include actions/ui_header.md %}

To get a vacuum's maps from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Roborock vacuum whose maps you want to retrieve.
6. From the actions shown for that target, select **Get maps**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `roborock.get_maps`. A basic example looks like this:

{% example %}
action: |
  action: roborock.get_maps
  target:
    entity_id: vacuum.roborock_s7
  response_variable: vacuum_maps
{% endexample %}

This action has no additional options in YAML.

{% include actions/targets.md domain="vacuum" %}

## Response data

The action returns the name of each map and the name and ID number of each room on it. You can use the room IDs to clean a specific room.

{% include actions/stuck.md %}

{% include actions/related.md %}
