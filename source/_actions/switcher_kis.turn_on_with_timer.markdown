---
title: "Turn on with timer"
action: switcher_kis.turn_on_with_timer
domain: switcher_kis
description: "Turns on a Switcher power device for a set number of minutes."
---

Use this action to turn on a Switcher power device with a timer. Once the timer ends, the device turns itself off. This does not affect the device's auto-off setting.

{% include actions/ui_header.md %}

To turn on a device with a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Switcher: Turn on with timer**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Switcher device.
7. Enter the **Timer** in minutes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timer:
  description: How long the device stays on, in minutes. Must be between 1 and 150.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switcher_kis.turn_on_with_timer`. A basic example looks like this:

{% example %}
action: |
  action: switcher_kis.turn_on_with_timer
  target:
    entity_id: switch.switcher_kis_boiler
  data:
    timer_minutes: 90
{% endexample %}

This turns the device on for 90 minutes, after which it turns itself off.

### Options in YAML

{% options_yaml %}
timer_minutes:
  description: >
    How long the device stays on, in minutes. Must be between 1 and 150.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
