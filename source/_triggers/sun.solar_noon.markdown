---
title: "Solar noon"
trigger: sun.solar_noon
domain: sun
description: "Triggers when the sun reaches its highest point."
related_triggers:
  - sun.solar_midnight
  - sun.sunrise
  - sun.elevation_changed
---

The **Solar noon** trigger fires when the sun reaches its highest point in the sky for the day. This is the astronomical midpoint between sunrise and sunset, and it rarely lands exactly at 12:00 on the clock. Home Assistant calculates the exact time from your [home location](/docs/configuration/basic/).

Use it to act when the sun is at its strongest: close blinds against the midday glare, run the most demanding loads while solar production peaks, or check in on a south-facing room.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Sun: Solar noon**.
5. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.solar_noon`. It has no options:

{% example %}
trigger: |
  trigger: sun.solar_noon
{% endexample %}

This fires every day, the moment the sun reaches its highest point.

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- Solar noon is the moment the sun crosses the meridian, not 12:00 on the clock. The clock time drifts through the year and depends on your longitude within your time zone.
- To act on the opposite moment, when the sun is at its lowest, use [Solar midnight](/triggers/sun.solar_midnight/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next solar noon, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: close the blinds against the midday sun

When the sun reaches its highest point, close the south-facing blinds to keep the room cool.

- **Trigger**: Solar noon
- **Action**: Close cover
  - **Target**: Living room blinds

{% details "YAML example for closing blinds at solar noon" %}

{% example %}
automation: |
  alias: "Close blinds at solar noon"
  triggers:
    - trigger: sun.solar_noon
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
