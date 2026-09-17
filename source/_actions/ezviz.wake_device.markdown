---
title: "Wake camera"
action: ezviz.wake_device
domain: ezviz
description: "Wakes an EZVIZ camera from sleep mode."
---

Use this action to wake an EZVIZ camera that is in sleep mode. This is especially useful for battery-powered cameras, which go to sleep to save power and need to be woken before they can stream or respond.

{% include actions/ui_header.md %}

To wake a camera from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Wake camera**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ezviz.wake_device`. A basic example looks like this:

{% example %}
action: |
  action: ezviz.wake_device
  target:
    entity_id: camera.front_door
{% endexample %}

This wakes `camera.front_door`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="camera" %}

## Good to know

- A battery-powered camera will not report fresh data while it is asleep. Wake it first if you need an up-to-date snapshot or stream.
- The camera returns to sleep mode on its own after a period of inactivity to preserve battery life.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: wake the camera before a snapshot

Use this automation to wake a battery camera right before taking a snapshot, so the image is current.

- **Trigger**: Doorbell button pressed
- **Action**: Wake camera
  - **Target**: Front door camera

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Wake the front door camera when the doorbell is pressed"
    triggers:
      - trigger: state
        entity_id: binary_sensor.doorbell
        to: "on"
    actions:
      - action: ezviz.wake_device
        target:
          entity_id: camera.front_door
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
