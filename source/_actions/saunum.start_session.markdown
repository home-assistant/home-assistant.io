---
title: "Start session"
action: saunum.start_session
domain: saunum
description: "Starts a sauna session with a custom duration, target temperature, and fan duration."
---

Use this action to start a sauna session with a custom duration, target temperature, and fan duration. It gives you more granular control than the climate entity, letting you set all session parameters in a single call.

{% include actions/ui_header.md %}

To start a sauna session from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Saunum: Start session**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Saunum climate entity.
7. Optionally, set a **Duration**, a **Target temperature**, and a **Fan duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the sauna session runs. Defaults to 2 hours.
  required: false
Target temperature:
  description: The target temperature in degrees Celsius. Must be between 40 and 100. Defaults to 80.
  required: false
Fan duration:
  description: How long the fan runs. Defaults to 10 minutes.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `saunum.start_session`. A basic example looks like this:

{% example %}
action: |
  action: saunum.start_session
  target:
    entity_id: climate.saunum_leil
  data:
    duration:
      hours: 2
    target_temperature: 80
    fan_duration:
      minutes: 10
{% endexample %}

This starts a two-hour session at 80°C, with the fan running for the first 10 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long the sauna session runs. Accepts a duration object with `hours`,
    `minutes`, and `seconds` keys. Defaults to 2 hours.
  required: false
  type: time
target_temperature:
  description: >
    The target temperature in degrees Celsius. Must be between 40 and 100.
    Defaults to 80.
  required: false
  type: integer
fan_duration:
  description: >
    How long the fan runs. Accepts a duration object with `hours`, `minutes`,
    and `seconds` keys. Defaults to 10 minutes.
  required: false
  type: time
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- You cannot start a sauna session when the sauna door is open. The control unit prevents heating as a safety measure.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
