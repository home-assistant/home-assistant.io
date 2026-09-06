---
title: "Transition on"
action: snooz.transition_on
domain: snooz
description: "Gradually changes a Snooz device's volume over a set duration."
related_actions:
  - snooz.transition_off
---

Use this action to ease a Snooz white noise machine to a volume over time instead of jumping to it instantly. If the device is off, the transition starts at the lowest volume. This is a gentle way to fade sound in, for example when winding down for sleep.

{% include actions/ui_header.md %}

To transition a Snooz device on from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Transition on**.
7. Optionally set the **Target volume** and **Transition duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Target volume:
  description: "The volume level to transition to, from 1 to 100 percent. If left empty, the volume already set on the device is used."
Transition duration:
  description: "Time to reach the target volume, from 1 to 300 seconds. The default is 20 seconds."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `snooz.transition_on`. A basic example looks like this:

{% example %}
action: |
  action: snooz.transition_on
  target:
    entity_id: fan.snooz_bedroom
  data:
    volume: 33
    duration: 120
{% endexample %}

This fades `fan.snooz_bedroom` up to 33% volume over two minutes.

### Options in YAML

{% options_yaml %}
volume:
  description: "The volume level to transition to, from 1 to 100 percent. If not specified, the volume already set on the device is used."
  required: false
  type: integer
duration:
  description: "Time to reach the target volume, from 1 to 300 seconds."
  required: false
  type: integer
  default: 20
{% endoptions_yaml %}

{% include actions/targets.md domain="fan" %}

## Good to know

- If the device is off when the transition starts, it begins at the lowest volume and rises to the target.
- Volume maps to the fan speed percentage of the Snooz entity.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: fade noise in at bedtime

Use this automation to slowly bring the white noise up to a comfortable level at bedtime.

- **Trigger**: Time: 22:00
- **Action**: Transition on
  - **Target**: Bedroom Snooz
  - **Target volume**: 33
  - **Transition duration**: 120

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Fade the bedroom Snooz in at bedtime"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: snooz.transition_on
        target:
          entity_id: fan.snooz_bedroom
        data:
          volume: 33
          duration: 120
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
