---
title: "Set switch power tracked state"
action: bond.set_switch_power_tracked_state
domain: bond
description: "Updates the power state Home Assistant believes a Bond switch is in."
related_actions:
  - bond.set_fan_speed_tracked_state
  - bond.set_light_power_tracked_state
  - bond.set_light_brightness_tracked_state
---

Use this action to tell Home Assistant whether a Bond switch is actually on or off, without sending any signal to the switch. Bond controls many devices over one-way radio, so it cannot always sense their real state. If the tracked power state drifts out of sync with the switch, this action corrects it.

{% include actions/ui_header.md %}

To set the tracked switch power state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Bond: Set switch power tracked state**.
6. In **Entity**, select the switch you want to control.
7. Turn **Power state** on or off to match the switch's actual state.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Power state:
  description: "Turn on if the switch is actually on, or off if it is actually off."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bond.set_switch_power_tracked_state`. A basic example looks like this:

{% example %}
action: |
  action: bond.set_switch_power_tracked_state
  target:
    entity_id: switch.patio_heater
  data:
    power_state: true
{% endexample %}

This tells Home Assistant that `switch.patio_heater` is on.

### Options in YAML

{% options_yaml %}
power_state:
  description: "Whether the switch is actually on (true) or off (false)."
  required: true
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" entity_type="Bond switch" %}

In the UI, this action has an **Entity** field instead of targets. There, you can select one switch. To use a device, an area, a floor, or a label as the target, select the three dots menu {% icon "mdi:dots-vertical" %} on the action, and then select **Edit in YAML**.

## Good to know

- This action only updates the tracked state. It does not send a signal to the switch, so the device stays exactly as it is.
- Use it to resync Home Assistant after the switch was changed with the original remote.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: resync the switch state after using the remote

Use this automation when a physical remote tells Home Assistant the switch was turned on, so the tracked state matches reality.

- **Trigger**: State changed
  - **Entity**: Heater remote button sensor
  - **To**: On
- **Action**: Bond: Set switch power tracked state
  - **Entity**: Patio heater switch
  - **Power state**: On

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Resync the patio heater switch state"
    triggers:
      - trigger: state
        entity_id: sensor.heater_remote_button
        to: "on"
    actions:
      - action: bond.set_switch_power_tracked_state
        target:
          entity_id: switch.patio_heater
        data:
          power_state: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
