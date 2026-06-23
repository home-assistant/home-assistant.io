---
title: "Zone occupancy is detected"
condition: zone.occupancy_is_detected
domain: zone
description: "Tests if a zone is occupied."
related_conditions:
  - zone.occupancy_is_not_detected
  - zone.in_zone
---

The **Zone occupancy is detected** condition passes when the selected zone is occupied. Use it to make an automation continue only if at least one person is in a zone.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Zone occupancy is detected**.
5. Under **Zone**, select the zone to check.
6. Under **For at least**, you can set how long the zone must have been occupied before the condition passes. Leave it at zero for the condition to pass immediately.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: The zone to monitor.
  required: true
For at least:
  description: How long the zone must have been occupied before the condition passes. The default is zero, which passes immediately.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `zone.occupancy_is_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: zone.occupancy_is_detected
  options:
    zone: zone.home
{% endexample %}

This passes when `zone.home` is occupied.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
zone:
  description: The zone to monitor.
  required: true
  type: string
for:
  description: How long the zone must have been occupied before the condition passes. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Good to know

- A zone is occupied when its state is a number of `1` or higher.
- If the zone state is `unknown` or `unavailable`, the condition does not pass.
- To check the opposite state, use [Zone occupancy is not detected](/conditions/zone.occupancy_is_not_detected/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on the entry light only if someone is home

When the front door contact sensor turns on after sunset, this automation turns on the entry light only if the home zone is occupied.

- **Trigger**: State changes to on
  - **Target**: Front door contact sensor (`binary_sensor.front_door`)
- **Condition**: Zone occupancy is detected
  - **Zone**: Home (`zone.home`)
- **Condition**: Sun is below horizon
- **Action**: Turn on light
  - **Target**: Entry light (`light.entry`)

{% details "YAML example for turning on the entry light only if someone is home" %}

{% example %}
automation: |
  alias: "Turn on the entry light if someone is home"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  conditions:
    - condition: zone.occupancy_is_detected
      options:
        zone: zone.home
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.entry
{% endexample %}

{% enddetails %}

### Automation: send a message if the office is occupied after hours

At 18:00, this automation sends a notification if the office zone is occupied.

- **Trigger**: Time is 18:00
- **Condition**: Zone occupancy is detected
  - **Zone**: Office (`zone.office`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an after-hours office occupancy notification" %}

{% example %}
automation: |
  alias: "Notify if the office is occupied after hours"
  triggers:
    - trigger: time
      at: "18:00:00"
  conditions:
    - condition: zone.occupancy_is_detected
      options:
        zone: zone.office
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The office zone is occupied after hours."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
