---
title: "Set circulation schedule"
action: vicare.set_circulation_schedule
domain: vicare
description: "Sets the DHW circulation pump weekly schedule."
related_actions:
  - vicare.set_vicare_mode
---

Use this action to configure the weekly schedule of the domestic hot water (<abbr title="domestic hot water">DHW</abbr>) circulation pump on your Viessmann device. The circulation pump keeps hot water moving through your pipes so it reaches the tap faster, at the cost of extra energy use, so most people only run it during the hours they actually need instant hot water.

{% include actions/ui_header.md %}

To set the circulation schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater entity you want to control.
6. From the actions shown for that target, select **Viessmann ViCare: Set circulation schedule**.
7. Enter the **Schedule**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Schedule:
  description: >
    A dictionary with one key per weekday (`mon` through `sun`). Each value
    is a list of time slots for that day, with a maximum of 4 slots per
    day. See [Good to know](#good-to-know) for the fields each slot needs.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vicare.set_circulation_schedule`. A basic example looks like this:

{% example %}
action: |
  action: vicare.set_circulation_schedule
  target:
    entity_id: water_heater.main_water_heater
  data:
    schedule:
      mon:
        - start: "06:00"
          end: "22:00"
          mode: "on"
          position: 0
      tue: []
      wed: []
      thu: []
      fri: []
      sat: []
      sun: []
{% endexample %}

This runs the circulation pump on Monday from 6:00 AM to 10:00 PM and turns it off for the rest of the week.

### Options in YAML

{% options_yaml %}
schedule:
  description: >
    A dictionary with one key per weekday (`mon` through `sun`). Each value
    is a list of time slots for that day, with a maximum of 4 slots per
    day. See [Good to know](#good-to-know) for the fields each slot needs.
  required: true
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="water_heater" %}

## Good to know

Each time slot in the schedule is a mapping with the following keys:

- `start`: Required. The time the pump turns on, as `HH:MM`, on a 10-minute resolution, such as `06:00` or `06:10`.
- `end`: Required. The time the pump turns off, as `HH:MM`, on a 10-minute resolution. Use `24:00` for midnight.
- `mode`: Required. Always `on`.
- `position`: Required. The slot's position among the day's slots, starting at `0`.

A day with no scheduled circulation must still be included in the schedule as an empty list, for example `tue: []`.

The current schedule is available as the `circulation_schedule` attribute of the water heater {% term entity %}. Not all devices support a circulation pump. If yours doesn't, this attribute is absent.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Turn off the circulation pump while you're away

This automation clears the circulation schedule when everyone leaves home, then you can pair it with a second automation that restores your regular schedule when someone returns.

- Trigger: everyone leaves home
- Action: set the circulation schedule
  - Target: the main water heater entity
  - Schedule: no time slots on any day

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Turn off circulation pump when away"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data:
        schedule:
          mon: []
          tue: []
          wed: []
          thu: []
          fri: []
          sat: []
          sun: []
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
