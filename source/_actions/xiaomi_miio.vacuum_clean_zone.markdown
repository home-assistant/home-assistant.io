---
title: "Vacuum clean zone"
action: xiaomi_miio.vacuum_clean_zone
domain: xiaomi_miio
description: "Starts a Xiaomi robot vacuum cleaning one or more rectangular zones."
related_actions:
  - xiaomi_miio.vacuum_clean_segment
  - xiaomi_miio.vacuum_goto
---

The **Vacuum clean zone** action starts a Xiaomi robot vacuum cleaning one or more rectangular zones. You define each zone with a set of coordinates, and you choose how many times the vacuum cleans each one.

{% include actions/ui_header.md %}

To clean a zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xiaomi robot vacuum you want to control.
6. From the actions shown for that target, select **Vacuum clean zone**.
7. Enter the **Zone** coordinates and the number of **Repeats**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: A list of zones. Each zone is a list of four integers that describe the start and end coordinates of a rectangle.
  required: true
Repeats:
  description: The number of times to clean each zone, between 1 and 3.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.vacuum_clean_zone`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.vacuum_clean_zone
  target:
    entity_id: vacuum.xiaomi_vacuum
  data:
    repeats: 1
    zone:
      - [30914, 26007, 35514, 28807]
      - [20232, 22496, 26032, 26496]
{% endexample %}

This cleans two zones once each on `vacuum.xiaomi_vacuum`.

### Options in YAML

{% options_yaml %}
zone:
  description: A list of zones. Each zone is a list of four integers that describe the start and end coordinates of a rectangle.
  required: true
  type: list
repeats:
  description: The number of times to clean each zone, between 1 and 3.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

Each zone is a list of four integers in the form `[x1, y1, x2, y2]`. The first pair is one corner of the rectangle, and the second pair is the opposite corner. For example, `[23510, 25311, 25110, 26361]` starts a box at the `23510, 25311` coordinates and expands it diagonally to the `25110, 26361` coordinates.

{% include actions/targets.md domain="vacuum" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
