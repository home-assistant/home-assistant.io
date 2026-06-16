---
title: "Calibrate"
action: keymitt_ble.calibrate
domain: keymitt_ble
description: "Sets the push depth, hold duration, and mode of a MicroBot Push."
---

Use this action to calibrate a MicroBot Push. You set how far the push arm extends, how long it stays extended, and the mode it operates in. The settings are stored on the device, so they apply to later presses as well.

{% include actions/ui_header.md %}

To calibrate a MicroBot Push from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the MicroBot Push switch entity you want to calibrate.
6. From the actions shown for that target, select **MicroBot Push: Calibrate**.
7. Set the **Depth**, **Duration**, and **Mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Depth:
  description: How far the push arm extends, as a percentage from 0 to 100.
  required: true
Duration:
  description: How long, in seconds, the push arm stays extended, from 0 to 60.
  required: true
Mode:
  description: "The mode the arm operates in: `normal` extends and retracts the arm, `invert` retracts then extends it, and `toggle` switches between extend and retract."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `keymitt_ble.calibrate`. A basic example looks like this:

{% example %}
action: |
  action: keymitt_ble.calibrate
  target:
    entity_id: switch.microbot_push
  data:
    depth: 50
    duration: 1
    mode: normal
{% endexample %}

This calibrates the `switch.microbot_push` device to extend the arm halfway, hold for one second, and operate in normal mode.

### Options in YAML

{% options_yaml %}
depth:
  description: How far the push arm extends, as a percentage from 0 to 100.
  required: true
  type: integer
duration:
  description: How long, in seconds, the push arm stays extended, from 0 to 60.
  required: true
  type: integer
mode:
  description: >
    The mode the arm operates in: `normal` extends and retracts the arm,
    `invert` retracts then extends it, and `toggle` switches between extend
    and retract.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

## Good to know

- After the action runs, the push arm extends or retracts depending on the mode you set. The mode and depth are demonstrated right away, but the duration is not. The setting is still stored and can be confirmed by manually operating the device.

{% include actions/try_it.md %}

{% include actions/stuck.md %}
