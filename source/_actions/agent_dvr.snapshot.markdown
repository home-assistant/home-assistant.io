---
title: "Snapshot"
action: agent_dvr.snapshot
domain: agent_dvr
description: "Takes a photo on an Agent DVR camera."
related_actions:
  - agent_dvr.start_recording
---

Use this action to take a photo on an Agent DVR camera. The snapshot is captured and stored by Agent DVR.

{% include actions/ui_header.md %}

To take a snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Agent DVR camera.
6. From the actions shown for that target, select **Snapshot**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `agent_dvr.snapshot`. A basic example looks like this:

{% example %}
action: |
  action: agent_dvr.snapshot
  target:
    entity_id: camera.living_room
{% endexample %}

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
