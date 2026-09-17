---
title: "Set camera light mode"
action: netatmo.set_camera_light
domain: netatmo
description: "Sets the light mode of a Netatmo Outdoor camera."
related_actions:
  - netatmo.set_persons_home
  - netatmo.set_person_away
---

Use this action to set the light mode of a Netatmo Outdoor camera. You can turn the floodlight on or off, or set it to automatic so it switches on when motion is detected.

{% include actions/ui_header.md %}

To set the camera light mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Netatmo Outdoor camera you want to control.
6. From the actions shown for that target, select **Set camera light mode**.
7. Set the **Camera light mode** you want.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Camera light mode:
  description: The light mode to set. Choose on, off, or auto.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.set_camera_light`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.set_camera_light
  target:
    entity_id: camera.front_door
  data:
    camera_light_mode: "on"
{% endexample %}

This turns on the floodlight of `camera.front_door`.

### Options in YAML

{% options_yaml %}
camera_light_mode:
  description: The light mode to set. Choose `on`, `off`, or `auto`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is only available for the Netatmo Outdoor camera, which has a built-in floodlight.
- In `auto` mode, the light switches on by itself when the camera detects motion.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn on the floodlight when motion is detected at night

Light up the front of the house when the camera spots motion after dark.

- **Trigger**: Motion detected by the front door camera
- **Condition**: Sun is below the horizon
- **Action**: Set camera light mode
  - **Target**: Front door camera
  - **Camera light mode**: on

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn on the floodlight on night-time motion"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door_motion
        to: "on"
    conditions:
      - condition: state
        entity_id: sun.sun
        state: below_horizon
    actions:
      - action: netatmo.set_camera_light
        target:
          entity_id: camera.front_door
        data:
          camera_light_mode: "on"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
