---
title: "Set time to"
action: advantage_air.set_time_to
domain: advantage_air
description: "Sets the countdown timer that turns an Advantage Air system on or off."
---

Use this action to set the countdown timer that turns your Advantage Air system on or off after a set number of minutes. You target the relevant timer sensor entity, either the "time to on" or "time to off" sensor, and set how many minutes from now the system should switch.

This is handy in an automation to turn the air conditioning off a set time after everyone has gone to bed, for example.

{% include actions/ui_header.md %}

To set the timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select a "time to on" or "time to off" sensor.
6. From the actions shown for that target, select **Set time to**.
7. Set the number of **Minutes** until the system switches.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Minutes:
  description: The number of minutes from now until the system switches on or off.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `advantage_air.set_time_to`. A basic example looks like this:

{% example %}
action: |
  action: advantage_air.set_time_to
  target:
    entity_id: sensor.living_room_time_to_off
  data:
    minutes: 30
{% endexample %}

This turns the system off 30 minutes from now.

### Options in YAML

{% options_yaml %}
minutes:
  description: >
    The number of minutes from now until the system switches on or off,
    between 0 and 1440.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="sensor" %}

## Good to know

- Target the "time to on" sensor to schedule the system turning on, or the "time to off" sensor to schedule it turning off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set the HVAC to turn off 30 minutes after everyone leaves home

When the last person leaves the home zone, set the "time to off" timer to 30 minutes. This gives a short buffer in case someone returns quickly, while ensuring the system does not run indefinitely in an empty house.

- **Trigger**: State
  - **Entity**: Home
  - **To**: 0
- **Condition**: not
  - **Condition**: State
    - **Entity**: HVAC
    - **State**: Off
- **Action**: Set time to (30 minutes on the "time to off" sensor)

{% details "YAML example for turning off HVAC when no one is at home" %}

{% example %}
automation: |
  alias: "Set HVAC to turn off 30 minutes after everyone leaves"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  conditions:
    - condition: not
      conditions:
        - condition: state
          entity_id: climate.my_hvac
          state: "off"
  actions:
    - action: advantage_air.set_time_to
      data:
        entity_id: sensor.myair_time_to_off
        minutes: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
