---
title: "Enable the timer of a Sensibo device"
action: sensibo.enable_timer
domain: sensibo
description: "Starts the Sensibo timer to turn an HVAC device on or off after a set number of minutes."
related_actions:
  - sensibo.assume_state
---

Use this action to start the Sensibo timer, which turns the HVAC device on or off after the number of minutes you set. For example, you can have the device switch off automatically a while after you get home.

{% include actions/ui_header.md %}

To enable the timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sensibo climate device.
6. From the actions shown for that target, select **Sensibo: Enable timer**.
7. Set the number of **Minutes** for the timer.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Minutes:
  description: The number of minutes after which the device turns on or off.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sensibo.enable_timer`. A basic example looks like this:

{% example %}
action: |
  action: sensibo.enable_timer
  target:
    entity_id: climate.living_room
  data:
    minutes: 30
{% endexample %}

### Options in YAML

{% options_yaml %}
minutes:
  description: The number of minutes after which the device turns on or off.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start a 30-minute timer when you get home

Start the Sensibo timer for 30 minutes when you arrive home.

- **Trigger**: You enter the Home zone
- **Action**: Sensibo: Enable timer
  - **Target**: Living room

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Example timer"
  triggers:
    - trigger: zone
      entity_id: person.me
      zone: zone.home
      event: enter
  actions:
    - action: sensibo.enable_timer
      target:
        entity_id: climate.hvac_device
      data:
        minutes: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
