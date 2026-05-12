---
title: "Activate timer mode"
action: watts.activate_timer_mode
domain: watts
description: "Set a thermostat to timer mode with a target temperature and duration."
---

The **Activate timer mode** action sets a Watts Vision + thermostat to **Timer** mode with a target temperature and duration. When the timer expires, the thermostat returns to its previous mode.

Use it when you want a temporary temperature boost, for example, to warm up a bathroom before a shower.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Watts Vision +: Activate timer mode**.
6. Select the climate entity you want to control.
7. Set the **Temperature** and **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Temperature:
  description: Target temperature to hold while the timer is active.
Duration:
  description: Duration of the timer in minutes (1–1440).
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `watts.activate_timer_mode`. A basic example looks like this:

{% example %}
action: |
  action: watts.activate_timer_mode
  target:
    entity_id: climate.living_room_thermostat
  data:
    temperature: 21
    duration: 90
{% endexample %}

This sets the living room thermostat to 21°C for 90 minutes, then returns to its previous mode.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
temperature:
  description: >
    Target temperature to hold while the timer is active.
  required: true
  type: float
duration:
  description: >
    Duration of the timer in minutes. Accepts a value between 1 and 1440.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- When the timer expires, the thermostat automatically returns to its previous mode.
- The maximum duration is 1440 minutes (24 hours).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: warm up the bathroom before a morning shower

Every weekday morning, boost the bathroom thermostat to a comfortable temperature for 30 minutes.

- **Trigger**: Time: 06:30 on weekdays
- **Action**: Watts Vision +: Activate timer mode
- **Target**: Bathroom thermostat
- **Temperature**: 23
- **Duration**: 30

{% details "YAML example for a morning bathroom warm-up" %}

{% example %}
automation: |
  alias: "Morning bathroom warm-up"
  triggers:
    - trigger: time
      at: "06:30:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: watts.activate_timer_mode
      target:
        entity_id: climate.bathroom_thermostat
      data:
        temperature: 23
        duration: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
