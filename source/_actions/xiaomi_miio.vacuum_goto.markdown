---
title: "Vacuum go to"
action: xiaomi_miio.vacuum_goto
domain: xiaomi_miio
description: "Sends a Xiaomi robot vacuum to a specific coordinate on its map."
related_actions:
  - xiaomi_miio.vacuum_clean_zone
  - xiaomi_miio.vacuum_clean_segment
---

The **Vacuum go to** action sends a Xiaomi robot vacuum to a specific point on its map, defined by an x- and y-coordinate.

{% include actions/ui_header.md %}

To send the vacuum to a coordinate from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xiaomi robot vacuum you want to control.
6. From the actions shown for that target, select **Vacuum go to**.
7. Enter the **X coordinate** and **Y coordinate**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
X coordinate:
  description: The x-coordinate to send the vacuum to. The dock is at x-coordinate 25500.
  required: true
Y coordinate:
  description: The y-coordinate to send the vacuum to. The dock is at y-coordinate 25500.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.vacuum_goto`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.vacuum_goto
  target:
    entity_id: vacuum.xiaomi_vacuum
  data:
    x_coord: 27500
    y_coord: 32000
{% endexample %}

This sends `vacuum.xiaomi_vacuum` to the `27500, 32000` coordinates.

### Options in YAML

{% options_yaml %}
x_coord:
  description: The x-coordinate to send the vacuum to. The dock is at x-coordinate 25500.
  required: true
  type: integer
y_coord:
  description: The y-coordinate to send the vacuum to. The dock is at y-coordinate 25500.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- If the vacuum is moving and does not respond to this action, call the `vacuum.pause` or `vacuum.stop` action first, then try again.

{% include actions/targets.md domain="vacuum" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
