---
title: "Turn off via remote"
action: remote.turn_off
domain: remote
description: "Sends the turn off command through a remote entity."
related_actions:
  - remote.turn_on
  - remote.toggle
  - remote.send_command
---

The **Turn off via remote** action sends the turn off command through a remote {% term entity %}. Use it when an automation or script should power off a device controlled by a remote, such as a TV, receiver, or media system.

{% include actions/ui_header.md %}

To turn something off from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the remote entity, device, area, floor, or label that should send the command.
6. From the actions shown for that target, select **Turn off via remote**.
7. Select **Save**.

### Options in the UI

This action has no additional UI options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `remote.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: remote.turn_off
  target:
    entity_id: remote.living_room
{% endexample %}

This sends the turn off command through `remote.living_room`.

### Options in YAML

This action has no additional YAML options.

{% include actions/targets.md %}

## Good to know

- The action targets remote entities.
- If the remote is unavailable, Home Assistant cannot send the command.
- To turn the remote on, use [Turn on via remote](/actions/remote.turn_on/). To switch between on and off with one action, use [Toggle via remote](/actions/remote.toggle/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off the media system at bedtime

At 23:00, turn off the living room remote.

- **Trigger**: Time
  - **At**: 23:00
- **Action**: Turn off via remote
  - **Target**: Living room remote

{% details "YAML example for turning off a remote at bedtime" %}

{% example %}
automation: |
  alias: "Turn off living room remote at bedtime"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: remote.turn_off
      target:
        entity_id: remote.living_room
{% endexample %}

{% enddetails %}

### Automation: turn off the remote when everyone leaves

When a person leaves home, turn off the media remote.

- **Trigger**: State
  - **Entity**: Paulus (`person.paulus`)
  - **To**: Not home
- **Action**: Turn off via remote
  - **Target**: Living room remote

{% details "YAML example for turning off a remote after leaving" %}

{% example %}
automation: |
  alias: "Turn off living room remote when Paulus leaves"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: not_home
  actions:
    - action: remote.turn_off
      target:
        entity_id: remote.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
