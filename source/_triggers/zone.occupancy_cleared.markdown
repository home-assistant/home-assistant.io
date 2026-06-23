---
title: "Zone occupancy cleared"
trigger: zone.occupancy_cleared
domain: zone
description: "Triggers when a zone changes from occupied to empty."
related_triggers:
  - zone.occupancy_detected
  - zone.left
---

The **Zone occupancy cleared** trigger fires when a selected zone changes from occupied to empty. Use it when an automation should run after everyone has left a place, without listing each person or device tracker in the trigger.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Zone occupancy cleared**.
5. Under **Zone**, select the zone to monitor.
6. Under **For at least**, you can set how long the zone must stay empty before the trigger fires. Leave it at zero to fire immediately.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: The zone to monitor.
  required: true
For at least:
  description: How long the zone must stay empty before the trigger fires. The default is zero, which fires immediately.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `zone.occupancy_cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: zone.occupancy_cleared
  options:
    zone: zone.home
{% endexample %}

This fires when `zone.home` changes from occupied to empty.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
zone:
  description: The zone to monitor.
  required: true
  type: string
for:
  description: How long the zone must stay empty before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Good to know

- A zone is empty when its state is `0`.
- If the zone state is `unknown` or `unavailable`, Home Assistant does not treat the zone as empty.
- This trigger fires when the zone changes from occupied to empty. It does not fire again while the zone stays empty.
- To react when a zone becomes occupied, use [Zone occupancy detected](/triggers/zone.occupancy_detected/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the office fan when home is empty

When the home zone has been empty for 5 minutes, this automation turns off the office fan.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
  - **For at least**: 5 minutes
- **Action**: Turn off fan
  - **Target**: Office fan (`fan.office`)

{% details "YAML example for turning off the office fan when home is empty" %}

{% example %}
automation: |
  alias: "Turn off the office fan when home is empty"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
        for: "00:05:00"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.office
{% endexample %}

{% enddetails %}

### Automation: turn off the porch light after everyone leaves

When the home zone becomes empty after sunrise, this automation turns off the porch light.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
- **Condition**: Sun is above horizon
- **Action**: Turn off light
  - **Target**: Porch light (`light.porch`)

{% details "YAML example for turning off the porch light after everyone leaves" %}

{% example %}
automation: |
  alias: "Turn off the porch light after everyone leaves"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  conditions:
    - condition: sun
      before: sunset
      after: sunrise
  actions:
    - action: light.turn_off
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
