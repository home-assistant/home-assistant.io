---
title: "Clean room"
action: sharkiq.clean_room
domain: sharkiq
description: "Cleans a specific user-defined room or set of rooms."
---

The **Clean room** action sends a Shark IQ robot vacuum to clean one or more specific rooms, instead of cleaning the whole home. The rooms are the ones you have set up in the Shark Clean app.

This is useful for targeted cleanups, for example cleaning only the kitchen after dinner without running a full cycle.

{% include actions/ui_header.md %}

To clean specific rooms from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Shark IQ: Clean room**.
6. Under **Targets**, choose the vacuum entities to control.
7. Enter the **Rooms** to clean.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Rooms:
  description: The list of rooms to clean.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sharkiq.clean_room`. A basic example looks like this:

{% example %}
action: |
  action: sharkiq.clean_room
  target:
    entity_id: vacuum.my_vacuum
  data:
    rooms:
      - "Entry"
      - "Living Room"
{% endexample %}

### Options in YAML

{% options_yaml %}
rooms:
  description: >
    The list of rooms to clean.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="vacuum" %}

## Good to know

- Write each room name exactly as it appears in the Shark Clean app. To find the names Home Assistant understands, check the `Rooms` attribute of your Shark robot vacuum entity, for example with the [developer tools](/docs/tools/dev-tools/).
- If you use the area selector in the UI, format the area names to match the names in the vacuum's `Rooms` attribute.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
