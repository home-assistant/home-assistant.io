---
title: "Remote turned on"
trigger: remote.turned_on
domain: remote
description: "Triggers after one or more remotes turn on."
related_triggers:
  - remote.turned_off
---

The **Remote turned on** trigger fires after a remote {% term entity %} turns on. Use it to start an automation when a media remote, IR blaster, or RF bridge becomes active, whether that happened from the UI, an action call, or a physical button.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the remote you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Remote turned on**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the remote must stay on before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple remotes are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted remote turns on.
    - **First**: fires only when the first of a group turns on.
    - **All**: fires only after every targeted remote is on.
  required: false
For at least:
  description: How long the remote must stay on before the trigger fires. Default is zero (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Remote turned on** is referred to as `remote.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: remote.turned_on
  target:
    entity_id: remote.living_room
{% endexample %}

This fires every time `remote.living_room` transitions from off to on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple remotes are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted remote turns on.
    - `first`: fires only when the first remote turns on.
    - `all`: fires only after every targeted remote is on.
  required: false
  type: string
  default: each
for:
  description: |
    How long the remote must stay on before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the remote has stayed on for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Remotes that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped and do not count as turning on. The trigger only fires on a transition from a known, valid state to on.
- If the remote turns off before the **For at least** time finishes, the timer resets.
- To react when a remote stops instead, use [Remote turned off](/triggers/remote.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: dim the lights when the living room remote turns on

When you power on the living room remote, dim the lights for a movie-friendly atmosphere.

- **Trigger**: Remote turned on
  - **Target**: Living room remote
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for dimming the lights" %}

{% example %}
automation: |
  alias: "Dim lights when living room remote turns on"
  triggers:
    - trigger: remote.turned_on
      target:
        entity_id: remote.living_room
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness_pct: 30
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
