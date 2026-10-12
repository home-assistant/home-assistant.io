---
title: Locate vacuum
action: vacuum.locate
domain: vacuum
description: "Plays a sound or flashes lights to help you find the vacuum."
---

The **Locate vacuum cleaner** action causes the vacuum to play a sound or flash lights, making it easier to find.

Use it when the robot has ended up under a bed, behind furniture, or somewhere else that is hard to spot at a glance.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Locate vacuum cleaner**.
4. Select one or more vacuums, area, or group.
5. Select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.locate
  target:
    entity_id: vacuum.upstairs
{% endexample %}

This makes `vacuum.upstairs` play its locate signal.

Omitting `entity_id` will target all supported vacuums in your system.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or device to locate.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The locate function's effects (sound, lights) depend on your vacuum model.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: locate the vacuum when the dust bin is full

Some vacuum integrations expose a binary sensor when the dust bin is full (for example, [iRobot Roomba and Braava](/integrations/roomba/)).
If your vacuum reports that its bin needs attention, this automation makes it play its locate signal so you can find it quickly.

- **Trigger**: Roomba bin full sensor turns on
- **Action**: Locate vacuum
- **Target**: Upstairs vacuum

{% details "YAML example for locating a vacuum that needs emptying" %}

{% example %}
automation: |
  alias: "Locate vacuum when bin is full"
  triggers:
    - trigger: state
      entity_id: binary_sensor.roomba_bin_full
      to: "on"
  actions:
    - action: vacuum.locate
      target:
        entity_id: vacuum.upstairs
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
