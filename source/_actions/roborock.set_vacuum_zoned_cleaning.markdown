---
title: "Clean zone"
action: roborock.set_vacuum_zoned_cleaning
domain: roborock
description: "Starts cleaning a rectangular zone with a Roborock vacuum."
related_actions:
  - roborock.get_vacuum_current_position
  - roborock.set_vacuum_goto_position
  - roborock.get_maps
---

Use this action to clean one rectangular zone instead of the whole floor. You define the zone with two opposite corners, each given as an X and Y coordinate on the vacuum's map.

Use it to clean the spot under the dining table after dinner, or the hallway after someone walked in with muddy shoes.

{% include actions/ui_header.md %}

To clean a zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Roborock vacuum you want to clean with.
6. From the actions shown for that target, select **Clean zone**.
7. Enter the **X1-coordinate** and **Y1-coordinate** of one corner of the zone, and the **X2-coordinate** and **Y2-coordinate** of the opposite corner.
8. Set **Repeats** to how many extra passes you want. `0` cleans the zone once.
9. Select **Save**.

### Options in the UI

{% options_ui %}
X1-coordinate:
  description: "The X-coordinate of the first corner of the zone. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
Y1-coordinate:
  description: "The Y-coordinate of the first corner of the zone. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
X2-coordinate:
  description: "The X-coordinate of the opposite corner of the zone. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
Y2-coordinate:
  description: "The Y-coordinate of the opposite corner of the zone. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
Repeats:
  description: "How many extra passes the vacuum makes over the zone. `0` cleans the zone once, `1` cleans it twice, and `2` cleans it three times."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `roborock.set_vacuum_zoned_cleaning`. A basic example looks like this:

{% example %}
action: |
  action: roborock.set_vacuum_zoned_cleaning
  target:
    entity_id: vacuum.roborock_s7
  data:
    x1: 28582
    y1: 21363
    x2: 27425
    y2: 22816
    # Clean the zone once, then go over it a second time.
    repeats: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
x1:
  description: "The X-coordinate of the first corner of the zone. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
  required: true
  type: integer
y1:
  description: "The Y-coordinate of the first corner of the zone. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
  required: true
  type: integer
x2:
  description: "The X-coordinate of the opposite corner of the zone. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
  required: true
  type: integer
y2:
  description: "The Y-coordinate of the opposite corner of the zone. Coordinates are relative to the dock: x=25500, y=25500 is the dock position."
  required: true
  type: integer
repeats:
  description: >
    How many extra passes the vacuum makes over the zone. `0` cleans the zone
    once, `1` cleans it twice, and `2` cleans it three times.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="vacuum" %}

## Good to know

- The coordinates use the vacuum's own map, the same one used by [Get current position](/actions/roborock.get_vacuum_current_position/) and [Go to position](/actions/roborock.set_vacuum_goto_position/). The dock sits at around x=25500, y=25500.
- To find the coordinates of a spot, drive the vacuum there and then use [Get current position](/actions/roborock.get_vacuum_current_position/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
