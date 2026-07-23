---
title: "Set fan sleep timer"
action: modern_forms.set_fan_sleep_timer
domain: modern_forms
description: "Sets a sleep timer on a Modern Forms fan."
related_actions:
  - modern_forms.clear_fan_sleep_timer
  - modern_forms.set_light_sleep_timer
---

Use this action to set a sleep timer on a Modern Forms fan. When the timer expires, the fan turns off.

{% include actions/ui_header.md %}

To set a fan sleep timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Modern Forms fan.
6. From the actions shown for that target, select **Modern Forms: Set fan sleep timer**.
7. Enter the **Sleep time** in minutes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sleep time:
  description: The number of minutes to set the timer for, from 1 to 1440 (one day).
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `modern_forms.set_fan_sleep_timer`. A basic example looks like this:

{% example %}
action: |
  action: modern_forms.set_fan_sleep_timer
  target:
    entity_id: fan.bedroom
  data:
    sleep_time: 60
{% endexample %}

This turns the fan off after one hour.

### Options in YAML

{% options_yaml %}
sleep_time:
  description: >
    The number of minutes to set the timer for, from 1 to 1440 (one day).
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="fan" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: run the bedroom fan for an hour at bedtime

This automation sets a one-hour sleep timer on the bedroom fan every night, so it runs while you fall asleep and then turns itself off.

- **Trigger**: A scheduled time
- **Action**: Modern Forms: Set fan sleep timer

{% details "YAML example for a nightly fan sleep timer" %}

{% example %}
automation: |
  alias: "Bedroom fan sleep timer"
  triggers:
    - trigger: time
      at: "22:30:00"
  actions:
    - action: modern_forms.set_fan_sleep_timer
      target:
        entity_id: fan.bedroom
      data:
        sleep_time: 60
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
