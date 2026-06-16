---
title: "Set system mode"
action: evohome.set_system_mode
domain: evohome
description: "Sets the Evohome system mode, either indefinitely or for a set time, after which it reverts to Auto."
related_actions:
  - evohome.set_zone_override
  - evohome.set_dhw_override
---

Use this action to switch your Evohome system to a different mode, such as **Away** while you are on holiday or **AutoWithEco** to run a little cooler. You can set the mode indefinitely, or for a set time after which the system reverts to **Auto** on its own.

This is the native Evohome way to set a time-limited mode, such as being away for three days rather than away indefinitely. Not every system supports every mode.

{% include actions/ui_header.md %}

To set the system mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Honeywell Total Connect Comfort (Europe): Set system mode**.
6. Choose the **Mode** you want, and optionally set a **Period** or **Duration** and the controller entity.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Mode:
  description: The mode to set the system to, such as Auto, AutoWithEco, Away, Custom, DayOff, or HeatingOff.
Period:
  description: A period of time in days, used only with Away, DayOff, or Custom mode. The system reverts to Auto at midnight, where today counts as day one, up to 99 days.
  required: false
Duration:
  description: A duration in hours, used only with AutoWithEco mode, up to 24 hours.
  required: false
Entity:
  description: The Evohome controller's climate entity to set the mode on.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `evohome.set_system_mode`. A basic example looks like this:

{% example %}
action: |
  action: evohome.set_system_mode
  data:
    mode: AutoWithEco
    duration:
      hours: 1
      minutes: 30
{% endexample %}

This runs the system in **AutoWithEco** for one and a half hours, then reverts to **Auto**.

To go away for a number of days, use `period` instead of `duration`:

{% example %}
action: |
  action: evohome.set_system_mode
  data:
    mode: Away
    period:
      days: 30
{% endexample %}

### Options in YAML

{% options_yaml %}
mode:
  description: >
    The mode to set the system to. One of `Auto`, `AutoWithEco`, `Away`,
    `Custom`, `DayOff`, or `HeatingOff`.
  required: true
  type: string
period:
  description: >
    A period of time in days, used only with `Away`, `DayOff`, or `Custom`
    mode. The system reverts to `Auto` at midnight, where today counts as
    day one, up to 99 days.
  required: false
  type: map
duration:
  description: >
    A duration in hours, used only with `AutoWithEco` mode, up to 24 hours.
  required: false
  type: map
entity_id:
  description: >
    The Evohome controller's climate entity to set the mode on.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- The `period` and `duration` options can't be combined. Use `duration` with **AutoWithEco**, and `period` with **Away**, **DayOff**, or **Custom**. The **Auto** and **HeatingOff** modes don't take a time.
- Specify the controller's climate entity with `entity_id` so the action knows which system to set.
- For everyday changes, the generic [climate actions](/integrations/climate/) also work. The native Evohome actions add access to the time-limited modes, which can be useful when integrating with third-party systems such as Amazon Alexa or Google Home.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to Away mode when everyone leaves

When the last person leaves home, put the heating system into **Away** mode so it runs at a lower setpoint until someone returns.

- **Trigger**: Everyone has left home
- **Action**: Honeywell Total Connect Comfort (Europe): Set system mode, with mode Away

{% details "YAML example for switching to Away mode" %}

{% example %}
automation: |
  alias: "Set Evohome to Away when everyone leaves"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: evohome.set_system_mode
      data:
        mode: Away
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
