---
title: "Start charge session"
action: blue_current.start_charge_session
domain: blue_current
description: "Starts a new charge session on a Blue Current charge point."
---

Use this action to start a new charge session on one of your Blue Current charge points. You can optionally provide a charging card ID to start the session with a specific card.

This is handy in automations, for example to start charging your car automatically when cheaper night-time electricity rates begin.

{% include actions/ui_header.md %}

To start a charge session from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Blue Current: Start charge session**.
6. Select the **Device ID** of the charge point. Optionally, set a charging card ID.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device ID:
  description: The Blue Current charge point to start the session on.
  required: true
Charging card ID:
  description: The charging card ID used to start the session. When not provided, no charging card is used.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `blue_current.start_charge_session`. A basic example looks like this:

{% example %}
action: |
  action: blue_current.start_charge_session
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

This starts a charge session on the selected charge point without a charging card.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The Blue Current charge point to start the session on.
  required: true
  type: string
charging_card_id:
  description: >
    The charging card ID used to start the session. When not provided,
    no charging card is used.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- When you do not provide a charging card ID, the session starts without a charging card.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start charging when night rates begin

When the cheaper night-time electricity rate starts, begin a charge session on your charge point.

- **Trigger**: Night-time tariff helper turns on
- **Action**: Blue Current: Start charge session

{% details "YAML example for starting a charge session at night" %}

{% example %}
automation: |
  alias: "Start charging at night rate"
  triggers:
    - trigger: state
      entity_id: binary_sensor.night_tariff
      to: "on"
  actions:
    - action: blue_current.start_charge_session
      data:
        device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
