---
title: "Vacuum clean segment"
action: xiaomi_miio.vacuum_clean_segment
domain: xiaomi_miio
description: "Starts a Xiaomi robot vacuum cleaning one or more segments or rooms."
related_actions:
  - xiaomi_miio.vacuum_clean_zone
  - xiaomi_miio.vacuum_goto
---

The **Vacuum clean segment** action starts a Xiaomi robot vacuum cleaning one or more segments. A segment is a room that the vacuum has mapped, identified by a number. To find out which numbers map to which rooms, see [Retrieving room numbers](/integrations/xiaomi_miio/#retrieving-room-numbers).

{% include actions/ui_header.md %}

To clean a segment from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xiaomi robot vacuum you want to control.
6. From the actions shown for that target, select **Vacuum clean segment**.
7. Enter the **Segments** to clean.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Segments:
  description: A single segment number or a list of segment numbers to clean.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.vacuum_clean_segment`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.vacuum_clean_segment
  target:
    entity_id: vacuum.xiaomi_vacuum
  data:
    segments: [1, 2]
{% endexample %}

This cleans segments 1 and 2 on `vacuum.xiaomi_vacuum`. To clean a single segment, pass a single number, such as `segments: 1`.

### Options in YAML

{% options_yaml %}
segments:
  description: A single segment number or a list of segment numbers to clean.
  required: true
  type: [integer, list]
{% endoptions_yaml %}

## Good to know

- To clean a room more than once, repeat its number in the list. For example, `segments: [1, 1]` cleans segment 1 twice.

{% include actions/targets.md domain="vacuum" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
