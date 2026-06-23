---
title: "Solar midnight"
trigger: sun.solar_midnight
domain: sun
description: "Triggers when the sun reaches its lowest point."
related_triggers:
  - sun.solar_noon
  - sun.sunset
  - sun.elevation_changed
---

The **Solar midnight** trigger fires when the sun reaches its lowest point below the horizon for the day. This is the astronomical midpoint between sunset and sunrise, and it rarely lands exactly at 00:00 on the clock. Home Assistant calculates the exact time from your [home location](/docs/configuration/basic/).

Use it as a reliable "deep night" marker: run a nightly maintenance task, reset daily counters, or make sure everything is switched off at the darkest point of the night.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Sun: Solar midnight**.
5. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.solar_midnight`. It has no options:

{% example %}
trigger: |
  trigger: sun.solar_midnight
{% endexample %}

This fires every day, the moment the sun reaches its lowest point.

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- Solar midnight is the moment the sun is opposite the meridian, not 00:00 on the clock. The clock time drifts through the year and depends on your longitude within your time zone.
- To act on the opposite moment, when the sun is at its highest, use [Solar noon](/triggers/sun.solar_noon/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next solar midnight, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: reset a daily counter at solar midnight

At the darkest point of the night, reset a counter so it starts fresh for the new day.

- **Trigger**: Solar midnight
- **Action**: Reset counter
  - **Target**: Daily counter

{% details "YAML example for resetting a counter at solar midnight" %}

{% example %}
automation: |
  alias: "Reset daily counter at solar midnight"
  triggers:
    - trigger: sun.solar_midnight
  actions:
    - action: counter.reset
      target:
        entity_id: counter.daily_runs
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
