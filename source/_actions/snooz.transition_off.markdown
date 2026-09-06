---
title: "Transition off"
action: snooz.transition_off
domain: snooz
description: "Gradually lowers a Snooz device's volume, then turns it off."
related_actions:
  - snooz.transition_on
---

Use this action to fade a Snooz white noise machine down to its lowest volume over time and then turn it off. This is a gentle way to let sound trail away, for example in the morning after you wake up.

{% include actions/ui_header.md %}

To transition a Snooz device off from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Transition off**.
7. Optionally set the **Transition duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Transition duration:
  description: "Time to fade down to the lowest volume before turning off, from 1 to 300 seconds. The default is 20 seconds."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `snooz.transition_off`. A basic example looks like this:

{% example %}
action: |
  action: snooz.transition_off
  target:
    entity_id: fan.snooz_bedroom
  data:
    duration: 120
{% endexample %}

This fades `fan.snooz_bedroom` down over two minutes, then turns it off.

### Options in YAML

{% options_yaml %}
duration:
  description: "Time to fade down to the lowest volume before turning off, from 1 to 300 seconds."
  required: false
  type: integer
  default: 20
{% endoptions_yaml %}

{% include actions/targets.md domain="fan" %}

## Good to know

- Once the transition completes and the device powers off, the volume level is restored to the value it had before the transition started. The next time you turn the device on, it returns to that volume.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: fade noise out in the morning

Use this automation to gently fade the white noise away after your wake-up time.

- **Trigger**: Time: 07:00
- **Action**: Transition off
  - **Target**: Bedroom Snooz
  - **Transition duration**: 120

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Fade the bedroom Snooz out in the morning"
    triggers:
      - trigger: time
        at: "07:00:00"
    actions:
      - action: snooz.transition_off
        target:
          entity_id: fan.snooz_bedroom
        data:
          duration: 120
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
