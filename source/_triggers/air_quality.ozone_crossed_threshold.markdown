---
title: "Ozone level crossed threshold"
trigger: air_quality.ozone_crossed_threshold
domain: air_quality
description: "Triggers after one or more ozone levels cross a threshold."
related_triggers:
  - air_quality.ozone_changed
---

The **Ozone level crossed threshold** trigger fires when the ozone (O3) reading on one or more air quality sensors crosses a specific level. Ground-level ozone forms when sunlight reacts with pollutants from vehicles and industry, and it tends to peak on hot, sunny afternoons. High ozone levels irritate the lungs and are especially risky during outdoor exercise.

Imagine getting a notification before your afternoon run telling you ozone is too high to exercise outside today. Or having your ventilation system close its fresh-air intake automatically when ozone spikes, so your indoor air stays clean without you thinking about it. This trigger watches the sky for you and lets your home take action the instant conditions become unhealthy.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Ozone level crossed threshold**.
6. Under **Threshold type**, set the ozone level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The ozone concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.ozone_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.ozone_crossed_threshold
  target:
    entity_id: sensor.backyard_ozone
  options:
    threshold: 100
    behavior: each
{% endexample %}

This fires whenever the backyard ozone sensor crosses 100 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The ozone concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple sensors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: true
  type: string
  default: each
for:
  description: >
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current ozone level is above or below your threshold.
- Ground-level ozone peaks on hot, sunny afternoons. Automations that close fresh-air intakes or notify household members before outdoor activities are common use cases.
- Pair this trigger with [Ozone level changed](/triggers/air_quality.ozone_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: remind yourself to exercise indoors on high-ozone days

On hot afternoons, ground-level ozone spikes without any visible sign. This automation sends a notification when your backyard ozone sensor crosses 100, giving you a friendly heads-up to take your workout inside.

- **Trigger**: Ozone level crossed threshold
  - **Target**: Backyard ozone sensor
  - **Threshold type**: 100
  - **Trigger when**: Each
- **Condition**: Ozone is above 100
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for ozone exercise advisory" %}

{% example %}
automation: |
  alias: "Ozone exercise advisory"
  triggers:
    - trigger: air_quality.ozone_crossed_threshold
      target:
        entity_id: sensor.backyard_ozone
      options:
        threshold: 100
        behavior: each
  conditions:
    - condition: numeric_state
      entity_id: sensor.backyard_ozone
      above: 100
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "High ozone outside"
        message: >
          Ozone crossed 100. Consider
          exercising indoors today.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
