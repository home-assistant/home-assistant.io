---
title: "Set holiday"
action: eurotronic_cometblue.set_holiday
domain: eurotronic_cometblue
description: "Set holiday/away mode on a thermostat."
since: "2026.7"
---

The **Set holiday** action enables holiday mode on a Eurotronic Comet Blue thermostat.

While holiday mode is active, the thermostat uses the temperature you set here instead of following its normal schedule.

{% important %}

If the thermostat is in holiday mode, you cannot control it from Home Assistant. To reset it, press and hold the `MENU` button on the thermostat until it resets.

{% endimportant %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Eurotronic Comet Blue: Set holiday (away mode)**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick one or more thermostats.
7. Set **From**, **To**, and **Temperature**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
From:
  description: Start date and time for holiday mode. Must be in the future.
  required: true
To:
  description: End date and time for holiday mode.
  required: true
Temperature:
  description: Temperature to maintain while holiday mode is active.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `eurotronic_cometblue.set_holiday`. A basic example looks like this:

{% example %}
action: |
  action: eurotronic_cometblue.set_holiday
  target:
    entity_id: climate.living_room_radiator
  data:
    from: "2026-12-24 17:00:00"
    to: "2026-12-31 23:30:00"
    temperature: 17
{% endexample %}

This puts `climate.living_room_radiator` into holiday mode from December 24 at 5:00 PM until December 31 at 11:30 PM and keeps the thermostat at 17°C during that time.

### Options in YAML

{% options_yaml %}
from:
  description: >
    Start date and time for holiday mode. Must be in the future.
  required: true
  type: datetime
to:
  description: >
    End date and time for holiday mode.
  required: true
  type: datetime
temperature:
  description: >
    Temperature to maintain while holiday mode is active. Accepts a value
    between 8 and 28.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The thermostat does not follow its normal schedule while holiday mode is active.
- The temperature range for this action is 8°C to 28°C in steps of 0.5°C.
- To end holiday mode early, you need to reset it on the thermostat itself.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}