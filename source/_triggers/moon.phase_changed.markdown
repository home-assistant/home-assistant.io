---
title: "Moon phase changed"
trigger: moon.phase_changed
domain: moon
description: "Triggers when the moon enters a new phase."
---

The **Moon phase changed** trigger fires when the moon moves into a new phase, such as from waxing gibbous to full moon. Home Assistant works the phase out from the date, so the trigger needs no account, no internet connection, and no location.

Use it to follow the rhythm of the lunar month in your home, for example to send a notification on the night of a full moon, play a scene at every new moon, or start a garden routine when the moon reaches its first quarter.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Moon: Moon phase changed**.
5. Under **Phase**, keep **Any** to trigger on every phase change, or select a single phase to trigger only when the moon enters that phase.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Phase:
  description: |
    Which phase change fires the trigger:

    - **Any**: every time the moon enters a new phase. This is the default.
    - A specific phase, such as **Full moon** or **New moon**: only when the moon enters that phase.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `moon.phase_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: moon.phase_changed
{% endexample %}

This fires whenever the phase changes. To trigger on a single phase, add the `phase` option:

{% example %}
trigger: |
  trigger: moon.phase_changed
  options:
    phase: full_moon
{% endexample %}

### Options in YAML

{% options_yaml %}
phase:
  description: >
    Limit the trigger to a single moon phase. Accepts `any` (every phase change) or one of `new_moon`, `waxing_crescent`, `first_quarter`, `waxing_gibbous`, `full_moon`, `waning_gibbous`, `last_quarter`, or `waning_crescent`.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. Home Assistant calculates the phase from the current local date, so it does not depend on your [home location](/docs/configuration/basic/).
- The phase is based on the date, so Home Assistant checks for a phase change once per day, at midnight (local time).
- With a specific phase selected, the trigger fires at the daily check when Home Assistant detects that the moon has entered that phase, not for the whole time the moon stays in it. To test whether the moon is currently in a phase, use the [Moon phase](/conditions/moon.is_phase/) condition instead.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next phase change, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: run a scene on the full moon

When the moon turns full, activate a moonlit scene in the living room.

- **Trigger**: Moon phase changed
  - **Phase**: Full moon
- **Action**: Activate scene
  - **Target**: Full moon scene

{% details "YAML example for a full moon scene" %}

{% example %}
automation: |
  alias: "Full moon scene"
  triggers:
    - trigger: moon.phase_changed
      options:
        phase: full_moon
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.full_moon
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
