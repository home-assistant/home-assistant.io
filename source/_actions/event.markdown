---
title: "Fire manual event"
action: event
domain: built_in
description: "Fires a custom event that other automations can react to."
related_actions:
  - logbook.log
---

Use this action to fire an [event](/docs/configuration/events/). Other automations can react to it with a [**Manual event received** trigger](/triggers/event/). This lets one automation or script tell another that something happened, and pass data along.

{% include actions/ui_header.md %}

To fire an event from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Search for and select **Fire manual event**.
4. In **Event type**, enter the name of the event, for example, `event_light_state_changed`.
5. Optional: In **Event data**, enter the data to send with the event, in YAML.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Event type:
  description: The name of the event to fire.
  required: true
Event data:
  description: The data to send with the event, as keys and values in YAML. The values can be templates.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, use `event` with the event type, and optionally `event_data`:

{% example %}
action: |
  event: MY_EVENT
  event_data:
    room: kitchen
{% endexample %}

The values in `event_data` can be templates.

### Options in YAML

{% options_yaml %}
event:
  description: The name of the event to fire.
  required: true
  type: string
event_data:
  description: The data to send with the event. The values can be templates.
  required: false
  type: map
{% endoptions_yaml %}

## Good to know

- To fire an event by hand, for example, to test an automation that reacts to it, go to {% my tools_events title="**Settings** > **Tools** > **Events**" %}. For details, refer to [Firing an event](/docs/tools/dev-tools/#firing-an-event).
- To add an entry to the **Activity** panel, use the [**Log activity**](/actions/logbook.log/) action.

{% include actions/more_examples.md %}

### Automation: Fire a custom event when a switch turns on

When the kitchen switch turns on, this automation fires the custom event `event_light_state_changed`, with the new state as event data. The actions could also be part of a script.

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Fire event"
  triggers:
    - trigger: state
      entity_id: switch.kitchen
      to: "on"
  actions:
    - event: event_light_state_changed
      event_data:
        state: "on"
{% endexample %}

{% enddetails %}

### Automation: React to the custom event

This automation reacts to `event_light_state_changed` with a [**Manual event received** trigger](/triggers/event/), and uses the `state` from the event data in a notification. For the data you can use, refer to [available trigger data](/docs/automation/trigger-data/#trigger-properties).

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Capture event"
  triggers:
    - trigger: event
      event_type: event_light_state_changed
  actions:
    - action: notify.notify
      data:
        message: "The kitchen light is turned {{ trigger.event.data.state }}."
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
