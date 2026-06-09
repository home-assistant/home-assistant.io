---
title: "Zone occupancy detected"
trigger: zone.occupancy_detected
domain: zone
description: "Triggers when a zone changes from empty to occupied."
related_triggers:
  - zone.occupancy_cleared
  - zone.entered
---

The **Zone occupancy detected** trigger fires when a selected zone changes from empty to occupied. Use it when the automation only needs to know that at least one person is now in the zone, instead of reacting to each specific person or device tracker.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Zone occupancy detected**.
5. Under **Zone**, select the zone to monitor.
6. Under **For at least**, you can set how long the zone must stay occupied before the trigger fires. Leave it at zero to fire immediately.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Zone:
  description: The zone to monitor.
  required: true
For at least:
  description: How long the zone must stay occupied before the trigger fires. The default is zero, which fires immediately.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `zone.occupancy_detected`. A basic example looks like this:

{% example %}
trigger: |
  triggers:
    - trigger: zone.occupancy_detected
      options:
        zone: zone.home
{% endexample %}

This fires when `zone.home` changes from empty to occupied.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
zone:
  description: The zone to monitor.
  required: true
  type: string
for:
  description: How long the zone must stay occupied before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Good to know

- A zone is occupied when its state is a number of `1` or higher.
- If the zone state is `unknown` or `unavailable`, Home Assistant does not treat the zone as occupied.
- This trigger fires when the zone changes from empty to occupied. It does not fire again while the zone stays occupied.
- To react when a zone becomes empty, use [Zone occupancy cleared](/triggers/zone.occupancy_cleared/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the porch light when someone gets home at night

When the home zone becomes occupied after sunset, this automation turns on the porch light.

- **Trigger**: Zone occupancy detected
  - **Zone**: Home (`zone.home`)
- **Condition**: Sun is below horizon
- **Action**: Turn on light
  - **Target**: Porch light (`light.porch`)

{% details "YAML example for turning on the porch light when someone gets home" %}

{% example %}
automation: |
  alias: "Turn on the porch light when someone gets home"
  triggers:
    - trigger: zone.occupancy_detected
      options:
        zone: zone.home
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

### Automation: notify when someone arrives at the cabin

When the cabin zone becomes occupied, this automation sends a notification.

- **Trigger**: Zone occupancy detected
  - **Zone**: Cabin (`zone.cabin`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a cabin arrival notification" %}

{% example %}
automation: |
  alias: "Notify when someone arrives at the cabin"
  triggers:
    - trigger: zone.occupancy_detected
      options:
        zone: zone.cabin
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Someone arrived at the cabin."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
