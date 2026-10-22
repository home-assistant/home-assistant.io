---
title: "Activate boost"
action: gkp.activate_boost
domain: gkp
description: "Start boost mode on a GKP radiator at a target temperature for a set duration."
---

The **Activate boost** action starts **Boost** mode on a GKP radiator, at the target temperature and for the duration you choose. When the boost ends, the radiator goes back to its previous mode.

Use it when you want to heat a room quickly for a limited time, for example, to warm up a bathroom before a shower.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **GKP Home: Activate boost**.
6. Select the climate entity of the radiator you want to boost.
7. Set the **Temperature** and **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Temperature:
  description: Target temperature while the boost is active, between 5 °C and 35 °C.
Duration:
  description: How long the boost lasts, between 3 minutes and 24 hours. The default is 2 hours.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `gkp.activate_boost`. A basic example looks like this:

{% example %}
action: |
  action: gkp.activate_boost
  target:
    entity_id: climate.living_room
  data:
    temperature: 22.5
    duration:
      hours: 1
      minutes: 30
{% endexample %}

This boosts the living room radiator to 22.5 °C for 1 hour and 30 minutes, then the radiator goes back to its previous mode.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
temperature:
  description: >
    Target temperature while the boost is active, in °C. Accepts a value
    between 5 and 35.
  required: true
  type: float
duration:
  description: >
    How long the boost lasts, between 3 minutes and 24 hours. Durations are
    rounded up to the next minute.
  required: true
  type: time
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: warm up the bathroom before a morning shower

Every weekday morning, boost the bathroom radiator to a comfortable temperature for 30 minutes.

- **Trigger**: Time: 06:30 on weekdays
- **Action**: GKP Home: Activate boost
   - **Target**: Bathroom radiator
   - **Temperature**: 23.5
   - **Duration**: 30 minutes

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
    - action: gkp.activate_boost
      target:
        entity_id: climate.bathroom
      data:
        temperature: 23.5
        duration:
          minutes: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
