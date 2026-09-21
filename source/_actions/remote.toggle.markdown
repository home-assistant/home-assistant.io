---
title: "Toggle via remote"
action: remote.toggle
domain: remote
description: "Sends the toggle command through a remote entity."
related_actions:
  - remote.turn_on
  - remote.turn_off
  - remote.send_command
---

The **Toggle via remote** action sends the toggle command through a remote {% term entity %}. Use it when the controlled device uses the same command for on and off.

{% include actions/ui_header.md %}

To toggle something from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the remote entity, device, area, floor, or label that should send the command.
6. From the actions shown for that target, select **Toggle via remote**.
7. Select **Save**.

### Options in the UI

This action has no additional UI options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `remote.toggle`. A basic example looks like this:

{% example %}
action: |
  action: remote.toggle
  target:
    entity_id: remote.living_room
{% endexample %}

This sends the toggle command through `remote.living_room`.

### Options in YAML

This action has no additional YAML options.

{% include actions/targets.md %}

## Good to know

- The action targets remote entities.
- Toggle commands change state based on the device's current state. If you need a predictable on or off result, use [Turn on via remote](/actions/remote.turn_on/) or [Turn off via remote](/actions/remote.turn_off/) when your remote supports them.
- If the remote is unavailable, Home Assistant cannot send the command.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle the media system from a dashboard button

When a user-created {% term helper %} button, created separately, is pressed, toggle the living room remote.

- **Trigger**: State
  - **Entity**: Media toggle (`input_button.media_toggle`)
- **Action**: Toggle via remote
  - **Target**: Living room remote

{% details "YAML example for toggling a remote from a helper button" %}

{% example %}
automation: |
  alias: "Toggle living room remote from helper button"
  triggers:
    - trigger: state
      entity_id: input_button.media_toggle
  actions:
    - action: remote.toggle
      target:
        entity_id: remote.living_room
{% endexample %}

{% enddetails %}

### Automation: toggle a remote when someone enters a zone

When a person enters the cinema zone, toggle the projector remote.

- **Trigger**: Zone
  - **Entity**: Paulus (`person.paulus`)
  - **Zone**: Cinema (`zone.cinema`)
  - **Event**: Enter
- **Action**: Toggle via remote
  - **Target**: Projector remote

{% details "YAML example for toggling a remote from a zone trigger" %}

{% example %}
automation: |
  alias: "Toggle projector remote when Paulus enters cinema zone"
  triggers:
    - trigger: zone
      entity_id: person.paulus
      zone: zone.cinema
      event: enter
  actions:
    - action: remote.toggle
      target:
        entity_id: remote.projector
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
