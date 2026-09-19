---
title: "Turn on via remote"
action: remote.turn_on
domain: remote
description: "Sends the turn on command through a remote entity. Some remotes can also start a specific activity."
related_actions:
  - remote.turn_off
  - remote.toggle
  - remote.send_command
---

The **Turn on via remote** action sends the turn on command through a remote {% term entity %}. Use it when an automation or script should power on a device controlled by a remote, such as a TV, receiver, or media system.

Some remote integrations support activities. When they do, you can also choose which saved activity to start.

{% include actions/ui_header.md %}

To turn something on from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the remote entity, device, area, floor, or label that should send the command.
6. From the actions shown for that target, select **Turn on via remote**.
7. _Optional_: In **Activity**, enter the activity to start. This field is available only for remote entities that support activities.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Activity:
  description: Activity ID or activity name to start. This option is available only for remote entities that support activities.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `remote.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: remote.turn_on
  target:
    entity_id: remote.living_room
{% endexample %}

This sends the turn on command through `remote.living_room`.

### Options in YAML

{% options_yaml %}
activity:
  description: >
    Activity ID or activity name to start. This option works only with remote entities that support activities.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The action targets remote entities.
- The **Activity** option is shown only when the selected remote supports activities.
- If the remote is unavailable, Home Assistant cannot send the command.
- To turn the remote off, use [Turn off via remote](/actions/remote.turn_off/). To switch between on and off with one action, use [Toggle via remote](/actions/remote.toggle/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start a saved activity at sunset

At sunset, start a saved evening activity on a remote that supports activities.

- **Trigger**: Sun
  - **Event**: Sunset
- **Action**: Turn on via remote
  - **Target**: Living room remote
  - **Activity**: Evening TV

{% details "YAML example for starting an evening activity" %}

{% example %}
automation: |
  alias: "Start evening TV activity at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: remote.turn_on
      target:
        entity_id: remote.living_room
      data:
        activity: "Evening TV"
{% endexample %}

{% enddetails %}

### Automation: turn on the media system when someone arrives home

When a person arrives home after dark, turn on the living room remote.

- **Trigger**: State
  - **Entity**: Paulus (`person.paulus`)
  - **To**: Home
- **Condition**: Sun is below horizon
- **Action**: Turn on via remote
  - **Target**: Living room remote

{% details "YAML example for turning on a remote after arrival" %}

{% example %}
automation: |
  alias: "Turn on living room remote after arrival"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: home
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: remote.turn_on
      target:
        entity_id: remote.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
