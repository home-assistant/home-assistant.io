---
title: "Start recording"
action: agent_dvr.start_recording
domain: agent_dvr
description: "Starts continuous recording on an Agent DVR camera."
related_actions:
  - agent_dvr.stop_recording
  - agent_dvr.snapshot
---

Use this action to start continuous recording on an Agent DVR camera. Recording continues until you stop it with the [Stop recording](/actions/agent_dvr.stop_recording/) action.

{% include actions/ui_header.md %}

To start recording from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Agent DVR camera.
6. From the actions shown for that target, select **Start recording**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `agent_dvr.start_recording`. A basic example looks like this:

{% example %}
action: |
  action: agent_dvr.start_recording
  target:
    entity_id: camera.living_room
{% endexample %}

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
