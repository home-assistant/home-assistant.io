---
title: "Go to position"
action: roborock.set_vacuum_goto_position
domain: roborock
description: "Sends a Roborock vacuum to a specific position."
related_actions:
  - roborock.get_vacuum_current_position
  - roborock.set_vacuum_zoned_cleaning
  - roborock.get_maps
---

Use this action to send a Roborock vacuum to a specific position on its map. You give the position as X and Y coordinates, which are relative to the dock.

{% include actions/ui_header.md %}

To send a vacuum to a position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Roborock vacuum you want to send.
6. From the actions shown for that target, select **Go to position**.
7. Enter the **X-coordinate** and **Y-coordinate** you want the vacuum to go to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
X-coordinate:
  description: "The X-coordinate to send the vacuum to. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
Y-coordinate:
  description: "The Y-coordinate to send the vacuum to. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `roborock.set_vacuum_goto_position`. A basic example looks like this:

{% example %}
action: |
  action: roborock.set_vacuum_goto_position
  target:
    entity_id: vacuum.roborock_s7
  data:
    x: 27500
    y: 32000
{% endexample %}

### Options in YAML

{% options_yaml %}
x:
  description: "The X-coordinate to send the vacuum to. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
  required: true
  type: integer
y:
  description: "The Y-coordinate to send the vacuum to. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="vacuum" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
