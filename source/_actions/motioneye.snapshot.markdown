---
title: "Snapshot"
action: motioneye.snapshot
domain: motioneye
description: "Triggers a motionEye still snapshot."
related_actions:
  - motioneye.action
  - motioneye.set_text_overlay
---

Use this action to trigger a still snapshot on one or more motionEye cameras, for example to save an image to disk when motion is detected.

This action is a convenient shortcut for the [`motioneye.action`](/actions/motioneye.action/) action with the `snapshot` action selected.

{% include actions/ui_header.md %}

To trigger a snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. Select what you want to control. Under **By target** (see [Targets](#targets)), select the motionEye camera you want a snapshot from.
5. From the actions shown for that target, select **Snapshot**.
6. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `motioneye.snapshot`. A basic example looks like this:

{% example %}
action: |
  action: motioneye.snapshot
  target:
    entity_id: camera.office
{% endexample %}

This triggers a snapshot on the `camera.office` camera.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
