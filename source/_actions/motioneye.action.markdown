---
title: "Trigger motionEye action"
action: motioneye.action
domain: motioneye
description: "Triggers a motionEye action."
related_actions:
  - motioneye.snapshot
  - motioneye.set_text_overlay
---

Use this action to trigger a motionEye [action button](https://github.com/ccrisan/motioneye/wiki/Action-Buttons) on one or more motionEye cameras, such as taking a snapshot, controlling pan and tilt, or moving to a preset.

{% include actions/ui_header.md %}

To trigger an action from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the motionEye camera you want to control.
6. From the actions shown for that target, select **Action**.
7. Select the **Action** to trigger.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Action:
  description: The motionEye action to trigger.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `motioneye.action`. A basic example looks like this:

{% example %}
action: |
  action: motioneye.action
  target:
    entity_id: camera.office
  data:
    action: snapshot
{% endexample %}

This triggers the `snapshot` action on the `camera.office` camera.

### Options in YAML

{% options_yaml %}
action:
  description: >
    The motionEye action to trigger. One of `snapshot`, `record_start`,
    `record_stop`, `lock`, `unlock`, `light_on`, `light_off`, `alarm_on`,
    `alarm_off`, `up`, `right`, `down`, `left`, `zoom_in`, `zoom_out`, or
    `preset1` through `preset9`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- The `record_start` and `record_stop` actions are only partially implemented in motionEye itself, so they do not function as expected. See the [relevant motionEye code](https://github.com/ccrisan/motioneye/blob/dev/motioneye/handlers.py#L1741).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
