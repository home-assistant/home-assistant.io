---
title: "Clean room"
action: sharkiq.clean_room
domain: sharkiq
description: "Cleans a specific user-defined room or set of rooms."
---

The **Clean room** action sends a Shark IQ robot vacuum to clean one or more specific rooms, instead of cleaning the whole home. The available rooms are the ones you have set up in the Shark Clean app.

Use this action if you want targeted cleanups. For example, create an automation to clean only the kitchen after dinner without running a full cleaning cycle.

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

This sends the Shark IQ vacuum `vacuum.my_vacuum` to clean the entry and the living room.

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

- Write each room name exactly as it appears in the Shark Clean app. To find the names Home Assistant understands, check the `Rooms` attribute of your Shark robot vacuum entity, for example in the [Developer tools](/docs/tools/dev-tools/).
- If you use the area selector in the UI, format the area names to match the names in the vacuum's `Rooms` attribute.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clean the kitchen and dining room after dinner

Create an automation that, after dinner, sends the vacuum only to the kitchen and dining room, skipping a full-home cycle.

- **Trigger**: Time: 20:30
- **Action**: Shark IQ: Clean room
  - **Targets**: Kitchen and dining room

{% details "YAML example for cleaning specific rooms after dinner" %}

{% example %}
automation: |
  alias: "Clean kitchen and dining room after dinner"
  triggers:
  - trigger: time
    at: "20:30:00"
  actions:
  - action: sharkiq.clean_room
    target:
      entity_id: vacuum.shark_iq
    data:
      rooms:
        - "Kitchen"
        - "Dining Room"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
