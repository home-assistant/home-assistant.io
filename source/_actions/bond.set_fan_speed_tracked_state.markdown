---
title: "Set fan speed tracked state"
action: bond.set_fan_speed_tracked_state
domain: bond
description: "Updates the speed Home Assistant believes a Bond fan is running at."
related_actions:
  - bond.set_switch_power_tracked_state
  - bond.set_light_power_tracked_state
  - bond.set_light_brightness_tracked_state
---

Use this action to tell Home Assistant what speed a Bond fan is actually running at, without sending any signal to the fan. Bond controls many devices over one-way radio, so it cannot always sense their real state. If the tracked speed drifts out of sync with the fan, this action corrects it.

{% include actions/ui_header.md %}

To set the tracked fan speed from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Bond: Set fan speed tracked state**.
6. In **Entity**, select the fan you want to control.
7. Set the **Fan speed** to the percentage the fan is actually running at.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Fan speed:
  description: "The speed the fan is actually running at, as a percentage from 0 to 100."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bond.set_fan_speed_tracked_state`. A basic example looks like this:

{% example %}
action: |
  action: bond.set_fan_speed_tracked_state
  target:
    entity_id: fan.living_room_fan
  data:
    speed: 50
{% endexample %}

This tells Home Assistant that `fan.living_room_fan` is running at 50%.

### Options in YAML

{% options_yaml %}
speed:
  description: "The speed the fan is actually running at, as a percentage from 0 to 100."
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="fan" entity_type="Bond fan" %}

In the UI, this action has an **Entity** field instead of targets. There, you can select one fan. To use a device, an area, a floor, or a label as the target, select the three dots menu {% icon "mdi:dots-vertical" %} on the action, and then select **Edit in YAML**.

## Good to know

- This action only updates the tracked state. It does not send a signal to the fan, so the fan keeps running exactly as it was.
- Use it to resync Home Assistant after the fan was changed with the original remote.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: resync the fan speed after using the remote

Use this automation when a physical remote button tells Home Assistant the fan was set to high, so the tracked speed matches reality.

- **Trigger**: State changed
  - **Entity**: Fan remote button sensor
  - **To**: High
- **Action**: Bond: Set fan speed tracked state
  - **Entity**: Living room fan
  - **Fan speed**: `100`

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Resync the living room fan speed"
    triggers:
      - trigger: state
        entity_id: sensor.fan_remote_button
        to: "high"
    actions:
      - action: bond.set_fan_speed_tracked_state
        target:
          entity_id: fan.living_room_fan
        data:
          speed: 100
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
