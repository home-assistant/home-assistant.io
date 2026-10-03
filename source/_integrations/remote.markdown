---
title: Remote
description: Instructions on how to set up your remotes with Home Assistant.
ha_release: 0.34
ha_domain: remote
ha_category:
  - Remote
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Remote** {% term integration %} manages remote entities and lets you control devices through them.

- Maintains a state for each of your remotes.
- Provides actions to turn remotes on or off, toggle them, send commands, learn commands, and delete commands.

{% include integrations/building_block_integration.md %}

## Remote states

A remote entity can have the following states. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **On** (`on`): The remote is turned on.
- **Off** (`off`): The remote is turned off.

In addition, the entity can have the following states:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

{% include integrations/triggers_conditions_actions.md %}

## Remote automation examples

These examples show common ways to use remote actions in automations. The exact command names and devices depend on your remote integration.

{% include docs/paste_yaml_tip.md %}

### Automation: send a play command after the TV turns on

When the living room remote turns on, wait briefly and send a play command to the TV.

- **Trigger**: Remote turned on
  - **Target**: Living room remote
- **Action**: Send remote command
  - **Target**: Living room remote
  - **Device**: television
  - **Command**: play

{% details "YAML example for sending a play command" %}

{% example %}
automation: |
  alias: "Send play when the TV remote turns on"
  triggers:
    - trigger: remote.turned_on
      target:
        entity_id: remote.living_room
  actions:
    - delay: "00:00:05"
    - action: remote.send_command
      target:
        entity_id: remote.living_room
      data:
        device: television
        command: play
{% endexample %}

{% enddetails %}

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
