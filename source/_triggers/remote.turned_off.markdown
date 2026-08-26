---
title: "Remote turned off"
trigger: remote.turned_off
domain: remote
description: "Triggers after one or more remotes turn off."
related_triggers:
  - remote.turned_on
---

The **Remote turned off** trigger fires after a remote {% term entity %} turns off. Use it to react when a media remote, IR blaster, or RF bridge stops being active, for example to clean up a related scene or shut down other devices.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the remote you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Remote turned off**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the remote must stay off before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple remotes are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted remote turns off.
    - **First**: fires only when the first of a group turns off.
    - **All**: fires only after every targeted remote is off.
For at least:
  description: How long the remote must stay off before the trigger fires. Default is zero (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Remote turned off** is referred to as `remote.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: remote.turned_off
  target:
    entity_id: remote.living_room
{% endexample %}

This fires every time `remote.living_room` transitions to the off state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple remotes are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted remote turns off.
    - `first`: fires only when the first remote turns off.
    - `all`: fires only after every targeted remote is off.
  required: false
  type: string
  default: each
for:
  description: |
    How long the remote must stay off before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the remote has stayed off for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Remotes that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped and do not count as turning off. The trigger only fires on a transition from a known, valid state to off.
- If the remote turns on again before the **For at least** time finishes, the timer resets.
- To react when a remote starts instead, use [Remote turned on](/triggers/remote.turned_on/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: restore the lights when the living room remote turns off

When you turn the living room remote off, restore the lights to their normal evening level.

- **Trigger**: Remote turned off
  - **Target**: Living room remote
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for restoring the lights" %}

{% example %}
automation: |
  alias: "Restore lights when living room remote turns off"
  triggers:
    - trigger: remote.turned_off
      target:
        entity_id: remote.living_room
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness_pct: 80
{% endexample %}

{% enddetails %}

### Automation: send a notification once every remote in the house is off

When the last remote in the house has been off for five minutes, send a phone notification so you know the entertainment area is fully shut down.

- **Trigger**: Remote turned off
  - **Target**: All remotes (by label)
  - **Trigger when**: All
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an all-remotes-off notification" %}

{% example %}
automation: |
  alias: "Notify when every remote is off"
  triggers:
    - trigger: remote.turned_off
      target:
        label_id: all_remotes
      options:
        behavior: all
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "All remotes are off."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
