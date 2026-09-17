---
title: "Zone occupancy is not detected"
condition: zone.occupancy_is_not_detected
domain: zone
description: "Tests if one or more zones are unoccupied."
related_conditions:
  - zone.occupancy_is_detected
  - zone.not_in_zone
---

The **Zone occupancy is not detected** condition passes when the selected zone is empty. Use it to make an automation continue only if no person is in a zone.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Zone occupancy is not detected**.
5. Under **Zone**, select the zone to check.
6. Under **For at least**, you can set how long the zone must have been empty before the condition passes. Leave it at zero for the condition to pass immediately.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: The zone to monitor.
  required: true
For at least:
  description: How long the zone must have been empty before the condition passes. The default is zero, which passes immediately.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `zone.occupancy_is_not_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: zone.occupancy_is_not_detected
  options:
    zone: zone.home
{% endexample %}

This passes when `zone.home` is empty.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
zone:
  description: The zone to monitor.
  required: true
  type: string
for:
  description: How long the zone must have been empty before the condition passes. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Good to know

- A zone is empty when its state is `0`.
- If the zone state is `unknown` or `unavailable`, the condition does not pass.
- To check the opposite state, use [Zone occupancy is detected](/conditions/zone.occupancy_is_detected/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run the vacuum only when home is empty

At 10:00, this automation starts the robot vacuum if the home zone is empty.

- **Trigger**: Time is 10:00
- **Condition**: Zone occupancy is not detected
  - **Zone**: Home (`zone.home`)
- **Action**: Start vacuum cleaner
  - **Target**: Downstairs vacuum (`vacuum.downstairs`)

{% details "YAML example for running the vacuum only when home is empty" %}

{% example %}
automation: |
  alias: "Run the vacuum when home is empty"
  triggers:
    - trigger: time
      at: "10:00:00"
  conditions:
    - condition: zone.occupancy_is_not_detected
      options:
        zone: zone.home
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

### Automation: turn off the porch light if home is empty after sunrise

At sunrise, this automation turns off the porch light if the home zone is empty.

- **Trigger**: Sun rises
- **Condition**: Zone occupancy is not detected
  - **Zone**: Home (`zone.home`)
- **Action**: Turn off light
  - **Target**: Porch light (`light.porch`)

{% details "YAML example for turning off the porch light if home is empty" %}

{% example %}
automation: |
  alias: "Turn off the porch light after sunrise if home is empty"
  triggers:
    - trigger: sun
      event: sunrise
  conditions:
    - condition: zone.occupancy_is_not_detected
      options:
        zone: zone.home
  actions:
    - action: light.turn_off
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
